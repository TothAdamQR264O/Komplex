import { Controller } from "./base.controller";
import { Jelentkezes } from "../entity/Jelentkezes";
import { Berlo } from "../entity/Berlo";
import { Haz } from "../entity/Haz";
import { AppDataSource } from "../data-source";
import { Foberlo } from "../entity/Foberlo";
import { Szerzodes } from "../entity/Szerzodes";

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
            entity.tid = tulaj;
            entity.hid = apply.haz;
            entity.bid = apply.berlo;
            
            const result = await this.repository.insert(entity);
            const inserted = await this.repository.findOneBy({ id: result.raw.insertId });

            const masJelentkezesek = await this.jelntkezrepository.findBy({
                haz: { id: entity.hid.id }
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
                bid: { id: req.auth.id }
            });
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getTulaj = async (req, res) => {
        try {
            const haz = await this.hazRepository.findOneBy({
                id: req.params.hazId
            });
            if (!haz) {
                return this.handleError(res, null, 400, "A megadott azonosítóval nem található ház.");
            }

            const entities = await this.repository.findBy({
                hid: { id: haz.id }
            });
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };

}