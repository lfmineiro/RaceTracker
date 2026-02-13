export type UserCreateInput = {
  name: string;
  email: string;
  password: string;
};

export type UserUpdateInput = {
  name?: string;
  email?: string;
  password?: string;
};
