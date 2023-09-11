import { ProductEntity } from "src/productModule/database/Product.Entity";
import { UserEntity } from "src/userModule/database/User.Entity";
import { VersionEntity } from "src/versionModule/database/Version.Entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('tbl_cartitem')
export class CartItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // cart item => user
    @Column()
    user_Id: number;
    @ManyToOne(() => UserEntity, (user) => user.tbl_cartItem)
    @JoinColumn({ name: "user_Id" })
    tbl_user: UserEntity;

    //cart item => product
    @Column()
    product_Id: number;
    @ManyToOne(() => ProductEntity, (product) => product.tbl_cartitem)
    @JoinColumn({ name: 'product_Id', })
    tbl_product: ProductEntity;

    //cart item => version
    @Column()
    version_Id: number;
    @ManyToOne(() => VersionEntity, (version) => version.tbl_cartitem)
    @JoinColumn({ name: 'version_Id', })
    tbl_version: VersionEntity;
}