import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private httpService: HttpService,
    ) {
  }

  getHello() {
    return 'Hello World!'
  }
  async register(body: CreateUserDto): Promise<User> {
    if(!body.email || !body.password || !body.name) throw new BadRequestException('Invalid credentials');
    const existingUser = await this.userRepository.findOne({email: body.email});
    if(existingUser) throw new BadRequestException('Email already exist');
    const user = new User();
    user.email = body.email;
    user.name = body.name;
    user.password = await bcrypt.hash(body.password, 12);;

    return await this.userRepository.save(user)
  }

  async login(body: LoginDto): Promise<User> {
    if(!body.email || !body.password) throw new BadRequestException('Invalid credentials');
    const user = await this.userRepository.findOne({email: body.email});
    if(!user) throw new BadRequestException('Email does not exist');
    const comparePassword = await bcrypt.compare(body.password, user.password)
    if(!comparePassword) throw new BadRequestException('Invalid credentials');

    return user
  }

  async getPokemonRandom():  Promise<any> {
    const randomId = Math.floor(Math.random() * (100 - 1 + 1) + 1)
    const url = `https://pokeapi.co/api/v1/pokemon/${randomId}`;
    try {
      const response = await this.httpService.get(url).toPromise();
      return response.data
    } catch (e) {
      console.log(`Unable to fetch pokemon`);
      throw e
    }
  }

  async getPokemonByNameOrId(nameOrId: string):  Promise<any> {
    const url = `https://pokeapi.co/api/v1/pokemon/${nameOrId}`;
    try {
      const response = await this.httpService.get(url).toPromise();
      return response.data
    } catch (e) {
      throw new HttpException("Unable to fetch pokemon. Your pokemon may not exist.", HttpStatus.BAD_REQUEST)
    }
  }
}
