export type Response<T> = {
  code: HTTPSTATUS;
  status: string;
  data: T;
  message: string;
};

export enum HTTPSTATUS {
  success = 200,
  created = 201,
  badRequest = 400,
  unAuthorized = 401,
  forbidden = 403,
  notFound = 404,
}
