import { Response } from "express";
import { paginationInterface } from "@/interfaces";
export class APIResponse {
  res: Response;
  statusCode: number;
  responseData: Array<any> | object | null;
  pagination?: paginationInterface;
  constructor(
    res: Response,
    statusCode: number,
    responseData: any,
    pagination?: paginationInterface
  ) {
    this.statusCode = statusCode;
    this.responseData = responseData;
    this.res = res;
    this.pagination = pagination;
  }

  success() {
    return this.res
      .status(this.statusCode)
      .json({ data: this.responseData, pagination: this.pagination });
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
