import { Controller } from "./base.controller";
import { Jelentkezes } from "../entity/Jelentkezes";
import { Berlo } from "../entity/Berlo";
import { Haz } from "../entity/Haz";
import { AppDataSource } from "../data-source";
import { Foberlo } from "../entity/Foberlo";
import { Szerzodes } from "../entity/Szerzodes";
import moment from "moment";
import { SzerzodesZarasDTO } from "../../../models";

export class SzerzodesController extends Controller{
    repository = AppDataSource.getRepository(Szerzodes);
    jelntkezrepository = AppDataSource.getRepository(Jelentkezes);
    hazRepository = AppDataSource.getRepository(Haz);
    berloRepository = AppDataSource.getRepository(Berlo);
    foberloRepository = AppDataSource.getRepository(Foberlo);

    create = async (req, res) => {
        try {
            const tulaj = await this.foberloRepository.findOneBy({
                id: req.auth.id
            });
            if (!tulaj) {
                return this.handleError(res, null, 400, "A megadott azonosítóval nem található tulajdonos.");
            }
            const apply= await this.jelntkezrepository.findOneBy({
                id: req.params.applyId
            });
            if (!apply) {
                return this.handleError(res, null, 400, "A megadott azonosítóval nem található ingatlan.");
            }

            const entity = this.repository.create(req.body as object);
            entity.id = null;
            entity.tulajdonos = tulaj;
            entity.lakas = apply.haz;
            entity.berlo = apply.berlo;
            
            const result = await this.repository.insert(entity);
            const inserted = await this.repository.findOneBy({ id: result.raw.insertId });

            const masJelentkezesek = await this.jelntkezrepository.findBy({
                haz: { id: entity.lakas.id }
            });
            await this.jelntkezrepository.remove(masJelentkezesek);
 
            res.json(inserted);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getBerlo = async (req, res) => {
        try {
            const berlo = await this.berloRepository.findOneBy({
                id: req.auth.id
            });
            if (!berlo) {
                return this.handleError(res, null, 400, "A megadott azonosítóval nem található tulajdonos.");
            }

            const entities = await this.repository.findBy({
                berlo: { id: req.auth.id }
            });
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getTulaj = async (req, res) => {
        try {
            const szerzodesek = await this.repository.findBy({
                tulajdonos: { id: req.auth.id }
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

            // TODO: összesítés

            await this.repository.save(szerzodes);
            res.json(szerzodes);
        } catch (err) {
            this.handleError(res, err);
        }
    }
}