import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SzobaDTO } from '../../../models';
import { Berlo } from './Berlo';
import { Haz } from './Haz';

@Entity()
export class Szoba implements SzobaDTO {
    @PrimaryGeneratedColumn()
    szid: number;

    @Column({ type: 'float' })
    ar: number;

    @Column({ type: 'float' })
    meret: number;

    @Column()
    ferohely: number;

    @ManyToOne(() => Haz, (haz) => haz.szoba, { eager: true })
    hrsz: Haz;

    @OneToMany(() => Berlo, berlo => berlo.szid)
    berlo: Berlo[];
}