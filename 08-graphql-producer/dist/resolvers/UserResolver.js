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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
const CreateUserInput_1 = require("../inputs/CreateUserInput");
const class_validator_1 = require("class-validator");
let UserResolver = class UserResolver {
    constructor() {
        this.users = [];
    }
    async getUsers() {
        return this.users;
    }
    async createUser(data) {
        const user = new User_1.User();
        user.id = String(this.users.length + 1);
        user.name = data.name;
        user.email = data.email;
        user.isActive = data.isActive;
        try {
            await (0, class_validator_1.validateOrReject)(user);
        }
        catch (errors) {
            throw new Error('Validation failed: ' + errors);
        }
        this.users.push(user);
        return user;
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserInput_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
exports.UserResolver = UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
