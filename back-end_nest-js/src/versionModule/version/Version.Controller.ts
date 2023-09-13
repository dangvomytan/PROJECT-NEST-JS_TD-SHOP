import { Body, Controller, Get, Param, Query } from "@nestjs/common";
import { VersionService } from "./Version.Service";
import { query } from "express";
import { VersionDTO } from "../dto/Version.DTO";


@Controller('api/v1/version')

export class VersionController {
    constructor(
        public versionService: VersionService,
    ) { }
    @Get()
    test() {
        console.log('all versions');
    }

    //Lấy tất cả danh sách product với version
    @Get('/get-ver-by-pro-id/:id')
    getAllVersionByProductId(@Query() query,@Param() param)
    {
        const {pages, limit,search} = query
        console.log("version",query, param);
        if(!search)
        return this.versionService.findAllVersionByProductId(pages, limit, param.id)
        else
        return this.versionService.findSearchVersionByProductId(pages, limit, search,param.id)
    }

    // Lấy tất cả danh sách product với version (phan trang)
    @Get('/get-pro-with-all-ver')
    getAllProductWithAllVersion(@Query() query:VersionDTO) {
        console.log("version",query);
        
        const {filters,pages,limit,search} = query; 
        let filterValue:{ [key: string]: any } | null = null;
        if (filters) {
            const [key, value] = filters.split('=');
            filterValue = { [key]: value };
        }
        //Filter by id category
        if (filterValue && filterValue.filCate != null)
         {
            return this.versionService.findAllProductFilterByCategory({...query,filterValue },pages,limit)
         }
        //Filter by brand
        if (filterValue && filterValue.filBrd != null)
        {
            return this.versionService.findAllProductFilterByBrand({...query,filterValue },pages,limit)
        }
        //Search
        if(search)
        {
            return this.versionService.findSearhProductWithAllVersion({...query},pages,limit)
        }
        // Khong xet dieu kien
        return this.versionService.findAllProductWithAllVersion({...query},pages,limit)
    }
 
    // lay detail product
    @Get('/get-pro-with-ver-by-id-ver/:id')
    getProductWithVersionByIdVer(@Param('id') id: number) {
        return this.versionService.findProductWithVersionByIdVer(id);
    }
}