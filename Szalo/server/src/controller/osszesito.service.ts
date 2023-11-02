import { Repository } from "typeorm";
import { Haviosszesito } from "../entity/Haviosszesito";
import { OsszesitoLehetosegDTO, SzerzodesDTO } from "../../../models";
import moment from "moment";

export class OsszesitoService {
    constructor (private repository: Repository<Haviosszesito>) { }

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