import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from './permissions.model';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
  imports: [
    SequelizeModule.forFeature([Permission])
]
})
export class PermissionsModule {}
