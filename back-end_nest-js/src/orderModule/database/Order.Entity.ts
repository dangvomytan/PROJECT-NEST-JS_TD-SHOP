
import { OrderItemEntity } from "src/orderItemModule/database/OrderItem.Entity";
import { UserEntity } from "src/userModule/database/User.Entity";

import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tbl_order')
export class OrderEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    address:string;

    @Column()
    phone:number;

    @Column()
    method:string;

    @Column()
    status:number;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    // order => user
    @Column()
    user_Id:number;
    @OneToOne(()=>UserEntity,(user)=>user.tbl_order)
    @JoinColumn({name: 'user_Id'})
    tbl_user:UserEntity;
    
    // order => order item
    @OneToMany(()=>OrderItemEntity,(orderItem)=>orderItem.tbl_order,{
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
    })
    tbl_orderitem:OrderItemEntity;
}