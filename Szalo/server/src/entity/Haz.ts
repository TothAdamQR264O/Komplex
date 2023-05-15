import { Column, Entity, PrimaryColumn } from 'typeorm';
import { HazDTO } from '../../../models';

@Entity()
export class Haz implements HazDTO {
    @PrimaryColumn()
    hrsz: string;

    @Column({ type: 'text' })
    cim: string;

    @Column({ type: 'text'})
    tulaj: string;

    @Column({ type: 'float' })
    reszi: number;

    @Column()
    furdo: number;

    @Column()
    wc: number;

    @Column({ type: 'text'})
    viz: string;

    @Column({ type: 'text'})
    melegviz: string;

    @Column({ type: 'text'})
    internet: string;

    @Column({ type: 'text'})
    tv: string;

    @Column({ type: 'text'})
    tuzhely: string;

    @Column({ type: 'text'})
    mosogep: string;

    @Column({ type: 'float'})
    meret: number;
}