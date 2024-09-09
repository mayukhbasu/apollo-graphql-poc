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
exports.QueryResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
const Task_1 = require("../entities/Task");
const Project_1 = require("../entities/Project");
const PaginationInput_1 = require("../inputs/PaginationInput");
// Mock data for demonstration purposes
const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', isActive: true },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', isActive: false },
];
const tasks = [
    { id: '1', title: 'Complete Documentation', description: 'Write API docs', completed: false, assignedTo: users[0], project: null },
    { id: '2', title: 'Fix Bugs', description: 'Fix issues reported by QA', completed: true, assignedTo: users[1], project: null },
];
const projects = [
    { id: '1', name: 'Project Alpha', tasks: [tasks[0]] },
    { id: '2', name: 'Project Beta', tasks: [tasks[1]] },
];
// Assign project references to tasks (for demonstration purposes)
tasks[0].project = projects[0];
tasks[1].project = projects[1];
let QueryResolver = class QueryResolver {
    users(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implement your pagination logic here
            const { page = 1, pageSize = 10 } = pagination || {};
            // Assume you have some users array
            const startIndex = (page - 1) * pageSize;
            return users.slice(startIndex, startIndex + pageSize);
        });
    }
    tasks(completed, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            // Filter tasks based on completion status
            let filteredTasks = tasks;
            if (completed !== undefined) {
                filteredTasks = tasks.filter(task => task.completed === completed);
            }
            // Handle pagination
            const { page = 1, pageSize = 10 } = pagination || {};
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            // Return paginated and filtered tasks
            return filteredTasks.slice(start, end);
        });
    }
    projects(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            // Handle pagination
            const { page = 1, pageSize = 10 } = pagination || {};
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            // Return paginated projects
            return projects.slice(start, end);
        });
    }
};
exports.QueryResolver = QueryResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __param(0, (0, type_graphql_1.Arg)('pagination', () => PaginationInput_1.PaginationInput, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PaginationInput_1.PaginationInput]),
    __metadata("design:returntype", Promise)
], QueryResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Task_1.Task]),
    __param(0, (0, type_graphql_1.Arg)('completed', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('pagination', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, PaginationInput_1.PaginationInput]),
    __metadata("design:returntype", Promise)
], QueryResolver.prototype, "tasks", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Project_1.Project]),
    __param(0, (0, type_graphql_1.Arg)('pagination', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PaginationInput_1.PaginationInput]),
    __metadata("design:returntype", Promise)
], QueryResolver.prototype, "projects", null);
exports.QueryResolver = QueryResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], QueryResolver);
