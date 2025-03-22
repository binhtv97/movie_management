export interface BaseError<TError extends any> {
  error: TError;
  errorCode: number;
  message: string;
}

export interface BaseResponseServerLess {
  statusCode: number;
  message: string;
  errorCode?: number | null;
  errorMessage?: string | null;
  env?: string;
}

export interface BaseRequest<TBody extends any, TQueryParams extends any, TPathParams extends any> {
  body: TBody;
  queryParams: TQueryParams;
  pathParams: TPathParams;
}
