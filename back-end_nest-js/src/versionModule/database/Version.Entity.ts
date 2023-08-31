import { ProductEntity } from "src/productModule/database/Product.Entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItemEntity } from "../../orderItemModule/database/OrderItem.Entity";
import { CartItemEntity } from "src/cartItemModule/database/CartItem.Entity";

@Entity('tbl_version')
export class VersionEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    version_Name: string;

    @Column()
    price: number;

    @Column()
    inventory: number;
    
    @Column('text')
    image: string;

    @Column('text')
    specification: string | null;

    @Column()
    is_Delete: number;
    
    @Column('text')
    description: string | null;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    // version => product
    @Column()
    product_Id: number;
    @ManyToOne(()=>ProductEntity,(product)=>product.tbl_versions)
    @JoinColumn({name: 'product_Id'})
    tbl_product:ProductEntity;

    // version => order item
    @OneToOne(()=>OrderItemEntity,(version)=>version.tbl_version,{
        onDelete:'CASCADE',
        onUpdate: 'CASCADE',
    })
    tbl_orderitem:OrderItemEntity;

    // version => cart item
    @OneToOne(()=>CartItemEntity,(cartitem)=>cartitem.tbl_version,{
        onDelete:'CASCADE',
        onUpdate: 'CASCADE',
    })
    tbl_cartitem:CartItemEntity;
}