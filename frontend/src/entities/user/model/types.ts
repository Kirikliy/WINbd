export type User = {
  _id: string;
  __v: number;
  login: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserState = {
  data: User | null;
  authenticated: boolean;
};
