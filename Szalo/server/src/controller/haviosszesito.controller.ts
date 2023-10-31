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
import { OsszesitoLehetosegDTO } from "../../../models";
import { OsszesitoTetel } from "../entity/OsszesitoTetel";

import { SzamlazzHuIntegracio } from "../entity/SzamlazzHuIntegracio";
import { Szamla } from "../entity/Szamla";
import { Between } from "typeorm";

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

    getAll = async (req, res) => {
        try {
            const szerzodesId = req.params.szerzodesId;
            const entities = await this.repository.findBy({
                szerzodes: { id: szerzodesId }
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
                return this.handleError(res, null, 400, "A megadott szerződés nem létezik.");
            }

            // TODO: létrehozható-e a kért összesítő?

            const haviDij = szerzodes.hid.ar;
            const rezsi = szerzodes.hid.reszi;
            const kaucio = szerzodes.kaukcio;

            const havidijEntity = this.osszesitoTetelRepository.create({
                megnevezes: 'Havi bérleti díj',
                mennyiseg: 1,
                osszeg: haviDij
            });

            const rezsiEntity = this.osszesitoTetelRepository.create({
                megnevezes: 'Rezsiköltség',
                mennyiseg: 1,
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

            const karesemenyek = await this.esemenyRepository.findBy({
                zarasDatum: Between(elsoNap.format('YYYY-MM-DD'), utolsoNap.format('YYYY-MM-DD'))
            });
            
            // TODO: események létrehozása tételekként

            // osszesitoEntity.tetelek.push()

            // TODO: kezelni azt az esetet, amikor a szerződés első v. utolsó hónapjában vagyunk

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
                    name: 'OTP Bank',
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
                    unit: 'hónap',
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
            catch(err) {
                this.handleError(res, err, 500, "A számlagenerálás során hiba történt, kérjük kézzel állítsa ki a számlát!");
            }

            const result = await this.repository.save(osszesitoEntity);
            res.json(result);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getLehetosegek = async (req, res) => {
        try {
            const szerzodes = await this.szerzodesRepository.findOneBy({
                id: req.params.szerzodesId
            });
            if (!szerzodes) {
                return this.handleError(res, null, 400, "A megadott szerződés nem létezik.");
            }

            const kezdoDatum = moment(szerzodes.kezdido).format('YYYY-MM-DD');
            const zaroDatum = moment().subtract(1, 'months').format('YYYY-MM-DD');
            const lehetosegek = this.getYearMonthPairs(kezdoDatum, zaroDatum);

            const osszesitok = await this.repository.findBy({
                szerzodes: {
                    id: req.params.szerzodesId
                }
            });

            for (const osszesito of osszesitok) {
                for (let i = 0; i < lehetosegek.length; i++) {
                    if (osszesito.ev == lehetosegek[i].ev && osszesito.honap == lehetosegek[i].honap) {
                        lehetosegek.splice(i, 1);
                    }
                }
            }

            res.json(lehetosegek);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    private getYearMonthPairs = (startDate, endDate): OsszesitoLehetosegDTO[] => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const yearMonthPairs = [];

        let current = new Date(start);

        while (current <= end) {
            const year = current.getFullYear();
            const month = current.getMonth() + 1;
            yearMonthPairs.push({ ev: year, honap: month });
            current.setMonth(current.getMonth() + 1);
        }

        return yearMonthPairs;
    }
}