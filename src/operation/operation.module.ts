import { Module } from '@nestjs/common';
import {OperationService} from "./operation.service";
import {OperationController} from "./operation.controller";

@Module({
    providers: [OperationService],
    controllers: [OperationController]
})
export class OperationModule {}
