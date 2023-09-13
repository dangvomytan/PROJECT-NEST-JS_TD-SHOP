import { Injectable } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";
import { UserEntity } from "../database/User.Entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Response, Request } from "express";
import * as jwt from 'jsonwebtoken';
import sceret from "../database/jwt";
import { UserDTO } from "../dto/User.dto";

const bcrypt = require('bcrypt');

let refreshTokenArr: any[] = []

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>
    ) { }
    async findAllUsers(pages: number, limit: number) {
        const skip: number = (pages - 1) * limit;
        let queryBuilder: SelectQueryBuilder<UserEntity>;
        queryBuilder = this.userRepo.createQueryBuilder('tbl_user')
        // Thực hiện phân trang bằng cách bỏ qua các mục không cần thiết và lấy số lượng mục trên mỗi trang
        const dataUser = await queryBuilder.skip(skip).take(limit).getMany();
        let totalItem: number = await queryBuilder.getCount();
        // Tính toán tổng số trang
        const totalPage: number = Math.ceil(totalItem / limit);
        console.log(totalPage);

        return { dataUser, totalPage, pages, limit };
    }
    async findSearchUsers(pages: number, limit: number, search: string) {
        const skip: number = (pages - 1) * limit;
        let queryBuilder: SelectQueryBuilder<UserEntity>;
        queryBuilder = this.userRepo.createQueryBuilder('tbl_user')
            .where('tbl_user.first_Name LIKE:keyword ', { keyword: `%${search}%` })
            .orWhere('tbl_user.last_Name LIKE:keyword ', { keyword: `%${search}%` })
            .orWhere('tbl_user.email LIKE:keyword ', { keyword: `%${search}%` });
        // Thực hiện phân trang bằng cách bỏ qua các mục không cần thiết và lấy số lượng mục trên mỗi trang
        const dataUser = await queryBuilder.skip(skip).take(limit).getMany();
        let totalItem: number = await queryBuilder.getCount();
        // Tính toán tổng số trang
        const totalPage: number = Math.ceil(totalItem / limit);
        console.log(totalPage);

        return { dataUser, totalPage, pages, limit };
    }

    async registerUser(body: any) {
        const { email, password } = body
        try {
            // Kiểm tra xem email đã tồn tại chưa
            const existingEmail = await this.userRepo.findOne({ where: { email: email } })
            if (existingEmail) {
                return { status: '404', message: 'Email already exists' }
            }
            else {
                // Mã hóa mật khẩu
                const saltRounds = 10;
                const hashPassword = await bcrypt.hash(password, saltRounds);
                // Tạo một người dùng mới
                const newUser = await this.userRepo.create({
                    first_Name: body.first_Name,
                    last_Name: body.last_Name,
                    email: email,
                    password: hashPassword,
                    is_Delete: 0,
                });
                await this.userRepo.save(newUser);
                return { status: '200', message: 'User created successfully' };
            }
        }
        catch (err) {
            console.error(err);
            throw new Error('Internal Server Error');
        }
    }

    async loginUser(data: UserDTO, res: Response) {
        const { email, password } = data
        try {
            // Kiểm tra xem email đã tồn tại chưa
            const loginUser = await this.userRepo.findOne({ where: { email: email } })
            if (!loginUser) {
                return res.status(401).json({ message: 'Email not found' })
            }
            else {
                const myPass = await bcrypt.compare(password, loginUser.password);
                console.log(1111, myPass);
                // giải mã pass
                if (myPass) {
                    // console.log(">>>",loginUser); 
                    //tạo access token
                    const accessToken = jwt.sign({ ...loginUser }, sceret.sceretKey, { expiresIn: "7d" });
                    // Token hết hạn trong vòng 7day , vd thêm : 30d ,30m
                    const accessTokenRefresh = jwt.sign({ ...loginUser }, sceret.sceretKeyRefresh, { expiresIn: "365d" })
                    // Tạo refreshToken để dự trữ
                    refreshTokenArr.push(accessTokenRefresh)
                    // push refresh token vào 1 mảng để lưu trữ
                    const { password, ...data } = loginUser;
                    //loại bỏ password ra khỏi phần data trả về frontend,destructuring
                    res.cookie("accessTokenRefresh", accessTokenRefresh, {//Lưu refreshToken vào cookie khi đăng nhập thành công
                        httpOnly: true,
                        secure: true,
                        sameSite: "none"
                    })
                    return res.status(200).json({
                        data,
                        accessToken
                    })
                }
                else {
                    return res.status(401).json({ message: 'Password wrong' })
                }
            }
        }
        catch (err) {
            console.error(err);
            throw new Error('Internal Server Error');
        }
    }
    async refreshToken(req: Request, res: Response) {
        // lay refresh token tu cookie
        const refreshToken = req.cookies.accessTokenRefresh;
        // console.log('REQ', req.cookies.accessTokenRefresh);

        // trả về mã lỗi 401 "Unauthenticated" nếu chưa được xác thực người dùng.
        if (!refreshToken) return res.status(401).json('Unauthenticated');
        // Kiểm tra sự tồn tại của refreshToken, đảm bảo rằng refreshToken chỉ có thể được sử dụng một lần
        if (!refreshTokenArr.includes(refreshToken)) {
            return res.status(401).json('Unauthenticated');
        }
        //Xác thực refreshToken và tạo mã JWT mới.
        jwt.verify(refreshToken, sceret.sceretKeyRefresh, (err: any, user: any) => {
            if (err) {
                return res.status(400).json('refreshToken is not valid');
            }
            const { iat, exp, ...userOther } = user;

            refreshTokenArr = refreshTokenArr.filter((token: string) => token !== refreshToken);
            const newAccessToken = jwt.sign(userOther, sceret.sceretKey, { expiresIn: '15s' });
            const newRefreshToken = jwt.sign(userOther, sceret.sceretKeyRefresh, { expiresIn: '365d' });
            refreshTokenArr.push(newRefreshToken);
            res.cookie('accessTokenRefresh', newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            });
            return res.status(200).json(newAccessToken);
        });
    }
    async logoutUser(req: Request, res: Response) {
        res.clearCookie("refreshToken")
        refreshTokenArr = refreshTokenArr.filter(token => token !== req.cookies.refreshToken)
        res.status(200).json("Logout successfully")
      }
}