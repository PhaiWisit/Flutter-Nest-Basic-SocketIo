import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { MessageService } from '@src/infra/message/message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  getMessages(@Query() query: any) {
    return this.messageService.list(query);
  }

  @Post()
  createMessage(@Body() payload: any) {
    return this.messageService.create(payload);
  }
}
