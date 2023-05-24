import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { BerloDTO } from '../../../models';
import { Szoba } from './Szoba';

@Entity()
export class Berlo implements BerloDTO{
    @PrimaryColumn()
    szemszamb: string;

    @Column({ type: 'text' })
    nameb: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'text' })
    szamlaszamb: string;

    @Column({ select: false })
    password: string;
    
    @Column()
    telb: number;

    @ManyToOne(() => Szoba, (szoba) => szoba.berlo, { eager: true })
    szid: Szoba;
}