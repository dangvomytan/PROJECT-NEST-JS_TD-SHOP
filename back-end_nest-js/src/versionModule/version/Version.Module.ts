import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VersionEntity } from "../database/Version.Entity";
import { VersionController } from "./Version.Controller";
import { VersionService } from "./Version.Service";

@Module({
    imports:[TypeOrmModule.forFeature([VersionEntity])],
    controllers:[VersionController],
    providers:[VersionService],
    exports:[VersionService],
})

export class VersionModule{}