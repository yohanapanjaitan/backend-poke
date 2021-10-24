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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
const axios_1 = require("@nestjs/axios");
let AppService = class AppService {
    constructor(userRepository, httpService) {
        this.userRepository = userRepository;
        this.httpService = httpService;
    }
    getHello() {
        return 'Hello World!';
    }
    async register(body) {
        if (!body.email || !body.password || !body.name)
            throw new common_1.BadRequestException('Invalid credentials');
        const existingUser = await this.userRepository.findOne({ email: body.email });
        if (existingUser)
            throw new common_1.BadRequestException('Email already exist');
        const user = new user_entity_1.User();
        user.email = body.email;
        user.name = body.name;
        user.password = await bcrypt.hash(body.password, 12);
        ;
        return await this.userRepository.save(user);
    }
    async login(body) {
        if (!body.email || !body.password)
            throw new common_1.BadRequestException('Invalid credentials');
        const user = await this.userRepository.findOne({ email: body.email });
        if (!user)
            throw new common_1.BadRequestException('Email does not exist');
        const comparePassword = await bcrypt.compare(body.password, user.password);
        if (!comparePassword)
            throw new common_1.BadRequestException('Invalid credentials');
        return user;
    }
    async getPokemonRandom() {
        const randomId = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        const url = `https://pokeapi.co/api/v1/pokemon/${randomId}`;
        try {
            const response = await this.httpService.get(url).toPromise();
            return response.data;
        }
        catch (e) {
            console.log(`Unable to fetch pokemon`);
            throw e;
        }
    }
    async getPokemonByNameOrId(nameOrId) {
        const url = `https://pokeapi.co/api/v1/pokemon/${nameOrId}`;
        try {
            const response = await this.httpService.get(url).toPromise();
            return response.data;
        }
        catch (e) {
            throw new common_1.HttpException("Unable to fetch pokemon. Your pokemon may not exist.", common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map