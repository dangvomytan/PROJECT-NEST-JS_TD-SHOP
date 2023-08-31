
import { CartItemEntity } from "src/cartItemModule/database/CartItem.Entity";
import { OrderEntity } from "src/orderModule/database/Order.Entity";

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('tbl_user')
export class UserEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_Name: string;

    @Column()
    last_Name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    is_Delete: number;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    // user => cart item
    @OneToOne(() => CartItemEntity,(cartItem)=>cartItem.tbl_user,{
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
    })
    tbl_cartItem: CartItemEntity;
    
    // user => order
    @OneToOne(() => OrderEntity,(order)=>order.tbl_user,
    {
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
    })
    tbl_order:OrderEntity;
}