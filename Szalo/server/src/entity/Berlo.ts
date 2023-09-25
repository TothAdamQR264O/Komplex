import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BerloDTO } from '../../../models';
import { Szerzodes } from './Szerzodes';

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

    @OneToMany(() => Szerzodes, szerzodes => szerzodes.bid)
    szerzodesek: Szerzodes[];
}