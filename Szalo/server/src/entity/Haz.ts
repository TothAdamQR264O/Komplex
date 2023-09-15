import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HazDTO } from '../../../models';
import { Foberlo } from './Foberlo';
import { Szoba } from './Szoba';

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

    @Column()
    furdo: number;

    @Column()
    wc: number;

    @Column({ type: "varchar", length: 5 })
    viz: string;

    @Column({ type: "varchar", length: 5 })
    melegviz: string;

    @Column({ type: "varchar", length: 5 })
    internet: string;

    @Column({ type: "varchar", length: 5 })
    tv: string;

    @Column({ type: "varchar", length: 5 })
    mosogep: string;

    @Column({ type: 'float'})
    meret: number;

    @ManyToOne(() => Foberlo, (foberlo) => foberlo.hazak, { eager: true })
    tulaj: Foberlo;

    @OneToMany(() => Szoba, szoba => szoba.hid)
    szoba: Szoba[];
}