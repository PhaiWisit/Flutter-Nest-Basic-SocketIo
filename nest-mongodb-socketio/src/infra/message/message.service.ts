import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from '@src/infra/database/schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private MessageModel: Model<MessageDocument>,
  ) {}

  // TODO: add type of filter
  async list(filter?: any): Promise<any> {
    return this.MessageModel.find({});
  }

  async create(createMessagePayload: any): Promise<any> {
    return this.MessageModel.create(createMessagePayload);
  }
}
