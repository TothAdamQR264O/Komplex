import { Controller } from "./base.controller";
import { Berlo } from "../entity/Berlo";
import { Haz } from "../entity/Haz";
import { AppDataSource } from "../data-source";
import { Esemeny } from "../entity/Esemeny";
import { Foberlo } from "../entity/Foberlo";
import { Szerzodes } from "../entity/Szerzodes";
import { Haviosszesito } from "../entity/Haviosszesito";

import moment from 'moment';
import { OsszesitoLehetosegDTO } from "../../../models";
import { OsszesitoTetel } from "../entity/OsszesitoTetel";

import { SzamlazzHuIntegracio } from "../entity/SzamlazzHuIntegracio";

export class HaviosszesitoController extends Controller {
    repository = AppDataSource.getRepository(Haviosszesito);
    osszesitoTetelRepository = AppDataSource.getRepository(OsszesitoTetel);
    szamlazzHuIntegracioRepository = AppDataSource.getRepository(SzamlazzHuIntegracio);
    esemenyRepository = AppDataSource.getRepository(Esemeny);
    hazRepository = AppDataSource.getRepository(Haz);
    berloRepository = AppDataSource.getRepository(Berlo);
    foberloRepository = AppDataSource.getRepository(Foberlo);
    szerzodesRepository = AppDataSource.getRepository(Szerzodes);

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

            // TODO: események létrehozása tételekként

            // TODO: kezelni azt az esetet, amikor a szerződés első v. utolsó hónapjában vagyunk

            const szamlazzHuAdatok = await this.szamlazzHuIntegracioRepository.findOneBy({
                tulajdonos: { id: szerzodes.tid.id }
            });

            // TODO: számlázás megoldása
            // const { Client, Seller, Buyer, Invoice, Item, PaymentMethods } = await import('szamlazz.js');
            // const szamlazzClient = new Client({
            //     authToken: szamlazzHuAdatok.apiKulcs,
            //     eInvoice: true,
            //     requestInvoiceDownload: true,
            //     downloadedInvoiceCount: 1,
            //     responseVersion: 1,
            //     timeout: 15000
            // });

            // const seller = new Seller({
            //     bank: {
            //         name: 'OTP Bank',
            //         accountNumber: szerzodes.tid.szamlaszamfb
            //     }
            // });

            // const buyer = new Buyer({
            //     name: szerzodes.bid.nameb,
            //     zip: '3600',
            //     city: 'City',
            //     address: 'Some street address',
            //     phone: szerzodes.bid.telb,
            //     email: szerzodes.bid.email
            // });

            // const items = tetelek.map(tetel => {
            //     return new Item({
            //         label: tetel.megnevezes,
            //         quantity: tetel.mennyiseg,
            //         vat: 27,
            //         grossUnitPrice: tetel.osszeg
            //     });
            // });

            // const invoice = new Invoice({
            //     paymentMethod: PaymentMethods.BankTransfer,
            //     seller: seller,
            //     buyer: buyer,
            //     items: items
            // });

            // const szamla = await szamlazzClient.issueInvoice(invoice)
            // console.log(szamla);

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