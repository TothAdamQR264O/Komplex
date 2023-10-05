import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { JelentkezesDTO } from "../../../models";
import { Berlo } from "./Berlo";
import { Haz } from "./Haz";


@Entity()
export class Jelentkezes implements JelentkezesDTO{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    hid: number;

    @Column()
    bid: number;

    /*@ManyToMany(() => Berlo)
    @JoinTable()
    categoriesB: Berlo[]

    @ManyToMany(() => Haz)
    @JoinTable()
    categoriesH: Haz[]*/
}