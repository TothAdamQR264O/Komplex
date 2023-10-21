import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HaviosszesitoDTO } from '../../../models';
import { Szerzodes } from './Szerzodes';

@Entity()
export class Haviosszesito implements HaviosszesitoDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    datum: Date;

    @Column({nullable: false })
    ar: number;

    @Column({ type: 'float', nullable: false })
    rezsi: number;

    @Column({nullable: false })
    egyeb: number;

    @Column({ type: 'float', nullable: false})
    osszesen: number;

    @ManyToOne(() => Szerzodes, (szerzodes) => szerzodes.haviosszeg, { eager: true })
    szid: Szerzodes;

   
}