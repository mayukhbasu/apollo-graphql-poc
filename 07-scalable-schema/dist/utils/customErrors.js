"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrorWithMessage = void 0;
class ValidationErrorWithMessage extends Error {
    constructor(errors) {
        super('Validation Error');
        this.name = 'ValidationErrorWithMessage';
        const errorDetails = errors.map((error) => ({
            field: error.property,
            message: Object.values(error.constraints).join(', '),
        }));
        this.message = JSON.stringify(errorDetails);
    }
}
exports.ValidationErrorWithMessage = ValidationErrorWithMessage;
