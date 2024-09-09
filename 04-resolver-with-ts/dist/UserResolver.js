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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
let UserResolver = class UserResolver {
    constructor() {
        this.users = [];
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
    }
    createUser(name, email, isActive, pubsub) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.User(String(this.users.length + 1), name, email, isActive);
            this.users.push(user);
            yield pubsub.publish('MESSAGE_ADDED', user);
            return user;
        });
    }
    newUser(newUser) {
        return newUser;
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
    __param(0, (0, type_graphql_1.Arg)('name')),
    __param(1, (0, type_graphql_1.Arg)('email')),
    __param(2, (0, type_graphql_1.Arg)('isActive')),
    __param(3, (0, type_graphql_1.PubSub)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean, type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Subscription)(() => User_1.User, {
        topics: 'MESSAGE_ADDED'
    }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", User_1.User)
], UserResolver.prototype, "newUser", null);
exports.UserResolver = UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(User_1.User)
], UserResolver);
