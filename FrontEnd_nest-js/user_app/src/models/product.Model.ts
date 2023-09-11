import axiosClient from "../api/AxiosClient";
import axiosSub from "../api/AxiosSub";


export interface IProduct
{
    tbl_product: any;
    id?: number;
    category_Id?:number
    product_Name?: string;
    is_Delete?:number;
    description?: string;

    product?:Product;
    data?:any;  
}

export interface Product
{
  product_Name?:string;
  version_Name?:string;
  tbl_versions?:Array<Product> | null;
  price?:number;
  id:number;
  image?:string;
}

export class ProductApi 
{
     static async getAllProVer():Promise<Array<IProduct>> {
      const url:string = "api/v1/version/get-pro-with-all-ver";
      const res = await axiosClient.get(url);
      return res.data;
    }
    static async getAllProVerWithPage(pages:number,filters:string):Promise<any> {
      console.log(pages,filters);
      const url:string = "api/v1/version/get-pro-with-all-ver?pages=" +pages+"&filters="+filters;
      const res = await axiosSub.get(url);
      return res.data;
    }

    //Lấy toàn bọ thông tin của product bằng id
    static async getAllInfoProductById(id:number):Promise<any> {
      const url:string = `api/v1/version/get-pro-with-ver-by-id-ver/${id}`;
      const res:any = await axiosClient.get(url);
      return res.data;
    }

    
}