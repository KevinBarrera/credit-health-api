export class CustomError<T = null> extends Error {
  public status: number;
  public data: T;
  public originalError: unknown;

  constructor(
    status: number,
    message: string,
    data: T,
    originalError: unknown
  ) {
    super(message);
    this.name = "CustomError";
    this.status = status;
    this.data = data;
    this.originalError = originalError;
  }
}
