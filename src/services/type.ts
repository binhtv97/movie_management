import type { BaseError } from './api_client/interfaces/api';

export interface BaseQueryEnabled {
  enabled?: boolean;
}

export class CustomError<TError = any> {
  error: TError;
  errorCode?: number;
  message?: string;

  constructor({ error, errorCode, message }: BaseError<TError>) {
    this.error = error;
    this.errorCode = errorCode;
    this.message = message;
  }
}

export class BaseApiError<TError = any> extends CustomError<TError> {
  constructor({ error, errorCode, message }: BaseError<TError>) {
    super({ error, errorCode, message });
  }
}
