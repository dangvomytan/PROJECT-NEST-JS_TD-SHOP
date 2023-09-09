import axiosSub from "../api/AxiosSub";


export class CategoryApi 
{
     static async getAllCategory(){
      const url:string = "api/v1/category";
      const res = await axiosSub.get(url);
      return res.data;  
    }
}