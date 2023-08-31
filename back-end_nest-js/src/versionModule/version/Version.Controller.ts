import { Controller, Get, Param } from "@nestjs/common";
import { VersionService } from "./Version.Service";


@Controller('api/v1/version')

export class VersionController{
    constructor(
        public versionService: VersionService,
    ){}
    @Get()
    getAllVersions()
    {
    console.log('all versions');
    return this.versionService.findAll();
    }

    //Lấy tất cả danh sách product với version
    @Get('/get-pro-with-all-ver')
    getAllProductWithAllVersion()
    {
        return this.versionService.findAllProductWithAllVersion()
    }

    @Get('/get-pro-with-ver-by-id-ver/:id')
    getProductWithVersionByIdVer(@Param('id') id: number) 
    {
        return this.versionService.findProductWithVersionByIdVer(id);
    }
}