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
exports.TaskManagementResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const Task_1 = require("./Task");
const class_validator_1 = require("class-validator");
const users = [];
const tasks = [];
const TASK_ASSIGNED = 'TASK_ASSIGNED';
let TaskManagementResolver = class TaskManagementResolver {
    getAllTasks() {
        return tasks;
    }
    getTasksByUser(userId) {
        return tasks.filter(task => { var _a; return ((_a = task.assignedTo) === null || _a === void 0 ? void 0 : _a.id) === userId; });
    }
    createTask(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = new Task_1.Task();
            task.id = String(tasks.length + 1);
            task.title = title;
            task.description = description;
            try {
                yield (0, class_validator_1.validateOrReject)(task);
            }
            catch (errors) {
                throw new ValidationErrorWithMessage(errors);
            }
            tasks.push(task);
            return task;
        });
    }
    assignTask(taskId, userId, pubSub) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = tasks.find(t => t.id === taskId);
            if (!task) {
                throw new Error('Task not found');
            }
            const user = users.find(u => u.id === userId);
            if (!user) {
                throw new Error('User not found');
            }
            task.assignedTo = user;
            yield pubSub.publish(TASK_ASSIGNED, task);
            return task;
        });
    }
    taskAssigned(task, userId) {
        return task;
    }
    createUser(name, email, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.User();
            user.id = String(users.length + 1);
            user.name = name;
            user.email = email;
            user.isActive = isActive;
            try {
                yield (0, class_validator_1.validateOrReject)(user);
            }
            catch (errors) {
                throw new ValidationErrorWithMessage(errors);
            }
            users.push(user);
            return user;
        });
    }
};
exports.TaskManagementResolver = TaskManagementResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [Task_1.Task]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], TaskManagementResolver.prototype, "getAllTasks", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Task_1.Task]),
    __param(0, (0, type_graphql_1.Arg)('userId', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], TaskManagementResolver.prototype, "getTasksByUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Task_1.Task),
    __param(0, (0, type_graphql_1.Arg)('title')),
    __param(1, (0, type_graphql_1.Arg)('description', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TaskManagementResolver.prototype, "createTask", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Task_1.Task),
    __param(0, (0, type_graphql_1.Arg)('taskId', () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)('userId', () => type_graphql_1.ID)),
    __param(2, (0, type_graphql_1.PubSub)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], TaskManagementResolver.prototype, "assignTask", null);
__decorate([
    (0, type_graphql_1.Subscription)(() => Task_1.Task, {
        topics: TASK_ASSIGNED,
        filter: ({ payload, args }) => { var _a; return ((_a = payload.assignedTo) === null || _a === void 0 ? void 0 : _a.id) === args.userId; },
    }),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Arg)('userId', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Task_1.Task, String]),
    __metadata("design:returntype", Task_1.Task)
], TaskManagementResolver.prototype, "taskAssigned", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User),
    __param(0, (0, type_graphql_1.Arg)('name')),
    __param(1, (0, type_graphql_1.Arg)('email')),
    __param(2, (0, type_graphql_1.Arg)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", Promise)
], TaskManagementResolver.prototype, "createUser", null);
exports.TaskManagementResolver = TaskManagementResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TaskManagementResolver);
class ValidationErrorWithMessage extends Error {
    constructor(errors) {
        super('Validation failed');
        this.name = 'ValidationErrorWithMessage';
        this.message = errors.map(error => Object.values(error.constraints || {}).join(', ')).join('; ');
    }
}
