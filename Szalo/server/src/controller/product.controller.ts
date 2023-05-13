import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { Controller } from "./base.controller";

export class ProductController extends Controller {
    repository = AppDataSource.getRepository(Product);
}