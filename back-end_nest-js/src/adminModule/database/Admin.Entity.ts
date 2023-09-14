
import { Exclude, Transform } from "class-transformer";

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('tbl_admin')
export class AdminEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Transform((user)=>user.value.toUpperCase())
    @Column()
    full_Name: string;

    @Column()
    user_Name: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    role: number;

    @Column()
    is_Delete: number;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;
}