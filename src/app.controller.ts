import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';
import { BaseResponseDto } from './dto/base-response.dto';
import { CreateUserDto, LoginDto, PokemonDto, UserDto } from './dto/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('v1/user')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/register')
  async register(@Body() body: CreateUserDto): Promise<BaseResponseDto<UserDto>> {
    const user = await this.appService.register(body)
    const jwt = await this.jwtService.signAsync({id: user.id})
    return new BaseResponseDto({
      success: true,
      message: null,
      data: UserDto.fromEntity(user, jwt)
    })
  }

  @Post('/auth')
  async login(@Body() body: LoginDto): Promise<BaseResponseDto<UserDto>> {
    const user = await this.appService.login(body)
    const jwt = await this.jwtService.signAsync({id: user.id})
    return new BaseResponseDto({
      success: true,
      message: null,
      data: UserDto.fromEntity(user, jwt)
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get('/pokemon/random')
  async getPokemon(): Promise<BaseResponseDto<PokemonDto>> {
    const pokemon = await this.appService.getPokemonRandom()
    return new BaseResponseDto({
      success: true,
      message: null,
      data: PokemonDto.fromEntity(pokemon)
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get('/pokemon')
  async getPokemonByName(@Query('nameOrId') nameOrId: string): Promise<BaseResponseDto<PokemonDto>> {
    const pokemon = await this.appService.getPokemonByNameOrId(nameOrId)
    return new BaseResponseDto({
      success: true,
      message: null,
      data: PokemonDto.fromEntity(pokemon)
    })
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('/pokemon/random')
  // async getPokemonById(@Request() req): Promise<BaseResponseDto<PokemonDto>> {
  //   const pokemon = await this.appService.getPokemonRandom()
  //   return new BaseResponseDto({
  //     success: true,
  //     message: null,
  //     data: PokemonDto.fromEntity(pokemon)
  //   })
  // }
}
