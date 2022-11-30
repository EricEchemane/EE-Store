import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class Buyer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    hash: string;

    @Column()
    address: string;

    @Column()
    phone_number: string;

    @OneToMany(() => Order, order => order.buyer)
    orders: Order[];
}