import { Response } from "express";
export class APIResponse {
  res: Response;
  statusCode: number;
  responseData: Array<any> | object | null;
  constructor(res: Response, statusCode: number, responseData: any) {
    this.statusCode = statusCode;
    this.responseData = responseData;
    this.res = res;
  }

  success() {
    return this.res.status(this.statusCode).json({ data: this.responseData });
  }
  successMessage() {
    return this.res
      .status(this.statusCode)
      .json({ message: this.responseData });
  }
  failed(error?: Error) {
    return this.res
      .status(this.statusCode)
      .json({ message: this.responseData, error: error?.message });
  }
}
