import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MessageService } from '@src/infra/message/message.service';

// @WebSocketGateway({ cors: true, path: '/chat-app/' })
@WebSocketGateway({ cors: true, })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(public readonly messageService: MessageService) { }


  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket, ...arg: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() data: any) {
    this.messageService.create(data);
    this.server.emit('getMessages', data);
  }

  @SubscribeMessage('typingMessage')
  typingMessage(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    socket.broadcast.emit('userTyping', data);
  }
}
