import { Controller } from "./base.controller";
import { Berlo } from "../entity/Berlo";
import { Haz } from "../entity/Haz";
import { AppDataSource } from "../data-source";
import { Esemeny } from "../entity/Esemeny";
import { Foberlo } from "../entity/Foberlo";
import { Szerzodes } from "../entity/Szerzodes";

export class EsemenyController extends Controller{
    repository = AppDataSource.getRepository(Esemeny);
    hazRepository = AppDataSource.getRepository(Haz);
    berloRepository = AppDataSource.getRepository(Berlo);
    foberloRepository = AppDataSource.getRepository(Foberlo);
    szerzodesRepository = AppDataSource.getRepository(Szerzodes);

    create = async (req, res) => {
        try {
            

            const entity = this.repository.create(req.body as object);
            entity.id = null;
            
            const result = await this.repository.insert(entity);
            const inserted = await this.repository.findOneBy({ id: result.raw.insertId });
 
            res.json(inserted);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getAll = async (req, res) => {
        try {
            const haz = await this.hazRepository.findOneBy({
                id: req.params.hazId
            });
            if (!haz) {
                return this.handleError(res, null, 400, "A megadott azonosítóval nem található ház.");
            }

            const entities = await this.repository.findBy({
                dokumentum: { id: haz.id }
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

}