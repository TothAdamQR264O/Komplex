import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BerloDTO } from '../../../models';
import { Szoba } from './Szoba';

@Entity()
export class Berlo implements BerloDTO{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50 })
    nameb: string;

    @Column({ type: "varchar", unique: true })
    email: string;

    @Column({ type: "varchar", select: false })
    password: string;

    @Column({ type: "varchar", length: 26 })
    szamlaszamb: string;
    
    @Column()
    telb: number;

    @ManyToOne(() => Szoba, (szoba) => szoba.berlo, { eager: true })
    szid: Szoba;
}