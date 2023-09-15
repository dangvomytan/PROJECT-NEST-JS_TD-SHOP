import axiosClient from "../api/AxiosClient";


export interface IProduct 
{
    id?: number;
    category_Id:number
    product_Name: string;
    is_Delete?:number;
    description: string;
    createdAt?: string;
}

export class ProductApi {

     static async getAll(prams:any):Promise<Array<IProduct>> {
       const url:string = "/api/v1/product?pages="+prams.pages+"&limit="+prams.limit+"&search="+prams.search;       
       const res = await axiosClient.get(url);
       return res.data;
     }
     
     static async isdelete(prams:IProduct):Promise<Array<IProduct>> {
        const url:string = "api/v1/product/disable-product";
        const res = await axiosClient.patch(url,prams);
        console.log(res);
        
        return res.data;
      }

      static async create(prams:IProduct):Promise<Array<IProduct>> {
        const url:string = "api/v1/product/create-product";
        const res = await axiosClient.post(url,prams);
        return res.data;
      }

      static async update(prams:IProduct):Promise<Array<IProduct>> {
        const url:string = "api/v1/product/update-product";
        const res = await axiosClient.patch(url,prams);
        return res.data;
      }

   }