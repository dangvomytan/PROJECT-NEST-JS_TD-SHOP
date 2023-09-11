
import { Exclude, Transform } from "class-transformer";
import { CartItemEntity } from "src/cartItemModule/database/CartItem.Entity";
import { OrderEntity } from "src/orderModule/database/Order.Entity";

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('tbl_user')
export class UserEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Transform((user)=>user.value.toUpperCase())
    @Column()
    first_Name: string;

    @Transform((user)=>user.value.toUpperCase())
    @Column()
    last_Name: string;

    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    is_Delete: number;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    // user => cart item
    @OneToMany(() => CartItemEntity,(cartItem)=>cartItem.tbl_user,{
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
    })
    tbl_cartItem: CartItemEntity[];
    
    // user => order
    @OneToMany(() => OrderEntity,(order)=>order.tbl_user,
    {
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
    })
    tbl_order:OrderEntity[];
}