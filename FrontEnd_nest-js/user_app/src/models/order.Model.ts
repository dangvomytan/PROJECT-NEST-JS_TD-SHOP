import axiosClient from "../api/AxiosClient";


export interface IOrder
{
    id?: number;
    address?: string;
    phone?: number;
    method?: string;
    status?: number;
}



export class OrderApi 
{
     static async createOrder(param:any):Promise<Array<IOrder>> { 
      const url:string = "api/v1/order/create-order";
      const res = await axiosClient.post(url,param);
      return res.data;
    }
}