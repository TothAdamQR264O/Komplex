import moment from "moment";
import { Client } from 'szamlazz.js';
import { SzerzodesZarasDTO } from "../../../models";
import { AppDataSource } from "../data-source";
import { Berlo } from "../entity/Berlo";
import { Esemeny } from "../entity/Esemeny";
import { Foberlo } from "../entity/Foberlo";
import { Haviosszesito } from "../entity/Haviosszesito";
import { Haz } from "../entity/Haz";
import { Jelentkezes } from "../entity/Jelentkezes";
import { OsszesitoTetel } from "../entity/OsszesitoTetel";
import { SzamlazzHuIntegracio } from "../entity/SzamlazzHuIntegracio";
import { Szerzodes } from "../entity/Szerzodes";
import { Controller } from "./base.controller";
import { OsszesitoService } from "./osszesito.service";
import { Szamla } from "../entity/Szamla";

export class SzerzodesController extends Controller{
    repository = AppDataSource.getRepository(Szerzodes);
    jelntkezrepository = AppDataSource.getRepository(Jelentkezes);
    hazRepository = AppDataSource.getRepository(Haz);
    berloRepository = AppDataSource.getRepository(Berlo);
    foberloRepository = AppDataSource.getRepository(Foberlo);
    osszesitoRepository = AppDataSource.getRepository(Haviosszesito);
    osszesitoTetelRepository = AppDataSource.getRepository(OsszesitoTetel);
    esemenyRepository = AppDataSource.getRepository(Esemeny);
    osszesitoService = new OsszesitoService(this.osszesitoRepository, this.osszesitoTetelRepository, this.esemenyRepository);
    
    szamlazzHuIntegracioRepository = AppDataSource.getRepository(SzamlazzHuIntegracio);
    szamlaRepository = AppDataSource.getRepository(Szamla);

    create = async (req, res) => {
        try {
            const tulaj = await this.foberloRepository.findOneBy({ id: req.auth.id });
            if (!tulaj) {
                return this.handleError(res, null, 400, "A megadott azonosítóval nem található tulajdonos.");
            }

            const jelentkezes = await this.jelntkezrepository.findOneBy({ id: req.params.jelentkezesId });
            if (!jelentkezes) {
                return this.handleError(res, null, 400, "A megadott azonosítóval nem található jelentkezés.");
            }

            const szerzodes = this.repository.create(req.body as object);
            szerzodes.tulajdonos = tulaj;
            szerzodes.lakas = jelentkezes.haz;
            szerzodes.berlo = jelentkezes.berlo;

            szerzodes.id = null;
            szerzodes.aktiv = true;
            szerzodes.lezarasDatum = null;
            szerzodes.gazOraVegAllas = 0;
            szerzodes.villanyOraVegAllas = 0;
            szerzodes.vizOraVegAllas = 0;
            
            const result = await this.repository.insert(szerzodes);
            const inserted = await this.repository.findOneBy({ id: result.raw.insertId });

            const masJelentkezesek = await this.jelntkezrepository.findBy({
                haz: { id: szerzodes.lakas.id }
            });
            await this.jelntkezrepository.remove(masJelentkezesek);

            jelentkezes.haz.hirdet = 'Nem';
            await this.hazRepository.save(jelentkezes.haz);
 
            res.json(inserted);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getBerlo = async (req, res) => {
        try {
            const entities = await this.repository.findBy({
                berlo: { id: req.auth.id },
                aktiv: true
            });
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getTulaj = async (req, res) => {
        try {
            const szerzodesek = await this.repository.findBy({
                tulajdonos: { id: req.auth.id },
                aktiv: true
            });

            res.json(szerzodesek);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    zaras = async (req, res) => {
        try {
            const szerzodes = await this.repository.findOneBy({
                id: req.params.id
            });
            if (!szerzodes) {
                return this.handleError(res, null, 404, "A megadott szerződés nem létezik.");
            }

            const beallitasok = req.body as SzerzodesZarasDTO;

            szerzodes.aktiv = false;
            szerzodes.lezarasDatum = moment().format('YYYY-MM-DD');

            if (beallitasok.gazOraZaroAllas < szerzodes.gazOraKezdoAllas) {
                return this.handleError(res, null, 400, 'A gázóra állása nem lehet kisebb, mint a kezdőállás.');
            }

            if (beallitasok.villanyOraZaroAllas < szerzodes.villanyOraKezdoAllas) {
                return this.handleError(res, null, 400, 'A villanyóra állása nem lehet kisebb, mint a kezdőállás.');
            }

            if (beallitasok.vizOraZaroAllas < szerzodes.vizOraKezdoAllas) {
                return this.handleError(res, null, 400, 'A vízóra állása nem lehet kisebb, mint a kezdőállás.');
            }

            szerzodes.gazOraVegAllas = beallitasok.gazOraZaroAllas;
            szerzodes.villanyOraVegAllas = beallitasok.villanyOraZaroAllas;
            szerzodes.vizOraVegAllas = beallitasok.vizOraZaroAllas;

            const osszesito = await this.osszesitoService.osszesito(szerzodes,
                moment(szerzodes.lezarasDatum).get('date'), moment(szerzodes.lezarasDatum).get('month'), true);

            // számla generálás

            const szamlazzHuAdatok = await this.szamlazzHuIntegracioRepository.findOneBy({
                tulajdonos: { id: szerzodes.tulajdonos.id }
            });

            if (!szamlazzHuAdatok || !szamlazzHuAdatok.apiKulcs) {
                return this.handleError(res, null, 400, 'Nem létező Számlázz.hu integráció. Kérjük állítsa be API-kulcsát!');
            }

            const szamlaAdatok = this.osszesitoService.szamla(szerzodes, osszesito, szamlazzHuAdatok);

            const szamlazzClient = new Client({
                authToken: szamlazzHuAdatok.apiKulcs,
                eInvoice: true,
                requestInvoiceDownload: true,
                downloadedInvoiceCount: 1,
                responseVersion: 1,
                timeout: 15000
            });

            try {
                const szamla = await szamlazzClient.issueInvoice(szamlaAdatok);
                const szamlaEntity = this.szamlaRepository.create({
                    szamlaId: szamla.invoiceId,
                    bruttoOsszeg: szamla.grossTotal,
                    pdf: Buffer.from(szamla.pdf).toString('base64')
                });

                osszesito.szamla = szamlaEntity;
            } catch (err) {
                this.handleError(res, err, 500, "A számlagenerálás során hiba történt, kérjük kézzel állítsa ki a számlát!");
            }

            await this.osszesitoRepository.save(osszesito);
            await this.repository.save(szerzodes);
            res.json(szerzodes);
        } catch (err) {
            this.handleError(res, err);
        }
    }
}