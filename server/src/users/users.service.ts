import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from './schema/userSchema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = new this.UserModel(createUserDto);
    await newUser.save();
    return newUser;
  }
  async findById(id: string) {
    return await this.UserModel.findById(id)
  }
  async update(id: string) {
    return await this.UserModel.findByIdAndUpdate(id);
  }
  async findByPhone(phone: string) {
    return await this.UserModel.findOne({ phone });
  }
  async updateRefreshToken(id: string, refreshToken: string){
    return await this.UserModel.findByIdAndUpdate(id, {refreshToken});
  }
}
