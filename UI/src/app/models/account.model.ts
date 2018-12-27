import {Gender} from '../share/enums';

export class UserLogin {
  emailAddress: string;
  password: string;
  isKeepSignedIn: boolean;

  public constructor(init?: Partial<UserLogin>) {
    Object.assign(this, init);
  }
}

export class UserInfo {
  id: number;
  emailAddress: number;
  accessToken: string;
  fullName: string;
  lastName: string;
  firstName: string;
  gender: number;
  token: string;
  joinedDate: Date;
  avtSrc: string;
  exp: number;

  public constructor(init?: Partial<UserInfo>) {
    Object.assign(this, init);
  }
}


export class RegisterUser {
  emailAddress: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: Gender;
}
