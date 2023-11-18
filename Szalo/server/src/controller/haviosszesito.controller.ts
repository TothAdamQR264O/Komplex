import { AppDataSource } from "../data-source";
import { Berlo } from "../entity/Berlo";
import { Esemeny } from "../entity/Esemeny";
import { Foberlo } from "../entity/Foberlo";
import { Haviosszesito } from "../entity/Haviosszesito";
import { Haz } from "../entity/Haz";
import { Szerzodes } from "../entity/Szerzodes";
import { Controller } from "./base.controller";
import { OsszesitoTetel } from "../entity/OsszesitoTetel";
import { HaviosszesitoDTO } from "../../../models";
import { Szamla } from "../entity/Szamla";
import { SzamlazzHuIntegracio } from "../entity/SzamlazzHuIntegracio";
import { OsszesitoService } from "./osszesito.service";

import { Client } from 'szamlazz.js';

export class HaviosszesitoController extends Controller {
    repository = AppDataSource.getRepository(Haviosszesito);
    osszesitoTetelRepository = AppDataSource.getRepository(OsszesitoTetel);
    szamlazzHuIntegracioRepository = AppDataSource.getRepository(SzamlazzHuIntegracio);
    szamlaRepository = AppDataSource.getRepository(Szamla);
    esemenyRepository = AppDataSource.getRepository(Esemeny);
    hazRepository = AppDataSource.getRepository(Haz);
    berloRepository = AppDataSource.getRepository(Berlo);
    foberloRepository = AppDataSource.getRepository(Foberlo);
    szerzodesRepository = AppDataSource.getRepository(Szerzodes);

    osszesitoService = new OsszesitoService(this.repository, this.osszesitoTetelRepository, this.esemenyRepository);

    getAll = async (req, res) => {
        try {
            const szerzodesId = req.params.szerzodesId;
            const entities = await this.repository.find({
                where: {
                    szerzodes: { id: szerzodesId }
                },
                order: { ev: 'ASC', honap: 'ASC' }
            });
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    create = async (req, res) => {
        try {
            const szerzodes = await this.szerzodesRepository.findOneBy({
                id: req.params.szerzodesId
            });
            if (!szerzodes) {
                return this.handleError(res, null, 404, "A megadott szerződés nem létezik.");
            }

            // összesítő generálás

            const osszesitoEv = req.params.evszam;
            const osszesitoHonap = req.params.honapszam;

            if (!osszesitoEv || !osszesitoHonap) {
                return this.handleError(res, null, 400, "Az összesítő létrehozásához év és hónapszám megadása szükséges.");
            }

            // az összesítés nem hozható létre:
            // - ha már létezik
            // - ha a szerződés időtartamán kívüli
            // - ha az aktuális hónapra vagy azt követő időszakra vonatkozik
            const letrehozhato = await this.osszesitoService.letrehozhato(szerzodes, osszesitoEv, osszesitoHonap);
            if (!letrehozhato) {
                return this.handleError(res, null, 400, 'A megadott hónapra nem készíthető összesítés.');
            }

            const osszesito = await this.osszesitoService.osszesito(szerzodes, osszesitoEv, osszesitoHonap);

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
            }
            catch (err) {
                this.handleError(res, err, 500, "A számlagenerálás során hiba történt, kérjük kézzel állítsa ki a számlát!");
            }

            const result = await this.repository.save(osszesito);
            res.json(result);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getLehetosegek = async (req, res) => {
        try {
            const szerzodes = await this.szerzodesRepository.findOneBy({ id: req.params.szerzodesId });
            if (!szerzodes) {
                return this.handleError(res, null, 400, "A megadott szerződés nem létezik.");
            }

            const lehetosegek = await this.osszesitoService.lehetosegek(szerzodes);
            res.json(lehetosegek);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    fizetve = async (req, res) => {
        try {
            const osszesito = await this.repository.findOneBy({ id: req.params.id });
            if (!osszesito || osszesito.fizetve) {
                return this.handleError(res, null, 400, "A megadott összesítő nem létezik vagy már ki lett fizetve.");
            }

            osszesito.fizetve = true;
            this.repository.save(osszesito);

            res.status(200).send();
        }
        catch (err) {
            this.handleError(res, err);
        }

    };
}