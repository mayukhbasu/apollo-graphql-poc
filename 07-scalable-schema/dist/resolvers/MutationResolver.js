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
exports.MutationResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
const Task_1 = require("../entities/Task");
const class_validator_1 = require("class-validator");
const customErrors_1 = require("../utils/customErrors");
let MutationResolver = class MutationResolver {
    constructor() {
        this.users = [];
        this.tasks = [];
    }
    createUser(name, email, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.User();
            user.id = String(this.users.length + 1);
            user.name = name;
            user.email = email;
            user.isActive = isActive;
            try {
                yield (0, class_validator_1.validateOrReject)(user);
            }
            catch (errors) {
                throw new customErrors_1.ValidationErrorWithMessage(errors);
            }
            this.users.push(user);
            return user;
        });
    }
    createTask(title, description, userId, projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = new Task_1.Task();
            task.id = String(this.tasks.length + 1);
            task.title = title;
            task.description = description;
            // Additional logic to fetch the user and project and assign them to the task
            // Example:
            // task.assignedTo = this.users.find(user => user.id === userId);
            // task.project = this.projects.find(project => project.id === projectId);
            try {
                yield (0, class_validator_1.validateOrReject)(task);
            }
            catch (errors) {
                throw new customErrors_1.ValidationErrorWithMessage(errors);
            }
            this.tasks.push(task);
            return task;
        });
    }
};
exports.MutationResolver = MutationResolver;
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Arg)('name')),
    __param(1, (0, type_graphql_1.Arg)('email')),
    __param(2, (0, type_graphql_1.Arg)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", Promise)
], MutationResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Task_1.Task),
    __param(0, (0, type_graphql_1.Arg)('title')),
    __param(1, (0, type_graphql_1.Arg)('description', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('userId')),
    __param(3, (0, type_graphql_1.Arg)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], MutationResolver.prototype, "createTask", null);
exports.MutationResolver = MutationResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], MutationResolver);
