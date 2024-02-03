export type User = {
  email: string;
  password: string;
};

export type UserResponse = {
  id: string;
  email: User;
};

export type TokenResponse = {
  access_token: string;
  expires_at: number;
  issued_at: number;
  refresh_token: string;
  refresh_token_expires_at: number;
  refresh_token_issued_at: number;
  token_type: string;
};
