
import { CartItemEntity } from "src/cartItemModule/database/CartItem.Entity";
import { CategoryEntity } from "src/categoryModule/database/category.entity";
import { OrderItemEntity } from "src/orderItemModule/database/OrderItem.Entity";
import { VersionEntity } from "src/versionModule/database/Version.Entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('tbl_product')
export class ProductEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_Name: string;

    @Column()
    is_Delete: number;

    @Column('text')
    description: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // product = > category
    @Column()
    category_Id: string;
    @ManyToOne(()=>CategoryEntity,(category)=>category.tbl_products)
    @JoinColumn({ name: 'category_Id' })
    tbl_category: CategoryEntity;

    // product => version
    @OneToMany(()=>VersionEntity,(version) => version.tbl_product,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
    })
    tbl_versions: VersionEntity[];

    // product => order item
    @OneToMany(()=>OrderItemEntity,(orderitem)=>orderitem.tbl_product,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
    })
    tbl_orderitem:OrderItemEntity[];

    // product => cart item
    @OneToMany(()=>CartItemEntity,(cartItem)=>cartItem.tbl_product,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
    })
    tbl_cartitem: CartItemEntity[];
}