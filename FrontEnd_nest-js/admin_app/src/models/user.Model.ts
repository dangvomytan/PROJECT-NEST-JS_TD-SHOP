import axiosClient from "../api/AxiosClient";


export interface IUser
{
    id?: number;
    first_Name: string;
    last_Name:string;
    email:string;
    password:string;                                                                                             
    is_Delete?:number;
    createdAt?: Date,
}

export class UserApi {

     static async getAll(params: { pages: number; limit: number; search:string }):Promise<Array<IUser>> {
      console.log(params);
      
       const url:string = "/api/v1/user?pages=" + params.pages+"&limit=" + params.limit+"&search=" + params.search;
       const res = await axiosClient.get(url);
       return res.data;
     }
     
     static async isdelete(prams:IUser):Promise<Array<IUser>> {
        const url:string = "api/v1/user/is-delete";
        const res = await axiosClient.patch(url,prams);
        return res.data;
      }

      static async create(prams:IUser):Promise<Array<IUser>> {
        const url:string = "api/v1/user/create";
        const res = await axiosClient.post(url,prams);
        return res.data;
      }

      static async update(prams:IUser):Promise<Array<IUser>> {
        const url:string = "api/v1/user/update";
        const res = await axiosClient.patch(url,prams);
        console.log(res);
        return res.data;
      }

   }