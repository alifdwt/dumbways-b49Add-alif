export interface SuccessResult<T> {
  code: number;
  data: T;
}

export interface ErrorResult {
  code: number;
  message: string;
}
