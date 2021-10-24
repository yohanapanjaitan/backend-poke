import { Repository } from 'typeorm';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { User } from './user.entity';
import { HttpService } from '@nestjs/axios';
export declare class AppService {
    private readonly userRepository;
    private httpService;
    constructor(userRepository: Repository<User>, httpService: HttpService);
    getHello(): string;
    register(body: CreateUserDto): Promise<User>;
    login(body: LoginDto): Promise<User>;
    getPokemonRandom(): Promise<any>;
    getPokemonByNameOrId(nameOrId: string): Promise<any>;
}
