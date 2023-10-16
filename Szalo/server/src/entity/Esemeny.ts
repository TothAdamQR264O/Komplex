import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EsemenyDTO, HazDTO } from '../../../models';
import { Foberlo } from './Foberlo';
import { Szerzodes } from './Szerzodes';
import { Jelentkezes } from './Jelentkezes';

@Entity()
export class Esemeny implements EsemenyDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false })
    datum: Date;

    @Column({nullable: false })
    koltseg: number;

    @Column({ type: "varchar", nullable: false})
    koltsvis: string;

    @Column({ type: "varchar", nullable: false })
    alapot: string;

    @Column({ type: "varchar", nullable: false })
    megjegyzes: string;


    @ManyToOne(() => Szerzodes, (szerzodes) => szerzodes.esemenyek, { eager: true })
    dokumentum: Szerzodes;

}