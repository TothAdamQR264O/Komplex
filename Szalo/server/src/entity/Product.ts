import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductDTO } from '../../../models';

@Entity()
export class Product implements ProductDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'float' })
    price: number;

    @Column()
    imgUrl: string;
    
    @Column({ nullable: true })
    brand: string;
}