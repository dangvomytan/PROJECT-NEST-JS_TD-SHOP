import axiosClient from "../api/AxiosClient";


export interface IOrder
{
    // id?: number;
    // category_Name: string;
    // is_Delete:number;
    // description: string;
}

export class OrderApi {

     static async getAll(query:any):Promise<Array<IOrder>> {
       const url:string = "api/v1/order?pages=" + query.pages+"&limit=" + query.limit+"&sort="+query.sort;
       const res = await axiosClient.get(url);
       return res.data;
     }
     static async updateStatus(id:any,data:any)
     {
      const url:string = `api/v1/order/update-status/${id}`;
      const res = await axiosClient.post(url,data);
      return res.data;
    }
   }