import { Schema, model } from 'mongoose';

export interface IAccount {
  name: string;
  balance: number;
}

const accountSchema = new Schema<IAccount>({
  name: {
    type: String,
    required: [true, 'Account must have a name']
  },
  balance: {
    type: Number,
    required: [true, 'Account must have a value']
  }
})

export const Account = model<IAccount>('Account', accountSchema);
