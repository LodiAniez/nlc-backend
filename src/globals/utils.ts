import Joi = require("joi");

type ValidateSchemaProps<T> = {
  schema: Joi.ObjectSchema<T>;
  payload: T;
};

export class CustomError extends Error {
  errorCode: number;

  constructor(message: string, errorCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const validateSchema = <T>({
  schema,
  payload,
}: ValidateSchemaProps<T>) => {
  const { error } = schema.validate(payload);

  if (error) {
    throw new CustomError(error.message, 400);
  }
};
