import { IsNumber, isNumber } from "class-validator";


export class CartItemDTO{
    id:number;
    quantity:number;
    createdAt: Date;
    updatedAt: Date;
    user_Id: number;
    product_Id: number;
    version_Id: number;
}