export interface IHttpError {
  status: number;
  message: string;
}

export interface IHttpResponse<T = any> {
  data: T;
  success: boolean;
  error: IHttpError | null;
}
