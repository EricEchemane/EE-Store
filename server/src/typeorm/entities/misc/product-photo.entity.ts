import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "../product.entity";

@Entity()
export class ProductPhoto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    public_url: string;

    @Column()
    secure_url: string;

    @ManyToOne(() => Product, (product) => product.photos)
    product: Product;
}