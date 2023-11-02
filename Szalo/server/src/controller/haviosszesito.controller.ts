import { Controller } from "./base.controller";
import { Berlo } from "../entity/Berlo";
import { Haz } from "../entity/Haz";
import { AppDataSource } from "../data-source";
import { Esemeny } from "../entity/Esemeny";
import { Foberlo } from "../entity/Foberlo";
import { Szerzodes } from "../entity/Szerzodes";
import { Haviosszesito } from "../entity/Haviosszesito";

import moment from 'moment';
import { Client, Seller, Buyer, Item, Invoice, PaymentMethods } from 'szamlazz.js';
import { OsszesitoTetel } from "../entity/OsszesitoTetel";

import { SzamlazzHuIntegracio } from "../entity/SzamlazzHuIntegracio";
import { Szamla } from "../entity/Szamla";
import { Between } from "typeorm";
import { OsszesitoService } from "./osszesito.service";

export class HaviosszesitoController extends Controller {
    repository = AppDataSource.getRepository(Haviosszesito);
    osszesitoTetelRepository = AppDataSource.getRepository(OsszesitoTetel);
    szamlazzHuIntegracioRepository = AppDataSource.getRepository(SzamlazzHuIntegracio);
    szamlaRepository = AppDataSource.getRepository(Szamla);
    esemenyRepository = AppDataSource.getRepository(Esemeny);
    hazRepository = AppDataSource.getRepository(Haz);
    berloRepository = AppDataSource.getRepository(Berlo);
    foberloRepository = AppDataSource.getRepository(Foberlo);
    szerzodesRepository = AppDataSource.getRepository(Szerzodes);

    osszesitoService = new OsszesitoService(this.repository);

    getAll = async (req, res) => {
        try {
            const szerzodesId = req.params.szerzodesId;
            const entities = await this.repository.find({
                where: {
                    szerzodes: { id: szerzodesId }
                },
                order: { ev: 'ASC', honap: 'ASC' }
            });
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    create = async (req, res) => {
        try {
            const szerzodes = await this.szerzodesRepository.findOneBy({
                id: req.params.szerzodesId
            });
            if (!szerzodes) {
                return this.handleError(res, null, 404, "A megadott szerződés nem létezik.");
            }

            const osszesitoEv = req.params.evszam;
            const osszesitoHonap = req.params.honapszam;

            if (!osszesitoEv || !osszesitoHonap) {
                return this.handleError(res, null, 400, "Az összesítő létrehozásához év és hónapszám megadása szükséges.");
            }
            
            // az összesítés nem hozható létre:
            // - ha már létezik
            // - ha a szerződés időtartamán kívüli
            // - ha az aktuális hónapra vagy azt követő időszakra vonatkozik
            const letrehozhato = await this.osszesitoService.letrehozhato(szerzodes, osszesitoEv, osszesitoHonap);
            if (!letrehozhato) {
                return this.handleError(res, null, 400, 'A megadott hónapra nem készíthető összesítés.') 
            }

            const haviDij = szerzodes.hid.ar;
            const rezsi = szerzodes.hid.reszi;

            const havidijEntity = this.osszesitoTetelRepository.create({
                megnevezes: 'Havi bérleti díj',
                mennyiseg: 1,
                egyseg: 'hónap',
                osszeg: haviDij
            });

            const rezsiEntity = this.osszesitoTetelRepository.create({
                megnevezes: 'Rezsiköltség',
                mennyiseg: 1,
                egyseg: 'hónap',
                osszeg: rezsi
            });

            const tetelek: OsszesitoTetel[] = [havidijEntity, rezsiEntity];

            const osszesitoEntity = this.repository.create({
                datum: moment().format('YYYY-MM-DD'),
                ev: req.params.evszam,
                honap: req.params.honapszam,
                fizetve: false,
                szerzodes: szerzodes,
                tetelek: tetelek
            });

            
            const elsoNap = moment().set('year', req.params.evszam).set('month', req.params.honapszam - 1).startOf('month');
            const utolsoNap = moment().set('year', req.params.evszam).set('month', req.params.honapszam - 1).endOf('month');
            
            // TODO: események létrehozása tételekként
            const karesemenyek = await this.esemenyRepository.findBy({
                zarasDatum: Between(elsoNap.format('YYYY-MM-DD'), utolsoNap.format('YYYY-MM-DD'))
            });
            // osszesitoEntity.tetelek.push()

            const szamlazzHuAdatok = await this.szamlazzHuIntegracioRepository.findOneBy({
                tulajdonos: { id: szerzodes.tid.id }
            });

            const szamlazzClient = new Client({
                authToken: szamlazzHuAdatok.apiKulcs,
                eInvoice: true,
                requestInvoiceDownload: true,
                downloadedInvoiceCount: 1,
                responseVersion: 1,
                timeout: 15000
            });

            const seller = new Seller({
                bank: {
                    name: 'OTP Bank', // TODO
                    accountNumber: szerzodes.tid.szamlaszamfb
                }
            });

            const buyer = new Buyer({
                name: szerzodes.bid.nameb,
                zip: szerzodes.bid.irsz,
                city: szerzodes.bid.telepules,
                address: szerzodes.bid.cim,
                phone: szerzodes.bid.telb,
                email: szerzodes.bid.email
            });

            const items = tetelek.map(tetel => {
                return new Item({
                    label: tetel.megnevezes,
                    quantity: tetel.mennyiseg,
                    unit: tetel.egyseg,
                    vat: 27,
                    grossUnitPrice: tetel.osszeg
                });
            });

            const invoice = new Invoice({
                paymentMethod: PaymentMethods.BankTransfer,
                seller: seller,
                buyer: buyer,
                items: items
            });

            try {
                const szamla = await szamlazzClient.issueInvoice(invoice);
                const szamlaEntity = this.szamlaRepository.create({
                    szamlaId: szamla.invoiceId,
                    bruttoOsszeg: szamla.grossTotal,
                    pdf: Buffer.from(szamla.pdf).toString('base64')
                });

                osszesitoEntity.szamla = szamlaEntity;
            }
            catch (err) {
                return this.handleError(res, err, 500, "A számlagenerálás során hiba történt, kérjük kézzel állítsa ki a számlát!");
            }

            const result = await this.repository.save(osszesitoEntity);
            res.json(result);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getLehetosegek = async (req, res) => {
        try {
            const szerzodes = await this.szerzodesRepository.findOneBy({ id: req.params.szerzodesId });
            if (!szerzodes) {
                return this.handleError(res, null, 400, "A megadott szerződés nem létezik.");
            }

            const lehetosegek = await this.osszesitoService.lehetosegek(szerzodes);
            res.json(lehetosegek);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    fizetve = async (req, res) => {
        try {
            const osszesito = await this.repository.findOneBy({ id: req.params.id });
            if (!osszesito || osszesito.fizetve) {
                return this.handleError(res, null, 400, "A megadott összesítő nem létezik vagy már ki lett fizetve.");
            }

            osszesito.fizetve = true;
            this.repository.save(osszesito);

            res.status(200).send();
        }
        catch(err) {
            this.handleError(res, err);
        }

    };
}