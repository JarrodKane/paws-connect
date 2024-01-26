export type User = {
  email: string;
  password: string;
};

export type UserResponse = {
  id: string;
  email: User;
};
