import { AppGateway } from './app.gateway';
import { MessageModule } from '@src/infra/message/message.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [MessageModule],
  providers: [AppGateway],
})
export class AppGatewayModule {}
