import { Module } from '@nestjs/common';
import { AgeService } from './age.service';
import { AgeController } from './age.controller';

@Module({
  providers: [AgeService],
  controllers: [AgeController]
})
export class AgeModule {}
