import { Module } from '@nestjs/common';
import { OperationsController } from './operations.controller';
import { OperationsService } from './operations.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Operation } from './operations.model';
import { ClothOperation } from 'src/clothoperations/clothoperations.model';
import { AuthModule } from 'src/auth/auth.module';
import {HistoriesModule} from "../histories/histories.module";

@Module({
  controllers: [OperationsController],
  providers: [OperationsService],
  imports: [
    SequelizeModule.forFeature([Operation, ClothOperation]),
    AuthModule,
    HistoriesModule
  ]
})
export class OperationsModule {}
