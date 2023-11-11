import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HazDTO, SzerzodesDTO } from '../../../models';
import { Foberlo } from './Foberlo';
import { Berlo } from './Berlo';
import { Haz } from './Haz';
import { Esemeny } from './Esemeny';
import { Haviosszesito } from './Haviosszesito';

@Entity()
export class Szerzodes implements SzerzodesDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    kezdido: Date;

    @Column({ type: 'date' })
    vegido: Date;

    @Column({ default: true })
    aktiv: boolean;

    @Column({ type: 'date' })
    lezarasDatum: string;
    
    @Column()
    kaucio: number;

    @Column()
    gazOraGyariszam: number;

    @Column()
    gazOraKezdoAllas: number;

    @Column()
    gazOraVegAllas: number;

    @Column()
    villanyOraGyariszam: number;

    @Column()
    villanyOraKezdoAllas: number;

    @Column()
    villanyOraVegAllas: number;

    @Column()
    vizOraGyariszam: number;

    @Column()
    vizOraKezdoAllas: number;

    @Column()
    vizOraVegAllas: number;

    @ManyToOne(() => Foberlo, (foberlo) => foberlo.szerzodesek, { eager: true })
    tulajdonos: Foberlo;

    @ManyToOne(() => Berlo, (berlo) => berlo.szerzodesek, { eager: true })
    berlo: Berlo;

    @ManyToOne(() => Haz, (haz) => haz.szerzodesek, { eager: true })
    lakas: Haz;

    @OneToMany(() => Esemeny, esemeny => esemeny.dokumentum)
    esemenyek: Esemeny[];

    @OneToMany(() => Haviosszesito, haviosszeg => haviosszeg.szerzodes)
    haviosszeg: Haviosszesito[];
}