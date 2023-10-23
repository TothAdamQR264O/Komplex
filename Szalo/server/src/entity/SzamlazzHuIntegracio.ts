import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Foberlo } from "./Foberlo";
import { SzamlazzHuIntegracioDTO } from "../../../models";

@Entity()
export class SzamlazzHuIntegracio implements SzamlazzHuIntegracioDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    apiKulcs: string;

    @OneToOne(() => Foberlo)
    @JoinColumn()
    tulajdonos: Foberlo;
}