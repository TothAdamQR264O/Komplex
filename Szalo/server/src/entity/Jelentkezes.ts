import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { JelentkezesDTO } from "../../../models";


@Entity()
export class Jelentkezes implements JelentkezesDTO{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    hid: number;

    @Column()
    bid: number;
}