import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OsszesitoTetelDTO } from "../../../models";
import { Haviosszesito } from "./Haviosszesito";

@Entity()
export class OsszesitoTetel implements OsszesitoTetelDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    megnevezes: string;

    @Column()
    mennyiseg: number;
    
    @Column()
    egyseg: string;

    @Column()
    osszeg: number;

    @ManyToOne(() => Haviosszesito, osszesito => osszesito.tetelek)
    osszesito: Haviosszesito;
}
