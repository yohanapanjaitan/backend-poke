import { User } from "src/user.entity"

export class CreateUserDto {
  email: string
  name: string
  password: string
}

export class LoginDto {
  email: string
  password: string
}

export class UserDto {
  id: string
  email: string
  name: string
  authorization: string
  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial)
  }
  static fromEntity(user: User, jwt: string): UserDto {
    return new UserDto({
      id: user.id,
      email: user.email,
      name:user.name,
      authorization: jwt
    })
  }
}

export class PokemonDto {
  name: string
  image: object
  stats: object
  constructor(partial: Partial<PokemonDto>) {
    Object.assign(this, partial)
  }
  static fromEntity(payload: any): PokemonDto {
    return new PokemonDto({
      name: payload.name,
      image: payload.sprites.other.dream_world.front_default,
      stats: payload.stats
    })
  }
}