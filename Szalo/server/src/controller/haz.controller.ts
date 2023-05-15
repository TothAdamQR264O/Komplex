import { AppDataSource } from "../data-source";
import { Haz } from "../entity/Haz";
import { Controller } from "./base.controller";

export class HazController extends Controller {
    repository = AppDataSource.getRepository(Haz);
}