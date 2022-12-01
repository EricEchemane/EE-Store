import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Seller {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    hash: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    store_name: string;

    @Column()
    store_description: string;

    @OneToMany(() => Product, product => product.seller)
    products: Product[];
}