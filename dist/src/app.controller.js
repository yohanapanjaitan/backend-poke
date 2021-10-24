"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const app_service_1 = require("./app.service");
const base_response_dto_1 = require("./dto/base-response.dto");
const user_dto_1 = require("./dto/user.dto");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
let AppController = class AppController {
    constructor(appService, jwtService) {
        this.appService = appService;
        this.jwtService = jwtService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async register(body) {
        const user = await this.appService.register(body);
        const jwt = await this.jwtService.signAsync({ id: user.id });
        return new base_response_dto_1.BaseResponseDto({
            success: true,
            message: null,
            data: user_dto_1.UserDto.fromEntity(user, jwt)
        });
    }
    async login(body) {
        const user = await this.appService.login(body);
        const jwt = await this.jwtService.signAsync({ id: user.id });
        return new base_response_dto_1.BaseResponseDto({
            success: true,
            message: null,
            data: user_dto_1.UserDto.fromEntity(user, jwt)
        });
    }
    async getPokemon() {
        const pokemon = await this.appService.getPokemonRandom();
        return new base_response_dto_1.BaseResponseDto({
            success: true,
            message: null,
            data: user_dto_1.PokemonDto.fromEntity(pokemon)
        });
    }
    async getPokemonByName(nameOrId) {
        const pokemon = await this.appService.getPokemonByNameOrId(nameOrId);
        return new base_response_dto_1.BaseResponseDto({
            success: true,
            message: null,
            data: user_dto_1.PokemonDto.fromEntity(pokemon)
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/auth'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/pokemon/random'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPokemon", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/pokemon'),
    __param(0, (0, common_1.Query)('nameOrId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPokemonByName", null);
AppController = __decorate([
    (0, common_1.Controller)('v1/user'),
    __metadata("design:paramtypes", [app_service_1.AppService,
        jwt_1.JwtService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map