import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HaviosszesitoDTO } from '../../../models';
import { Szerzodes } from './Szerzodes';
import { OsszesitoTetel } from './OsszesitoTetel';

@Entity()
export class Haviosszesito implements HaviosszesitoDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    datum: Date;

    @Column()
    ev: number;

    @Column()
    honap: number; 

    @Column()
    fizetve: boolean;

    @OneToMany(() => OsszesitoTetel, tetel => tetel.osszesito, { cascade: true })
    tetelek: OsszesitoTetel[]; 

    //szamla: Szamla;

    @ManyToOne(() => Szerzodes, (szerzodes) => szerzodes.haviosszeg, { eager: true })
    szerzodes: Szerzodes;

}