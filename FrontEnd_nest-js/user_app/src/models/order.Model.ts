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

    static async getAll(query:any):Promise<Array<IOrder>> {
        const url:string = "api/v1/order?pages=" + query.pages+"&limit=" + query.limit+"&sort="+query.sort;
        const res = await axiosClient.get(url);
        return res.data;
      }

      static async getAllItemOreder(query:any):Promise<Array<any>> {
        const url:string = "api/v1/order-item?id="+query.orderParam+"&pages=" + query.pages+"&limit=" + query.limit;
        const res = await axiosClient.get(url);
        return res.data;
      }
}

