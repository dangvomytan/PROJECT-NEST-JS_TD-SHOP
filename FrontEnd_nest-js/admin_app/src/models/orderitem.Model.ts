import axiosClient from "../api/AxiosClient";


export interface IOrderItem
{

}

export class OrderItemApi {

     static async getAll(query:any):Promise<Array<IOrderItem>> {
       const url:string = "api/v1/order-item?id="+query.orderParam+"&pages=" + query.pages+"&limit=" + query.limit;
       const res = await axiosClient.get(url);
       return res.data;
     }


   }