import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from 'src/mongoose/schemas/User.schema';

export interface IGetOneUserOptions {
  includePassword?: boolean;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}

  async store(dto: User): Promise<User> {
    return await this.usersModel.create(dto);
  }

  async getOneByEmail(
    email: string,
    options: IGetOneUserOptions = {},
  ): Promise<UserDocument> {
    let query = this.usersModel.findOne({
      email,
    });

    if (!!options.includePassword) {
      query = query.select('+password');
    }
    const user = await query;

    return user;
  }

  async exists(filters: FilterQuery<UserDocument>): Promise<boolean> {
    const users = await this.usersModel.countDocuments(filters);
    return users > 0;
  }
}
