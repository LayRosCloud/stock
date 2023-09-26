import { Module } from '@nestjs/common';
import { SeamstressService } from './seamstress.service';
import { SeamstressController } from './seamstress.controller';
import {WorkingPerson} from "../working-person/working-person.model";
import {Operation} from "../operation/operation.model";
import {Cut} from "../cut/cut.model";

@Module({
  providers: [SeamstressService],
  controllers: [SeamstressController],
  imports: [WorkingPerson, Cut, Operation]
})
export class SeamstressModule {}
