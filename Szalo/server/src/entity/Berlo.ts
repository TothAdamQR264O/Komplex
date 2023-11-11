import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BerloDTO } from '../../../models';
import { Szerzodes } from './Szerzodes';
import { Jelentkezes } from './Jelentkezes';

@Entity()
export class Berlo implements BerloDTO{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50 })
    nev: string;

    @Column({ type: "varchar", unique: true })
    email: string;

    @Column({ type: "varchar", select: false })
    password: string;
    
    @Column()
    telefonszam: number;

    @Column({nullable: false })
    irsz: number;

    @Column({ type: "varchar", nullable: false})
    telepules: string;

    @Column({ type: "varchar", nullable: false })
    cim: string;

    @OneToMany(() => Szerzodes, szerzodes => szerzodes.berlo)
    szerzodesek: Szerzodes[];

    @OneToMany(() => Jelentkezes, jelentkezes => jelentkezes.berlo)
    jelentkezesB: Jelentkezes[];
}