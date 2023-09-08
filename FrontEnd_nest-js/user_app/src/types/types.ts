import { IProduct } from "../models/product.Model";

export interface ProductProps {
    totalItems: any;
    productAPI: any;
    totalPages: any;
}

export interface ProductGridProps {
    product: any;
}

export interface DeleteModalProp
{
    itemDel:object;
    modalOpen: boolean;
    setStatusModal: (status:boolean)=>void;
    handleDelCartItem: (item:object)=>void;
}