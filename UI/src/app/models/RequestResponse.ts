export class RequestResponse {
  success: boolean;
  message: string;
  data: any;
}


export class RequestResult {
  userId: number;
  guidId: string;

  public constructor(init?: Partial<RequestResult>) {
    Object.assign(this, init);
  }
}
