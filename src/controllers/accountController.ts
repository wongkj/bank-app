import { Request, Response } from 'express';
import {
  getAllAccounts,
  getAccountById,
  createAccount,
  deleteAccount,
  updateAccount
} from '../repositories/account';

export const findAllAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await getAllAccounts();
    return res.status(200).json({
      status: 'success',
      data: {
        accounts
      }
    })
  } catch (error) {
    console.log(`error: ${error}`)
    return res.status(500).json({
      status: 'fail',
      errorMessage: error
    })
  }
}

export const findAccountById = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) return res.status(400).json({ status: 'Bad Request', message: 'No id provided' });
    const { id } = req.params;
    const account = await getAccountById(id)
    if (!account) return res.status(404).json({ status: 'Not Found', message: `Account with id ${id} could not be found` })
    return res.status(200).json({
      status: 'success',
      data: {
          account
      }
    })    
  } catch (error) {
    console.log(`error: ${error}`)
    return res.status(500).json({
      status: 'Internal Server Error',
      errorMessage: error
    })    
  }
}

export const createNewAccount = async (req: Request, res: Response) => {
  try {
    if (!req.body) return res.status(400).json({ status: 'Bad Request', message: 'Incorrect Request Body provided' })
    const account = await createAccount(req.body);
    return res.status(200).json({
      status: 'success',
      data: {
        account
      }
    })
  } catch (error) {
    console.log(`error: ${error}`)
    return res.status(500).json({
      status: 'Internal Server Error',
      errorMessage: error
    })
  }
}

export const removeAccount = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) return res.status(400).json({ status: 'Bad Request', message: 'No id provided' });
    const { id } = req.params;
    const account = await getAccountById(id);
    if (!account) return res.status(404).json({ status: 'Not Found', message: `Account with id ${req.params.id} could not be found` });
    const deletedAccount = await deleteAccount(id);
    return res.status(200).json({
      status: 'success',
      data: {
        deletedAccount
      }
    })
  } catch (error) {
    console.log(`error: ${error}`)
    return res.status(500).json({
      status: 'Internal Server Error',
      errorMessage: error
    })
  }
}

export const deposit = async (req: Request, res: Response) => {
  try {

    if (!req.params.id) return res.status(400).json({ status: 'Bad Request', message: 'No id provided' });
    const { id } = req.params;
    if (!req.body.deposit) return res.status(400).json({ status: 'Bad Request', message: 'No deposit property in the Request Body' })
    const account = await getAccountById(id)
    if (!account) return res.status(404).json({ status: 'Not Found', message: `No account with id ${id} could not be found` });

    const { balance } = account;
    const { deposit } = req.body;
    const filter = { _id: id };
    const update = { balance: balance + deposit }

    if (deposit < 0) return res.status(400).json({ status: 'Bad Request', message: 'The deposit must be a positive number' })

    await updateAccount(filter, update);
    const newAccount = await getAccountById(id)

    return res.status(200).json({
      status: 'success',
      data: {
        newAccount
      }
    })    
  } catch (error) {
    console.log(`error: ${error}`)
    return res.status(500).json({
        status: 'Internal Server Error',
        errorMessage: error
    })    
  }
}


export const withdraw = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) return res.status(400).json({ status: 'Bad Request', message: 'No id provided' });
    const { id } = req.params;
    if (!req.body.withdraw) return res.status(400).json({ status: 'Bad Request', message: 'No withdraw property in the Request Body' })
    const account = await getAccountById(id)
    if (!account) return res.status(404).json({ status: 'Not Found', message: `No account with id ${id} could not be found` });

    const { balance } = account;
    const { withdraw } = req.body;

    if (balance <= 0 || withdraw > balance) return res.status(400).json({ status: 'Bad Request', message: `Customer account balance is ${balance}. Unable to withdraw ${Math.abs(withdraw)}` })

    const filter = { _id: id };
    const update = { balance: balance - Math.abs(withdraw) }

    await updateAccount(filter, update);
    const newAccount = await getAccountById(id)

    return res.status(200).json({
      status: 'success',
      data: {
        newAccount
      }
    })    
  } catch (error) {
    console.log(`error: ${error}`)
    return res.status(500).json({
        status: 'Internal Server Error',
        errorMessage: error
    })    
  }
}

export const transfer = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) return res.status(400).json({ status: 'Bad Request', message: 'No id provided' });
    const { id } = req.params;

    if (!req.body.otherAccountId) return res.status(400).json({ status: 'Bad Request', message: 'No id provided for other Account to transfer into' })
    if (!req.body.amount) return res.status(400).json({ status: 'Bad Request', message: 'No transfer amount provided in Request Body' })
    const { otherAccountId } = req.body; 

    const withdrawerAccount = await getAccountById(id)
    const depositerAccount = await getAccountById(otherAccountId)

    if (!withdrawerAccount) return res.status(404).json({ status: 'Not Found', message: `The account being withdrawn from with id ${id} could not be found` });
    if (!depositerAccount) return res.status(404).json({ status: 'Not Found', message: `The account being deposited into with id ${otherAccountId} could not be found` });

    const { balance: withdrawerBalance } = withdrawerAccount;
    const { balance: depositorBalance } = depositerAccount;
    const { amount } = req.body;

    if (withdrawerBalance <= 0 || amount > withdrawerBalance) return res.status(400).json({ status: 'Bad Request', message: `Customer being withdrawn from has balance of ${withdrawerBalance}. Unable to withdraw ${Math.abs(amount)}` })
    if (amount <= 0) return res.status(400).json({ status: 'Bad Request', message: 'The transer amount must be a positive number' })

    const withdrawerFilter = { _id: id };
    const withdrawerUpdate = { balance: withdrawerBalance - amount }

    const depositorFilter = { _id: otherAccountId };
    const depositorUpdate = { balance: depositorBalance + amount }

    await updateAccount(withdrawerFilter, withdrawerUpdate);
    await updateAccount(depositorFilter, depositorUpdate);

    const newWithdrawerAccount = await getAccountById(id)
    const newDepositorAccount = await getAccountById(otherAccountId)

    return res.status(200).json({
      status: 'success',
      data: {
        newWithdrawerAccount,
        newDepositorAccount
      }
    }) 

  } catch (error) {
    console.log(`error: ${error}`)
    return res.status(500).json({
        status: 'Internal Server Error',
        errorMessage: error
    })   
  }
}

export const getBankBalance = async (req: Request, res: Response) => {
  try {
    const accounts = await getAllAccounts();
    const total = accounts.reduce((total, acc) => total + acc.balance, 0)
    return res.status(200).json({
      status: 'success',
      data: {
        total
      }
    })    
  } catch (error) {
    console.log(`error: ${error}`)
    return res.status(500).json({
        status: 'Internal Server Error',
        errorMessage: error
    })
  }
}