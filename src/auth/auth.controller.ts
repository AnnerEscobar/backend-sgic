import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser, loginDto, RegisterUserDto } from './dto/index';
import { AuthGuard } from './guards/auth.guard';
import { loginResponse } from './interfaces/login-response';
import { User } from './entities/auth.entity';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  create(@Body() createAuthDto: CreateUser) {
    return this.authService.create(createAuthDto);
  }

  @Post('/login')
  login(@Body() LoginDto: loginDto) {
    return this.authService.login(LoginDto);
  }

  @Post('/register')
  register(@Body() RegisterDto: RegisterUserDto) {
    return this.authService.register(RegisterDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: Request ) {
    return this.authService.findAll()
  }

  @UseGuards(AuthGuard)
  @Get('/check-token')
  checkToken(@Request() req: Request): loginResponse{

    const user = req['user'] as  User;

    return{
      user,
      token: this.authService.getJwtToken({id: user._id})
    }

  }


/*   @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateUser) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  } */
}
