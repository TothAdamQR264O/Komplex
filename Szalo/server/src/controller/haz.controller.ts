import { AppDataSource } from "../data-source";
import { Haz } from "../entity/Haz";
import { Controller } from "./base.controller";

export class HazController extends Controller {
    repository = AppDataSource.getRepository(Haz);

    getAll = async (req, res) => {
        try {
            req.auth.id
            const entities = await this.repository.find();
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };
}