import { Controller, Get } from "@nestjs/common";
import { UserService } from "./User.Service";


@Controller('api/v1/user')

export class UserController {
    constructor(
        public userService: UserService
    ){}
    @Get()
    getAll()
    {
        return this.userService.findAll();
    }
}