import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, Req, Res, UseInterceptors } from "@nestjs/common";
import { Request, Response } from 'express'
import { AdminDTO } from "../dto/Admin.dto";
import { AdminService } from "./ADmin.Service";

@Controller('api/v1/user')

export class AdminController {
    constructor(
        public AdminService: AdminService
    ){}
    @UseInterceptors(ClassSerializerInterceptor)

    @Get()
    getAllUser(@Query() query)
    {
        console.log(query);
        const {pages,limit,search} =query
        if(!search)
        {
            // return this.AdminService.findAllUsers(Number(pages),Number(limit));
        }
        else{
            // return this.AdminService.findSearchUsers(Number(pages),Number(limit),search);
        }
    }

    @Post('/register-user')
    registerUser(@Body() body:AdminDTO)
    {
        // return this.AdminService.registerUser(body);
    }

    @Post('/login-user')
    loginUser(@Body() body:AdminDTO, @Res() res:Response)
    {
        // return this.AdminService.loginUser(body, res);
    }
    @Post('/refresh-token')
    refreshToken(@Req() req:Request, @Res() res:Response)
    {
        // return this.AdminService.refreshToken(req,res)
    }
}