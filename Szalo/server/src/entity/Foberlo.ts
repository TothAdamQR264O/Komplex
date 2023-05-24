import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { FoberloDTO } from '../../../models';
import { Haz } from './Haz';

@Entity()
export class Foberlo implements FoberloDTO{
    @PrimaryColumn()
    szemszamfb: string;

    @Column({ type: 'text' })
    namefb: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'text' })
    szamlaszamfb: string;

    @Column({ select: false })
    password: string;
    
    @Column()
    telfb: number;

    @OneToMany(() => Haz, haz => haz.tulaj)
    hazak: Haz[];
}