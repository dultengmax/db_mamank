export class RegisterUserRequest {
  userName: string;
  password: string;
  email: string;
}
export class fotoProfileRequest {
  image: string;
  email: string;
  id: string;
}
export class userNameRequest {
  email: string;
  userName: string;
  id: string;
}
export class PasswordRequest {
  email: string;
  password: string;
  newPassword?: string;
  id: string;
}
export class contactusersRequest {
  email: string;
  password: string;
  newPassword?: string;
  id: string;
}
