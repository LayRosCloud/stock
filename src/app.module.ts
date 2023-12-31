import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import { HateoasModule } from './hateoas/hateoas.module';
import { PersonsModule } from "./persons/persons.module";
import { Person } from "./persons/persons.model";
import { PostsModule } from './posts/posts.module';
import { ClothoperationsModule } from './clothoperations/clothoperations.module';
import { AgesModule } from './ages/ages.module';
import { ModelsModule } from './models/models.module';
import { OperationsModule } from './operations/operations.module';
import { PartiesModule } from './parties/parties.module';
import { PermissionsModule } from './permissions/permissions.module';
import { SizesModule } from './sizes/sizes.module';
import { PricesModule } from './prices/prices.module';
import { Age } from "./ages/ages.model";
import { Size } from "./sizes/sizes.model";
import { ModelEntity } from "./models/models.model";
import { Price } from "./prices/prices.model";
import Post from "./posts/posts.model";
import { Permission } from "./permissions/permissions.model";
import { Party } from "./parties/parties.model";
import { Operation } from "./operations/operations.model";
import { ClothOperation } from "./clothoperations/clothoperations.model";
import { PackagesModule } from './packages/packages.module';
import {Package} from "./packages/packages.model";
import { AuthModule } from './auth/auth.module';
import { MaterialsModule } from './materials/materials.module';
import { HistoriesModule } from './histories/histories.module';
import {Material} from "./materials/materials.model";
import { ActionsModule } from './actions/actions.module';
import {History} from "./histories/histories.model";
import {Action} from "./actions/action.model";
import { ClothoperatiospersonsModule } from './clothoperatiospersons/clothoperatiospersons.module';
import {ClothOperationPerson} from "./clothoperatiospersons/clothoperatiospersons.model";
import { ModeloperationsModule } from './modeloperations/modeloperations.module';
import {ModelOperation} from "./modeloperations/entities/modeloperation.entity";
import { ModelpricesModule } from './modelprices/modelprices.module';
import {ModelPrice} from "./modelprices/modelprices.model";

@Module({
    controllers: [],
    providers: [],
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
            models: [Person, Age, Size, 
                    Price, ModelEntity, Post, 
                    Permission, Party, Operation, 
                    ClothOperation, Package,
                 Material, History, Action, ClothOperationPerson, ModelOperation, ModelPrice],
            autoLoadModels: true
        }),
        HateoasModule,
        PersonsModule,
        PostsModule,
        PricesModule,
        SizesModule,
        PermissionsModule,
        PartiesModule,
        OperationsModule,
        ModelsModule,
        AgesModule,
        ClothoperationsModule,
        PackagesModule,
        AuthModule,
        MaterialsModule,
        HistoriesModule,
        ActionsModule,
        ClothoperatiospersonsModule,
        ModeloperationsModule,
        ModelpricesModule,
    ]
})
export class AppModule{}