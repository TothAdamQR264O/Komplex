import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SzobaDTO } from '../../../models';
import { Berlo } from './Berlo';
import { Haz } from './Haz';

@Entity()
export class Szoba implements SzobaDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 10 })
    nev: string;

    @Column({ type: 'float' })
    ar: number;

    @Column({ type: 'float' })
    meret: number;

    @Column()
    ferohely: number;

    @Column({ type: "varchar", length: 4 })
    kiado: string;

    @Column()
    szabadhely: number;

    @ManyToOne(() => Haz, (haz) => haz.szoba, { eager: true })
    hid: Haz;

    @OneToMany(() => Berlo, berlo => berlo.szid)
    berlo: Berlo[];
}