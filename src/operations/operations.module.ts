import { Module } from '@nestjs/common';
import { OperationsController } from './operations.controller';
import { OperationsService } from './operations.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Operation } from './operations.model';
import { ClothOperation } from 'src/clothoperations/clothoperations.model';
import { Price } from 'src/prices/prices.model';

@Module({
  controllers: [OperationsController],
  providers: [OperationsService],
  imports: [
    SequelizeModule.forFeature([Operation, ClothOperation, Price])
  ]
})
export class OperationsModule {}
