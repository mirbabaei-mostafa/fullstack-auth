export interface User {
  username: string;
  email: string;
  password?: string;
  image?: string;
}
export interface UserLogin {
  email: string;
  password: string;
}

export type CookieProps = {
  cookieFN: (name: string, value: string) => void;
};

export type ErrorProp = {
  errorFN: (message: string) => void;
};

export type GoogleProps = CookieProps & ErrorProp;

export type ErrorResult = {
  success: boolean;
  message: string;
  status: number;
};
