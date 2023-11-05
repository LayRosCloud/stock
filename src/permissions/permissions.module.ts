import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from './permissions.model';
import { AuthModule } from 'src/auth/auth.module';
import {HistoriesModule} from "../histories/histories.module";

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
  imports: [
    SequelizeModule.forFeature([Permission]),
    AuthModule,
      HistoriesModule
]
})
export class PermissionsModule {}
