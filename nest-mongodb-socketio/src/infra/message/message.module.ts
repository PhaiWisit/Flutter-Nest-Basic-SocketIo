import { Message, MessageSchema } from '@src/infra/database/schema';

import { MessageService } from './message.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
