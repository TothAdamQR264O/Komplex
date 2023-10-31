import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { HaviosszesitoDTO } from '../../../models';
import { Szerzodes } from './Szerzodes';
import { OsszesitoTetel } from './OsszesitoTetel';
import { Szamla } from './Szamla';

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

    @OneToOne(() => Szamla, { eager: true, cascade: true })
    @JoinColumn()
    szamla: Szamla;

    @ManyToOne(() => Szerzodes, (szerzodes) => szerzodes.haviosszeg, { eager: true })
    szerzodes: Szerzodes;

}