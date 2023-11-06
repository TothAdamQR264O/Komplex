import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EsemenyDTO, HazDTO } from '../../../models';
import { Szerzodes } from './Szerzodes';

@Entity()
export class Esemeny implements EsemenyDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', nullable: false })
    datum: string;

    @Column({ type: "varchar", nullable: false})
    tipus: string;

    @Column({ nullable: false})
    rendhasz: boolean;

    @Column({nullable: false })
    koltseg: number;

    @Column({ type: "varchar", nullable: false})
    koltsvis: "Tulaj" | "Bérlő";

    @Column({ type: "varchar", nullable: false })
    alapot: string;

    @Column({ type: "varchar", nullable: false })
    megjegyzes: string;
    
    @Column({ type: 'date', nullable: false })
    zarasDatum: string;

    @ManyToOne(() => Szerzodes, (szerzodes) => szerzodes.esemenyek, { eager: true })
    dokumentum: Szerzodes;

}