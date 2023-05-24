import { AppDataSource } from "../data-source";
import { Szoba } from "../entity/Szoba";
import { Controller } from "./base.controller";

export class SzobaController extends Controller{
    repository = AppDataSource.getRepository(Szoba);
}