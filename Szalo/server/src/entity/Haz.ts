import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HazDTO } from '../../../models';
import { Foberlo } from './Foberlo';
import { Szerzodes } from './Szerzodes';
import { Jelentkezes } from './Jelentkezes';

@Entity()
export class Haz implements HazDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false })
    hrsz: string;

    @Column({nullable: false })
    irsz: number;

    @Column({ type: "varchar", nullable: false})
    telepules: string;

    @Column({ type: "varchar", nullable: false })
    cim: string;

    @Column({ type: 'float', nullable: false })
    reszi: number;

    @Column({ type: 'float', nullable: false })
    ar: number;

    @Column({nullable: false })
    szobakszama: number;

    @Column({ type: 'float', nullable: false})
    meret: number;

    @ManyToOne(() => Foberlo, (foberlo) => foberlo.hazak, { eager: true })
    tulaj: Foberlo;

    @Column({ type: "varchar", nullable: false })
    alapot: string;

    @Column({ type: "varchar", nullable: false })
    konfort: string;

    @Column({nullable: false })
    emelet: number;

    @Column({nullable: false })
    szint: number;

    @Column({ type: "varchar", nullable: false })
    lift: string;

    @Column({ type: "varchar", nullable: false })
    legkondi: string;

    @Column({ type: "varchar", nullable: false })
    butorozott: string;

    @Column({ type: "varchar", nullable: false })
    koltozheto: string;

    @Column({nullable: false })
    minberido: number;

    @Column({ type: "varchar", nullable: false })
    fureswc: string;

    @Column({ type: "varchar", nullable: false})
    kilatas: string;

    @Column({nullable: false })
    erkelymeret: number;

    @Column({ type: "varchar", nullable: false })
    gepesitet: string;

    @Column({ type: "varchar", nullable: false })
    hirdet: string;

    @OneToMany(() => Szerzodes, szerzodes => szerzodes.hid)
    szerzodesek: Szerzodes[];

    @OneToMany(() => Jelentkezes, jelentkezes => jelentkezes.haz)
    jelentkezesH: Jelentkezes[];

}