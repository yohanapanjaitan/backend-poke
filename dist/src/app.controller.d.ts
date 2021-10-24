import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';
import { BaseResponseDto } from './dto/base-response.dto';
import { CreateUserDto, LoginDto, PokemonDto, UserDto } from './dto/user.dto';
export declare class AppController {
    private readonly appService;
    private readonly jwtService;
    constructor(appService: AppService, jwtService: JwtService);
    getHello(): string;
    register(body: CreateUserDto): Promise<BaseResponseDto<UserDto>>;
    login(body: LoginDto): Promise<BaseResponseDto<UserDto>>;
    getPokemon(): Promise<BaseResponseDto<PokemonDto>>;
    getPokemonByName(nameOrId: string): Promise<BaseResponseDto<PokemonDto>>;
}
