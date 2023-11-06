import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FoberloDTO, SzerzodesDTO } from '../../../models';
import { Haz } from './Haz';
import { Szerzodes } from './Szerzodes';
import { SzamlazzHuIntegracio } from './SzamlazzHuIntegracio';

@Entity()
export class Foberlo implements FoberloDTO{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50 })
    namefb: string;

    @Column({ type: "varchar", unique: true })
    email: string;

    @Column({ type: "varchar", select: false })
    password: string;

    @Column({ type: "varchar", length: 26 })
    szamlaszamfb: string;

    @Column()
    telfb: number;

    @Column({ type: "varchar" })
    bank: string;

    @OneToOne(() => SzamlazzHuIntegracio)
    szamlazzHuIntegracio: SzamlazzHuIntegracio;

    @OneToMany(() => Haz, haz => haz.tulaj)
    hazak: Haz[];

    @OneToMany(() => Szerzodes, szerzodes => szerzodes.tid)
    szerzodesek: Szerzodes[];
}