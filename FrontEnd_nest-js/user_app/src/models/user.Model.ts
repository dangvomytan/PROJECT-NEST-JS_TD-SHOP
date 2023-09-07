import axios from "axios";
import axiosClient from "../api/AxiosClient";


export interface IUser {
  id: any;
  tbl_cart: any;
  first_Name?: string;
  last_Name?: string;
  email?: string;
  password?: string;
}

export class UserApi {

  static async register(prams: IUser): Promise<Array<IUser>> {
    const url: string = "api/v1/user/register-user";
    const res = await axiosClient.post(url, prams);
    return res.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async login(prams: any): Promise<any> {
    const url: string = "http://localhost:8080/api/v1/user/login-user";
    return axios.post(url, prams);
  }
}