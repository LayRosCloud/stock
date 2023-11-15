import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Price } from './prices.model';
import { ClothOperation } from 'src/clothoperations/clothoperations.model';
import { Operation } from 'src/operations/operations.model';
import { AuthModule } from 'src/auth/auth.module';
import {HistoriesModule} from "../histories/histories.module";
import {ModelEntity} from "../models/models.model";

@Module({
  providers: [PricesService],
  controllers: [PricesController],
  imports: [
    SequelizeModule.forFeature([Price, ClothOperation, Operation, ModelEntity]),
    AuthModule,
    HistoriesModule
]
})
export class PricesModule {}
