import { Module } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { PartiesController } from './parties.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Party } from './parties.model';
import { ModelEntity } from 'src/models/models.model';
import { ClothOperation } from 'src/clothoperations/clothoperations.model';
import { Size } from 'src/sizes/sizes.model';
import { Person } from 'src/persons/persons.model';

@Module({
  providers: [PartiesService],
  controllers: [PartiesController],
  imports: [
    SequelizeModule.forFeature([Party, ModelEntity, ClothOperation, Person, Size])
]
})
export class PartiesModule {}
