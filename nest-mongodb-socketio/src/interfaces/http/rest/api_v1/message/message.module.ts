import { MessageController } from './message.controller';
import { MessageModule } from '@src/infra/message/message.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [MessageModule],
  controllers: [MessageController],
  providers: [],
})
export class RMessageModule {}
