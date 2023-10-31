import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BerloDTO } from '../../../models';
import { Szerzodes } from './Szerzodes';
import { Jelentkezes } from './Jelentkezes';

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

    @Column({nullable: false })
    irsz: number;

    @Column({ type: "varchar", nullable: false})
    telepules: string;

    @Column({ type: "varchar", nullable: false })
    cim: string;

    @OneToMany(() => Szerzodes, szerzodes => szerzodes.bid)
    szerzodesek: Szerzodes[];

    @OneToMany(() => Jelentkezes, jelentkezes => jelentkezes.berlo)
    jelentkezesB: Jelentkezes[];
}