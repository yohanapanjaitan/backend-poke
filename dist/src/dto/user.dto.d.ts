import { User } from "src/user.entity";
export declare class CreateUserDto {
    email: string;
    name: string;
    password: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class UserDto {
    id: string;
    email: string;
    name: string;
    authorization: string;
    constructor(partial: Partial<UserDto>);
    static fromEntity(user: User, jwt: string): UserDto;
}
export declare class PokemonDto {
    name: string;
    image: object;
    stats: object;
    constructor(partial: Partial<PokemonDto>);
    static fromEntity(payload: any): PokemonDto;
}
