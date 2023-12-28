export interface User {
  username: string;
  email: string;
  password: string;
}
export interface UserLogin {
  email: string;
  password: string;
}

export type CookieProps = {
  cookieFN: (name: string, value: string) => void;
};

export type ErrorResult = {
  success: boolean;
  message: string;
  status: number;
};
