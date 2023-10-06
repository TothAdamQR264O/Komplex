import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { JelentkezesDTO } from "../../../models";
import { Berlo } from "./Berlo";
import { Haz } from "./Haz";


@Entity()
export class Jelentkezes implements JelentkezesDTO{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Berlo, (berlo) => berlo.jelentkezesB, { eager: true })
    berlo: Berlo;

    @ManyToOne(() => Haz, (haz) => haz.jelentkezesH, { eager: true })
    haz: Haz;

}