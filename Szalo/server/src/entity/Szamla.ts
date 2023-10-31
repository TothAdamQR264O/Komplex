import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SzamlaDTO } from "../../../models";

@Entity()
export class Szamla implements SzamlaDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    szamlaId: string;

    @Column()
    bruttoOsszeg: number;

    @Column({ type: 'mediumtext', select: false })
    pdf: string;
}