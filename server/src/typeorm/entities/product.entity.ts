import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { ProductPhoto } from "./misc/product-photo.entity";
import { ProductVariant } from "./misc/product-variant.entity";
import { Seller } from "./seller.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column('int')
    stock: number;

    @Column('float')
    price: number;

    @Column()
    tags: string;

    @OneToMany(() => ProductPhoto, (productPhoto) => productPhoto.product)
    photos: ProductPhoto[];

    @ManyToOne(() => Seller, seller => seller.products)
    @JoinColumn()
    seller: Seller;

    @OneToMany(() => ProductVariant, (variant) => variant.product)
    variants: ProductVariant[];
}