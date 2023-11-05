import { Module } from '@nestjs/common';
import { AgesService } from './ages.service';
import { AgesController } from './ages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Age } from './ages.model';
import { Size } from 'src/sizes/sizes.model';
import { AuthModule } from 'src/auth/auth.module';
import {HistoriesModule} from "../histories/histories.module";

@Module({
  providers: [AgesService],
  controllers: [AgesController],
  imports: [
    SequelizeModule.forFeature([Age, Size]),
    AuthModule,
    HistoriesModule
]
})
export class AgesModule {}
