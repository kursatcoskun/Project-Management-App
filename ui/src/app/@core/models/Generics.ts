export namespace Generics {
  export interface GenericResponse<T> {
    data: T;
    processResult: ProcessResult;
  }
  export interface ProcessResult {
    status: string;
    message: string;
  }
}
