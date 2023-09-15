import { Body, Controller, Get, Param, Patch, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { VersionService } from "./Version.Service";
import { query } from "express";
import { VersionDTO } from "../dto/Version.DTO";
import { multerUpload } from "src/utils/multer";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { VersionEntity } from "../database/Version.Entity";


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

    // @Post('/up-image')
    // @UseInterceptors(
    //   FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], multerUpload),
    // )
    // updateVersion(
    //   @UploadedFiles() files: any,
    //   @Body() data: VersionEntity,
    //   @Param('id') id: number,
    // ) {
    //   if (files.image) {
    //     data.image = files.image[0].path;
    //   }
    //   return this.versionService.updateimage(data, id);
    // }

    @Post('/create-ver')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], multerUpload),)
    createVersion(
        @UploadedFiles() files: any,
        @Body() data: VersionEntity,
        // @Param('id') id: number,
      ) {
        if (files.image) {
          data.image = files.image[0].path;
        }
        return this.versionService.createVersion(data);
      }

      @Patch('/update-ver')
      @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], multerUpload),)
      updateVersion(
          @UploadedFiles() files: any,
          @Body() data: VersionEntity,
        ) {
          if (files.image) 
          {
            data.image = files.image[0].path;
          }
          return this.versionService.updateVersion(data);
        }

        @Patch('/disable-ver')
        disableVersion(@Body() data: VersionEntity,) {
            return this.versionService.disableVersion(data);
          }
}