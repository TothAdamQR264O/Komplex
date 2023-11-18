import { Between, Repository } from "typeorm";
import { Haviosszesito } from "../entity/Haviosszesito";
import { HaviosszesitoDTO, OsszesitoLehetosegDTO, SzamlazzHuIntegracioDTO, SzerzodesDTO } from "../../../models";
import moment from "moment";
import { OsszesitoTetel } from "../entity/OsszesitoTetel";
import { Esemeny } from "../entity/Esemeny";

import { Client, Seller, Buyer, Item, Invoice, PaymentMethods } from 'szamlazz.js';

export class OsszesitoService {
    constructor(
        private repository: Repository<Haviosszesito>,
        private osszesitoTetelRepository: Repository<OsszesitoTetel>,
        private esemenyRepository: Repository<Esemeny>) { }

    lehetosegek = async (szerzodes: SzerzodesDTO): Promise<OsszesitoLehetosegDTO[]> => {
        try {
            const kezdoDatum = moment(szerzodes.kezdido).format('YYYY-MM-DD');
            const zaroDatum = moment().subtract(1, 'months').format('YYYY-MM-DD');
            const lehetosegek = this.osszesLehetoseg(kezdoDatum, zaroDatum);

            const osszesitok = await this.repository.findBy({
                szerzodes: { id: szerzodes.id }
            });

            for (const osszesito of osszesitok) {
                for (let i = 0; i < lehetosegek.length; i++) {
                    if (osszesito.ev == lehetosegek[i].ev && osszesito.honap == lehetosegek[i].honap) {
                        lehetosegek.splice(i, 1);
                    }
                }
            }

            return lehetosegek;
        } catch (err) {
            throw new Error('Adatbázis hiba az összesítés során.');
        }
    };

    letrehozhato = async (szerzodes: SzerzodesDTO, ev: number, honap: number): Promise<boolean> => {
        const lehetosegek = await this.lehetosegek(szerzodes);
        const lehetoseg = lehetosegek.find(lehetoseg => lehetoseg.ev == ev && lehetoseg.honap == honap);
        return !!lehetoseg;
    };

    osszesito = async (szerzodes: SzerzodesDTO, ev: number, honap: number, utolso: boolean = false): Promise<HaviosszesitoDTO> => {
        const szerzodesKezdoDatum = moment(szerzodes.kezdido);

        let haviDij = szerzodes.lakas.ar;
        if (szerzodesKezdoDatum.get('year') == ev && szerzodesKezdoDatum.get('month') == honap - 1) {
            const honapNapjai = szerzodesKezdoDatum.daysInMonth();
            const szamlazandoNapok = honapNapjai - szerzodesKezdoDatum.get('date');
            haviDij = Math.floor(szamlazandoNapok / honapNapjai * haviDij);
        }

        if (utolso) {
            const ma = moment();
            ev = ma.get('year');
            honap = ma.get('month') + 1;
        }

        if (utolso && (moment().get('year') != szerzodesKezdoDatum.get('year') || moment().get('month') != szerzodesKezdoDatum.get('month'))) {
            const honapNapjai = moment().daysInMonth();
            const ma = moment().get('date');
            haviDij = Math.floor(ma / honapNapjai * haviDij);
        }

        if (utolso && moment().get('year') == szerzodesKezdoDatum.get('year') && moment().get('month') == szerzodesKezdoDatum.get('month')) {
            const honapNapjai = moment().daysInMonth();
            const kezdo = szerzodesKezdoDatum.get('date');
            const ma = moment().get('date');
            const eltoltottNapok = ma - kezdo + 1;
            haviDij = Math.floor(eltoltottNapok / honapNapjai * haviDij);
        }

        const rezsi = szerzodes.lakas.rezsi;

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

        const osszesitoEntity: HaviosszesitoDTO = this.repository.create({
            datum: moment().format('YYYY-MM-DD'),
            ev: ev,
            honap: honap,
            fizetve: false,
            szerzodes: szerzodes
        });

        const elsoNap = moment().set('year', ev).set('month', honap - 1).startOf('month');
        const utolsoNap = moment().set('year', ev).set('month', honap - 1).endOf('month');

        const karesemenyek = await this.esemenyRepository.findBy({
            zarasDatum: Between(elsoNap.format('YYYY-MM-DD'), utolsoNap.format('YYYY-MM-DD'))
        });

        for (const karesemeny of karesemenyek) {
            if (karesemeny.koltseg === 0) {
                continue;
            }

            if (karesemeny.koltsegviselo === 'Tulaj' && karesemeny.rendhasz) {
                continue;
            }

            if (karesemeny.koltsegviselo === 'Tulaj' && !karesemeny.rendhasz) {
                tetelek.push(this.osszesitoTetelRepository.create({
                    megnevezes: `${karesemeny.id}. káresemény megtérítése`,
                    mennyiseg: 1,
                    egyseg: 'alkalom',
                    osszeg: karesemeny.koltseg
                }));
            }

            if (karesemeny.koltsegviselo === 'Bérlő' && karesemeny.rendhasz) {
                tetelek.push(this.osszesitoTetelRepository.create({
                    megnevezes: `${karesemeny.id}. káresemény megtérítése`,
                    mennyiseg: 1,
                    egyseg: 'alkalom',
                    osszeg: -karesemeny.koltseg
                }));
            }

            if (karesemeny.koltsegviselo === 'Bérlő' && !karesemeny.rendhasz) {
                tetelek.push(this.osszesitoTetelRepository.create({
                    megnevezes: `${karesemeny.id}. káresemény megtérítése`,
                    mennyiseg: 1,
                    egyseg: 'alkalom',
                    osszeg: karesemeny.koltseg
                }));
            }
        }

        osszesitoEntity.tetelek = tetelek;

        return osszesitoEntity;
    }

    szamla = (szerzodes: SzerzodesDTO, osszesito: HaviosszesitoDTO, szamlazzHuAdatok: SzamlazzHuIntegracioDTO): Invoice => {
        const seller = new Seller({
            bank: {
                name: szerzodes.tulajdonos.bank,
                accountNumber: szerzodes.tulajdonos.szamlaszam
            }
        });

        const buyer = new Buyer({
            name: szerzodes.berlo.nev,
            zip: String(szerzodes.berlo.irsz),
            city: szerzodes.berlo.telepules,
            address: szerzodes.berlo.cim,
            phone: szerzodes.berlo.telefonszam,
            email: szerzodes.berlo.email
        });

        const items = osszesito.tetelek.map(tetel => new Item({
            label: tetel.megnevezes,
            quantity: tetel.mennyiseg,
            unit: tetel.egyseg,
            vat: 27,
            grossUnitPrice: tetel.osszeg
        }));

        return new Invoice({
            paymentMethod: PaymentMethods.BankTransfer,
            seller: seller,
            buyer: buyer,
            items: items
        });
    }

    private osszesLehetoseg = (kezdoDatum, vegDatum): OsszesitoLehetosegDTO[] => {
        const start = new Date(kezdoDatum);
        const cel = new Date(vegDatum);
        const lehetosegek = [];

        let aktualis = new Date(start);

        while (aktualis <= cel) {
            const ev = aktualis.getFullYear();
            const honap = aktualis.getMonth() + 1;
            lehetosegek.push({ ev, honap });
            aktualis.setMonth(aktualis.getMonth() + 1);
        }

        return lehetosegek;
    }
}