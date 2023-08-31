import { ProductEntity } from "src/productModule/database/Product.Entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tbl_category')

export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category_Name: string;
    
    @Column()
    is_Delete: number;

    @Column('text')
    description: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // category => product
    @OneToMany(()=> ProductEntity,(product) => product.tbl_category,{
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
    })
    tbl_products: ProductEntity[];
}