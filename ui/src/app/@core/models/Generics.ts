export namespace Generics {
  export interface GenericResponse<T> {
    data: T;
    processResult: ProcessResult;
  }
  export interface ProcessResult {
    status: string;
    message: string;
  }

  export class Page {
    constructor() {
      this.page = 0;
      this.size = 5;
    }

    size: number = 0;
    totalElements: number = 0;
    totalPages: number = 0;
    page: number;
    0;
  }
}
