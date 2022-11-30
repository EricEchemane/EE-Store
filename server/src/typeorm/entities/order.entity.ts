import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Buyer } from "./buyer.entity";
import { OrderStatus } from "./misc/order-status.enum";
import { PaymentType } from "./misc/payment-type.enum";

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int')
    quantity: number;

    @Column('float')
    total_price: number;

    @Column('float')
    shipping_fee: number;

    @Column({
        type: "enum",
        enum: PaymentType,
        default: PaymentType.COD,
    })
    payment_type: PaymentType;

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    })
    order_status: OrderStatus;

    @ManyToOne(() => Buyer, buyer => buyer.orders)
    buyer: Buyer;
}