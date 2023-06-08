import { Account, IAccount } from '../models/accountSchema';

interface IFilter {
  _id: string;
}

interface IUpdate {
  balance: number;
}

export const getAllAccounts = async () => {
  return await Account.find();
}

export const getAccountById = async (id: string) => {
  return await Account.findById(id);
}

export const createAccount = async (body: IAccount) => {
  return await Account.create(body);
}

export const deleteAccount = async (id: string) => {
  return await Account.findByIdAndDelete(id);
}

export const updateAccount = async (filter: IFilter, update: IUpdate) => {
  return await Account.findOneAndUpdate(filter, update);
}