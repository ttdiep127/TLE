import {Gender} from '../share/enums';

export class UserLogin {
  emailAddress: string;
  password: string;
  name: string;
  isKeepSignedIn: boolean;
}

export class LoggedUser {
  userId: number;
  employeeId: number;
  accessToken: string;
  fullName: string;
  email: string;
  roles: string[] = [];
  exp: number;

  public constructor(init?: Partial<LoggedUser>) {
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

export class UserInfo {
  userId: string;
  email: string;
  name: string;
}
