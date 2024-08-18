import { PartialType } from '@nestjs/mapped-types';
import { CreateUser } from './create-user.dto';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateUser) {


}
