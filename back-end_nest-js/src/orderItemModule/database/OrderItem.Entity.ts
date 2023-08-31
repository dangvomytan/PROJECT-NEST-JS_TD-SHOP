import { OrderEntity } from "src/orderModule/database/Order.Entity";
import { ProductEntity } from "src/productModule/database/Product.Entity";
import { VersionEntity } from "src/versionModule/database/Version.Entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('tbl_orderitem')
export class OrderItemEntity
{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    quantity: number;

    @Column()
    price_Pay: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    //order item => order 
    @Column()
    order_Id: number;
    @ManyToOne(()=>OrderEntity,(order)=>order.tbl_orderitem)
    @JoinColumn({name:'order_Id'})
    tbl_order:OrderEntity;

    // order item => product
    @ManyToOne(()=>ProductEntity,(product)=>product.tbl_orderitem)
    @JoinColumn({name: 'id',})
    tbl_product:ProductEntity;
    
    // order item => version
    @Column()
    version_Id: number;
    @OneToOne(()=>VersionEntity,(version)=>version.tbl_orderitem)
    @JoinColumn({name: 'version_Id',})
    tbl_version:VersionEntity;

}