import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Szamla } from "../entity/Szamla";
import { SzamlazzHuIntegracio } from "../entity/SzamlazzHuIntegracio";
import { LogikaiDTO } from "../../../models";

export class SzamlaController extends Controller {
    repository = AppDataSource.getRepository(Szamla);
    szamlazzHuIntegracioRepository = AppDataSource.getRepository(SzamlazzHuIntegracio);

    getOne = async (req, res) => {
        try {
            const id = req.params.id;
            const entity = await this.repository.findOne({
                select: ['id', 'bruttoOsszeg', 'szamlaId', 'pdf'],
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

    integracioLetezik = async (req, res) => {
        try {
            const integracio = await this.szamlazzHuIntegracioRepository.findOneBy({
                tulajdonos: { id: req.auth.id }
            });

            res.json({ result: !!integracio } as LogikaiDTO);
        } catch (err) {
            this.handleError(res, err);
        }
    }

    integracioLetrehozas = async (req, res) => {
        try {
            const tulajId = req.auth.id;
            const apiKulcs = req.body.apiKulcs;
            if (!apiKulcs) {
                return this.handleError(res, null, 400, 'API kulcs megadása kötelező!');
            }

            let integracio = await this.szamlazzHuIntegracioRepository.findOneBy({
                tulajdonos: { id: req.auth.id }
            });

            if (integracio) {
                integracio.apiKulcs = apiKulcs;
            } else {
                integracio = this.szamlazzHuIntegracioRepository.create({
                    apiKulcs: apiKulcs,
                    tulajdonos: { id: tulajId }
                });
            }

            await this.szamlazzHuIntegracioRepository.save(integracio)
            res.json();
        } catch (err) {
            this.handleError(res, err);
        }
    }
}