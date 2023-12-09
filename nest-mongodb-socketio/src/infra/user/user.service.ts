import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@src/infra/database/schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // TODO: add type of filter
  async list(filter?: any): Promise<any> {
    return this.userModel.find({});
  }

  async create(createUserPayload: any): Promise<any> {
    return this.userModel.create(createUserPayload);
  }
}
