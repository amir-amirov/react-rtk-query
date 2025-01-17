import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  isLoading: boolean;
  user: User | null;
};

export type User = {
  approve_confidential: boolean;
  email: string;
  email_verified_at: string;
  id: number;
  last_name: string;
  name: string;
  permissions: null | boolean;
  phone: any;
  photo: null | string;
};
// Contracts
export type BaseContract<T> = CaseReducer<UserState, PayloadAction<T>>;
