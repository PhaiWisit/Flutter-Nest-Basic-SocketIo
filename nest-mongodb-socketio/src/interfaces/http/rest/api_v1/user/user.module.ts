import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserModule } from '@src/infra/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [],
})
export class RUserModule {}
