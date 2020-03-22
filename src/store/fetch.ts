export interface FetchState {
  status: Status;
  error?: string;
}

export enum Status {
  NULL,
  PENDING,
  SUCCESS,
  FAIL
}
