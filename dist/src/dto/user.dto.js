"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonDto = exports.UserDto = exports.LoginDto = exports.CreateUserDto = void 0;
const user_entity_1 = require("../user.entity");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
class LoginDto {
}
exports.LoginDto = LoginDto;
class UserDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
    static fromEntity(user, jwt) {
        return new UserDto({
            id: user.id,
            email: user.email,
            name: user.name,
            authorization: jwt
        });
    }
}
exports.UserDto = UserDto;
class PokemonDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
    static fromEntity(payload) {
        return new PokemonDto({
            name: payload.name,
            image: payload.sprites.other.dream_world.front_default,
            stats: payload.stats
        });
    }
}
exports.PokemonDto = PokemonDto;
//# sourceMappingURL=user.dto.js.map