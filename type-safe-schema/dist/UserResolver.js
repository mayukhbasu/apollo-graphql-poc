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
// Define User ObjectType
let User = class User {
    constructor(id, name, email, isActive) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.isActive = isActive;
    }
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
User = __decorate([
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [String, String, String, Boolean])
], User);
// Resolver Class
let UserResolver = class UserResolver {
    constructor() {
        this.userList = [];
    }
    users() {
        return this.userList;
    }
    user(id) {
        return this.userList.find(user => user.id === id);
    }
    createUser(name, email, isActive) {
        const newUser = new User(String(this.userList.length + 1), name, email, isActive);
        this.userList.push(newUser);
        return newUser;
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [User]) // Decorate the output type of the query with @Query
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], UserResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Query)(() => User, { nullable: true }) // Ensure output type is specified
    ,
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], UserResolver.prototype, "user", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User) // Decorate the output type of the mutation with @Mutation
    ,
    __param(0, (0, type_graphql_1.Arg)('name')),
    __param(1, (0, type_graphql_1.Arg)('email')),
    __param(2, (0, type_graphql_1.Arg)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", User)
], UserResolver.prototype, "createUser", null);
exports.UserResolver = UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(User) // Specify the output type for the resolver
], UserResolver);
