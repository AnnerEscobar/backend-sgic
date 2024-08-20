import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser, loginDto, UpdateUser, RegisterUserDto } from './dto/index';
import { AuthGuard } from './guards/auth.guard';


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
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
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
  }
}
