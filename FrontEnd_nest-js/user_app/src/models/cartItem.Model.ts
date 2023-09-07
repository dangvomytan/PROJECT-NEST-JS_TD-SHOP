import axiosClient from "../api/AxiosClient";

export interface ICartItem
{
    id?: number;
    cart_Id?:number;
    product_Id?: number;
    version_Id?:number;
    quantity?:number; 
}

export class cartItemApi 
{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async addToCart(params:any):Promise<Array<ICartItem>> {   
        const url:string = `api/v1/cart-item/add-to-cart`;
        const res = await axiosClient.post(url,params);
        return res.data;
      }
      static async getCartItemByUser(id:any):Promise<Array<ICartItem>> {
        const url:string = `api/v1/cart-item/get-cart-by-user/${id}`;
        const res = await axiosClient.get(url);
        return res.data;
      }

      static async deleteCartItem(id: number | undefined):Promise<Array<ICartItem>> {
        const url:string = `api/v1/cart-item/delete-cart-item/${id}`;
        const res = await axiosClient.delete(url);
        return res.data;
      }
      
      static async updateQuantiyCartItem(params:ICartItem):Promise<Array<ICartItem>> {
        const url:string = `api/v1/cart-item/update-qty-cart-item`;
        const res = await axiosClient.patch(url,params);
        return res.data;
      }
}