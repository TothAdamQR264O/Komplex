import { AppDataSource } from "../data-source";
import { Foberlo } from "../entity/Foberlo";
import { Haz } from "../entity/Haz";
import { Controller } from "./base.controller";

export class HazController extends Controller {
    repository = AppDataSource.getRepository(Haz);
    foberloRepository = AppDataSource.getRepository(Foberlo);

    create = async (req, res) => {
        try {
            const tulaj = await this.foberloRepository.findOneBy({
                id: req.auth.id
            });
            if (!tulaj) {
                return this.handleError(res, null, 400, "A megadott azonosítóval nem található tulajdonos.");
            }

            const entity = this.repository.create(req.body as object);
            entity.id = null;
            entity.tulaj = tulaj;
            
            const result = await this.repository.insert(entity);
            const inserted = await this.repository.findOneBy({ id: result.raw.insertId });
 
            res.json(inserted);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getAll = async (req, res) => {
        try {
            const tulaj = await this.foberloRepository.findOneBy({
                id: req.auth.id
            });
            if (!tulaj) {
                return this.handleError(res, null, 400, "A megadott azonosítóval nem található tulajdonos.");
            }

            const entities = await this.repository.findBy({
                tulaj: { id: req.auth.id }
            });
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };
}