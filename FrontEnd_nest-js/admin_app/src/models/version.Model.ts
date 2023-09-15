import axiosClient from "../api/AxiosClient";


export interface IVersion 
{
    id?: number;
    product_Id?:number
    version_Name?: string;
    price?:number;
    inventory?:number;
    specification?:string;
    is_Delete?:number;
    description?: string;
    createdAt?: string;
}

export class VersionApi {

     static async getAll(query:any,pro_id:number):Promise<Array<IVersion>> {
       const url:string = "api/v1/version/get-ver-by-pro-id/"+pro_id+"?pages="+query.pages+"&limit="+query.limit+"&search="+query.search;
       const res = await axiosClient.get(url);
       return res.data;
     }
     
     static async isdelete(prams:IVersion):Promise<Array<IVersion>> {
        const url:string = "api/v1/version/disable-ver";
        const res = await axiosClient.patch(url,prams);
        return res.data;
      }

      static async create(prams:IVersion): Promise<any>{
        const url:string = "api/v1/version/create-ver";
        const res = await axiosClient.post(url,prams,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }); 
        return res.data;
      }

      static async update(prams:IVersion):Promise<Array<IVersion>> {
        const url:string = "api/v1/version/update-ver";
        const res = await axiosClient.patch(url,prams,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }); 
        return res.data;
      }

   }