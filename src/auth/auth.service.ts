import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import * as bcryptjs from 'bcryptjs';
import { User } from './entities/auth.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './interfaces/jwt-payload';

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

  //metodo para loguearse
  async login(LoginDto: loginDto) {

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
      ...rest,
      token: this.getJwtToken({ id: user.id }),
    }
  }




  findAll() {
    return `This action returns all auth`;
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
