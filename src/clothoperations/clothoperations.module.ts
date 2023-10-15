import { Module } from '@nestjs/common';
import { ClothoperationsService } from './clothoperations.service';
import { ClothoperationsController } from './clothoperations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClothOperation } from './clothoperations.model';
import { Party } from 'src/parties/parties.model';
import { Operation } from 'src/operations/operations.model';
import { Person } from 'src/persons/persons.model';
import { Price } from 'src/prices/prices.model';

@Module({
  providers: [ClothoperationsService],
  controllers: [ClothoperationsController],
  imports: [
    SequelizeModule.forFeature([ClothOperation, Party, Person, Price, Operation])
]
})
export class ClothoperationsModule {}
