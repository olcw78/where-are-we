class AppError extends Error {
  private status: string;
  get getStatus(): string {
    return this.status;
  }
  set setStatus(newStatus: string) {
    this.status = newStatus;
  }

  private statusCode: number;
  get getStatusCode(): number {
    return this.statusCode;
  }
  set setStatusCode(newStatusCode: number) {
    this.statusCode = newStatusCode;
  }

  private isOperational: boolean;
  get getIsOperational(): boolean {
    return this.isOperational;
  }

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// module.exports = AppError;
export default AppError;
