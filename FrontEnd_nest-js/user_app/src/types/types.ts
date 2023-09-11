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

export interface IPaginationProps {
    pages: number;
    setPages: (str:number)=>void;
}
export interface IFilterProps {
    filters: any;
    setFilters: (str:any)=>void;
    setPages: (str:number)=>void;
}