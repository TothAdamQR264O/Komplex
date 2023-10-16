import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HazDTO, SzerzodesDTO } from '../../../models';
import { Foberlo } from './Foberlo';
import { Berlo } from './Berlo';
import { Haz } from './Haz';
import { Esemeny } from './Esemeny';

@Entity()
export class Szerzodes implements SzerzodesDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    kezdido: Date;

    @Column()
    vegido: Date;

    @Column()
    kaukcio: number;

    @Column()
    ggyszam: number;

    @Column()
    agyszam: number;

    @Column()
    vgyszam: number;

    @Column()
    gora: number;

    @Column()
    aora: number;

    @Column()
    vora: number;

    @ManyToOne(() => Foberlo, (foberlo) => foberlo.szerzodesek, { eager: true })
    tid: Foberlo;

    @ManyToOne(() => Berlo, (berlo) => berlo.szerzodesek, { eager: true })
    bid: Berlo;

    @ManyToOne(() => Haz, (haz) => haz.szerzodesek, { eager: true })
    hid: Haz;

    @OneToMany(() => Esemeny, esemeny => esemeny.dokumentum)
    esemenyek: Esemeny[];
}