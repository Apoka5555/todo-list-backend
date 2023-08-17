import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: User })
  @Post('/login')
  async login(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token } = await this.authService.login(userDto);

    response.cookie('jwt', token, { httpOnly: true });

    return { message: 'success' };
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 200, type: User })
  @Post('/registration')
  async registration(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token } = await this.authService.registration(userDto);

    response.cookie('jwt', token, { httpOnly: true });

    return { message: 'success' };
  }

  @ApiOperation({ summary: 'LogOut' })
  @ApiResponse({ status: 200, type: User })
  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return { message: 'success' };
  }

  @ApiOperation({ summary: 'Get Current User' })
  @ApiResponse({ status: 200, type: User })
  @Get('/user')
  async user(@Req() request: Request) {
    const cookie = request.cookies['jwt'];

    const data = await this.jwtService.verifyAsync(cookie);

    if (!data) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.getUserById(data.id);

    return { login: user.login };
  }
}
