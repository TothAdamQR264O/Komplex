import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Szamla } from "../entity/Szamla";

export class SzamlaController extends Controller {
    repository = AppDataSource.getRepository(Szamla);

    getOne = async (req, res) => {
        try {
            const id = req.params.id;
            const entity = await this.repository.findOne({
                select: [ 'id', 'bruttoOsszeg', 'szamlaId', 'pdf' ],
                where: { id: id }
            });
            if (!entity) {
                return this.handleError(res, null, 404, 'Nem található számla ezzel az azonosítóval.');
            }

            res.json(entity);
        } catch (err) {
            this.handleError(res, err);
        }
    };
}