import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUser, loginDto, RegisterUserDto, UpdateUser } from './dto';

import * as bcryptjs from 'bcryptjs';
import { User } from './entities/auth.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './interfaces/jwt-payload';
import { loginResponse } from './interfaces/login-response';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,

    private jwtServive: JwtService,
  ) { }

  //crear un usuario
  async create(createUserDto: CreateUser): Promise<User> {

    try {

      const { password, ...userData } = createUserDto; //desestructurar usuario
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),//encriptar contrasenia usando bcrypsJs
        ...userData
      })

      await newUser.save();
      const { password: _, ...user } = newUser.toJSON();
      return user;

    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`${createUserDto.email} already exist!!!`)
      }
      throw new InternalServerErrorException(`Something was wrong`)
    }
  }

  async register(RegisterDto: RegisterUserDto): Promise<loginResponse>{

    const user = await this.create(RegisterDto);
    return{
      user: user,
      token: this.getJwtToken({id: user._id}),
    }
  }


  //metodo para loguearse
  async login(LoginDto: loginDto): Promise<loginResponse> {

    const { email, password } = LoginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Not valid credentials - email invalid')
    }
    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Not valid credentiasl -password invalid')
    }

    const { password:_, ...rest } = user.toJSON();

    return {
      user: rest,
      token: this.getJwtToken({ id: user.id }),
    }
  }



  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findUserById(id: string){
    const user = await this.userModel.findById(id);
    const {password, ...rest} = user.toJSON();
    return rest;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateUser) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }



  getJwtToken(payload: jwtPayload) {
    const token = this.jwtServive.sign (payload);
    return token;
  }

}
