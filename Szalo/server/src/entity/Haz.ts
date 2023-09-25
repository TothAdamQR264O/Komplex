import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HazDTO } from '../../../models';
import { Foberlo } from './Foberlo';
import { Szerzodes } from './Szerzodes';

@Entity()
export class Haz implements HazDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    hrsz: string;

    @Column()
    irsz: number;

    @Column({ type: "varchar" })
    telepules: string;

    @Column({ type: "varchar" })
    cim: string;

    @Column({ type: 'float' })
    reszi: number;

    @Column({ type: 'float' })
    ar: number;

    @Column()
    szobakszama: number;

    @Column({ type: 'float'})
    meret: number;

    @ManyToOne(() => Foberlo, (foberlo) => foberlo.hazak, { eager: true })
    tulaj: Foberlo;

    @Column({ type: "varchar" })
    alapot: string;

    @Column({ type: "varchar" })
    konfort: string;

    @Column()
    emelet: number;

    @Column()
    szint: number;

    @Column({ type: "varchar" })
    lift: string;

    @Column({ type: "varchar" })
    legkondi: string;

    @Column({ type: "varchar" })
    butorozott: string;

    @Column({ type: "varchar" })
    koltozheto: string;

    @Column()
    minberido: number;

    @Column({ type: "varchar" })
    fureswc: string;

    @Column({ type: "varchar" })
    kilatas: string;

    @Column()
    erkelymeret: number;

    @Column({ type: "varchar" })
    gepesitet: string;

    @OneToMany(() => Szerzodes, szerzodes => szerzodes.hid)
    szerzodesek: Szerzodes[];

}