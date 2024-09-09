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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const Project_1 = require("./Project");
let Task = class Task {
};
exports.Task = Task;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Task.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.Length)(5, 100),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], Task.prototype, "completed", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User),
    __metadata("design:type", User_1.User)
], Task.prototype, "assignedTo", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Project_1.Project),
    __metadata("design:type", Project_1.Project)
], Task.prototype, "project", void 0);
exports.Task = Task = __decorate([
    (0, type_graphql_1.ObjectType)()
], Task);
