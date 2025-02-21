export interface IValidateResponse {
  status: boolean;
}

export interface UserDTOUpdate {
  phone: string;
  password?: string;
  name?: string;
}
