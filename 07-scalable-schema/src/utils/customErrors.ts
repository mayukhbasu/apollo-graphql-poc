export class ValidationErrorWithMessage extends Error {
  constructor(errors: any) {
    super('Validation Error');
    this.name = 'ValidationErrorWithMessage';

    const errorDetails = errors.map((error: any) => ({
      field: error.property,
      message: Object.values(error.constraints).join(', '),
    }));

    this.message = JSON.stringify(errorDetails);
  }
}
