import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "../product.entity";

@Entity()
export class ProductVariant {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('float')
    price: number;

    @ManyToOne(() => Product, (product) => product.variants)
    product: Product;
}