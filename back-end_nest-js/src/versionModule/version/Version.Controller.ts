import { Body, Controller, Get, Param, Query } from "@nestjs/common";
import { VersionService } from "./Version.Service";
import { PaginationDTO } from "../dto/Pagination.DTO";


@Controller('api/v1/version')

export class VersionController {
    constructor(
        public versionService: VersionService,
    ) { }
    @Get()
    getAllVersions() {
        console.log('all versions');
        return this.versionService.findAll();
    }

    //Lấy tất cả danh sách product với version
    // @Get('/get-pro-with-all-ver')
    // getAllProductWithAllVersion()
    // {
    //     return this.versionService.findAllProductWithAllVersion()
    // }

    // Lấy tất cả danh sách product với version (phan trang)
    @Get('/get-pro-with-all-ver')
    getAllProductWithAllVersion(@Query() query: any) {
        const { page, perPage } = query;
        return this.versionService.findAllProductWithAllVersion(page, perPage)
    }
    @Get('/get-pro-with-all-ver?page=:query')
    getAllProductWithAllVersionWithPig(@Query() query: any) {
        const { page, perPage } = query;
        return this.versionService.findAllProductWithAllVersion(page, perPage)
    }

    // lay detail product
    @Get('/get-pro-with-ver-by-id-ver/:id')
    getProductWithVersionByIdVer(@Param('id') id: number) {
        return this.versionService.findProductWithVersionByIdVer(id);
    }
}