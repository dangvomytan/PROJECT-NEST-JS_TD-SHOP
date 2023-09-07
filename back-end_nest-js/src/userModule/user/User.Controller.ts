import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, Res, UseInterceptors } from "@nestjs/common";
import { UserService } from "./User.Service";
import { UserDTO } from "../dto/User.dto";
import { Request, Response } from 'express'

@Controller('api/v1/user')

export class UserController {
    constructor(
        public userService: UserService
    ){}
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    test()
    {
        console.log("ok");
    }

    @Post('/register-user')
    registerUser(@Body() body:UserDTO)
    {
        return this.userService.registerUser(body);
    }

    @Post('/login-user')
    loginUser(@Body() body:UserDTO, @Res() res:Response)
    {
        return this.userService.loginUser(body, res);
    }
    @Post('/refresh-token')
    refreshToken(@Req() req:Request, @Res() res:Response)
    {
        return this.userService.refreshToken(req,res)
    }
}