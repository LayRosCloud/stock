import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import { HateoasModule } from './hateoas/hateoas.module';
import { WorkingPersonModule } from './working-person/working-person.module';
import { PostsModule } from './posts/posts.module';
import { CutterModule } from './cutter/cutter.module';
import { CutModule } from './cut/cut.module';
import { OperationModule } from './operation/operation.module';
import { SeamstressModule } from './seamstress/seamstress.module';
import { SizeController } from './size/size.controller';
import { SizeService } from './size/size.service';
import { SizeModule } from './size/size.module';
import { ModelModule } from './model/model.module';
import { AgeModule } from './age/age.module';
import {WorkingPerson} from "./working-person/working-person.model";
import {Post} from "./posts/posts.model";
import {Cutter} from "./cutter/cutter.model";
import {Models} from "./model/model.model";
import {Size} from "./size/size.model";
import {Age} from "./age/age.model";
import {Seamstress} from "./seamstress/seamstress.model";
import {Operation} from "./operation/operation.model";
import {Cut} from "./cut/cut.model";


@Module({
    controllers: [SizeController],
    providers: [SizeService],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_TABLE_NAME,
            models: [WorkingPerson, Post, Cutter, Models, Size, Age, Seamstress, Operation, Cut],
            autoLoadModels: true
        }),
        HateoasModule,
        WorkingPersonModule,
        PostsModule,
        CutterModule,
        CutModule,
        OperationModule,
        SeamstressModule,
        SizeModule,
        ModelModule,
        AgeModule,
    ]
})
export class AppModule{}