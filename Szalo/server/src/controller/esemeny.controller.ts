import { Controller } from "./base.controller";
import { Berlo } from "../entity/Berlo";
import { Haz } from "../entity/Haz";
import { AppDataSource } from "../data-source";
import { Esemeny } from "../entity/Esemeny";
import { Foberlo } from "../entity/Foberlo";
import { Szerzodes } from "../entity/Szerzodes";

import moment from 'moment';

export class EsemenyController extends Controller{
    repository = AppDataSource.getRepository(Esemeny);
    hazRepository = AppDataSource.getRepository(Haz);
    berloRepository = AppDataSource.getRepository(Berlo);
    foberloRepository = AppDataSource.getRepository(Foberlo);
    szerzodesRepository = AppDataSource.getRepository(Szerzodes);

    create = async (req, res) => {
        try {
            const szerzodes = await this.szerzodesRepository.findOneBy({
                id: req.params.dokumentum
            });
            if (!szerzodes) {
                return this.handleError(res, null, 400, "A megadott azonosítóval nem található ház.");
            }

            const entity = this.repository.create(req.body as object);
            entity.id = null;
            entity.dokumentum = szerzodes;
            
            const result = await this.repository.insert(entity);
            const inserted = await this.repository.findOneBy({ id: result.raw.insertId });
 
            res.json(inserted);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getAll = async (req, res) => {
        try {
            const entities = await this.repository.findBy({
                dokumentum: { id: req.params.szerzodesId }
            });
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getOne = async (req, res) => {
        try {
            const id = req.params.id;
            const entity = await this.repository.findOneBy({ id: id });
            if (!entity) {
                return this.handleError(res, null, 404, 'Nem található entitás ezzel az azonosítóval.');
            }

            res.json(entity);
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

            const szerzodes = await this.szerzodesRepository.findOneBy({
                berlo: { id: berlo.id}
            });

            const entities = await this.repository.findBy({
                dokumentum: { id: szerzodes.id }
            });
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    update = async (req, res) => {
        try {
            let oldEntity = await this.repository.findOneBy({ id: req.body.id });
            if (!oldEntity || !req.body.id) {
                return this.handleError(res, null, 404, 'Nem található entitás ezzel az azonosítóval.');
            }

            let newEntity = this.repository.create(req.body as object);

            if (oldEntity.allapot != newEntity.allapot && newEntity.allapot == 'Lezárt') {
                newEntity.zarasDatum = moment().format('YYYY-MM-DD');
            }

            const result = await this.repository.save(newEntity);
 
            res.json(result);
        } catch (err) {
            this.handleError(res, err);
        }
    };

}