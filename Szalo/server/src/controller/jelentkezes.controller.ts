import { Controller } from "./base.controller";
import { Jelentkezes } from "../entity/Jelentkezes";
import { Berlo } from "../entity/Berlo";
import { Haz } from "../entity/Haz";
import { AppDataSource } from "../data-source";

export class JelentkezesController extends Controller{
    repository = AppDataSource.getRepository(Jelentkezes);
    hazRepository = AppDataSource.getRepository(Haz);
    berloRepository = AppDataSource.getRepository(Berlo);

    create = async (req, res) => {
        try {
            const berlo = await this.berloRepository.findOneBy({
                id: req.auth.id
            });
            if (!berlo) {
                return this.handleError(res, null, 400, "A megadott azonosítóval nem található tulajdonos.");
            }

            const ingatlan = await this.hazRepository.findOneBy({
                id: req.auth.id
            });
            if (!ingatlan) {
                return this.handleError(res, null, 400, "A megadott azonosítóval nem található ingatlan.");
            }

            const entity = this.repository.create(req.body as object);
            entity.id = null;
            entity.berlo = berlo;
            entity.haz = ingatlan;
            
            const result = await this.repository.insert(entity);
            const inserted = await this.repository.findOneBy({ id: result.raw.insertId });
 
            res.json(inserted);
        } catch (err) {
            this.handleError(res, err);
        }
    };

}