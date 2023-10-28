import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {PersonsModule} from "../persons/persons.module";
import { JwtAuthGuard } from './jwt.auth.guard';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET_KEY',
      signOptions: {
        expiresIn: '24h'
      }
    }),
      forwardRef(()=>PersonsModule)
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
