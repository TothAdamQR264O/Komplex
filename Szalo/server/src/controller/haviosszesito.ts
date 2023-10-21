import { Controller } from "./base.controller";
import { Berlo } from "../entity/Berlo";
import { Haz } from "../entity/Haz";
import { AppDataSource } from "../data-source";
import { Esemeny } from "../entity/Esemeny";
import { Foberlo } from "../entity/Foberlo";
import { Szerzodes } from "../entity/Szerzodes";
import { Haviosszesito } from "../entity/Haviosszesito";

export class HaviosszesitoController extends Controller{
    repository = AppDataSource.getRepository(Haviosszesito);
    esemenyRepository = AppDataSource.getRepository(Esemeny);
    hazRepository = AppDataSource.getRepository(Haz);
    berloRepository = AppDataSource.getRepository(Berlo);
    foberloRepository = AppDataSource.getRepository(Foberlo);
    szerzodesRepository = AppDataSource.getRepository(Szerzodes);

    create = async (req, res) => {
        try {
            const szerzodes = await this.szerzodesRepository.findOneBy({
                id: req.params.szid
            });
            if (!szerzodes) {
                return this.handleError(res, null, 400, "A megadott azonosítóval nem található ház.");
            }

            const entity = this.repository.create(req.body as object);
            entity.id = null;
            entity.ar = szerzodes.hid.ar;
            entity.rezsi = szerzodes.hid.reszi;
            
            entity.osszesen = entity.ar + entity.rezsi + entity.egyeb;
            entity.szid = szerzodes;
            
            const result = await this.repository.insert(entity);
            const inserted = await this.repository.findOneBy({ id: result.raw.insertId });
 
            res.json(inserted);
        } catch (err) {
            this.handleError(res, err);
        }
    };
}