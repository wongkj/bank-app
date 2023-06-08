"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBankBalance = exports.transfer = exports.withdraw = exports.deposit = exports.removeAccount = exports.createNewAccount = exports.findAccountById = exports.findAllAccounts = void 0;
const account_1 = require("../repositories/account");
const findAllAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield (0, account_1.getAllAccounts)();
        return res.status(200).json({
            status: 'success',
            data: {
                accounts
            }
        });
    }
    catch (error) {
        console.log(`error: ${error}`);
        return res.status(500).json({
            status: 'fail',
            errorMessage: error
        });
    }
});
exports.findAllAccounts = findAllAccounts;
const findAccountById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id)
            return res.status(400).json({ status: 'Bad Request', message: 'No id provided' });
        const { id } = req.params;
        const account = yield (0, account_1.getAccountById)(id);
        if (!account)
            return res.status(404).json({ status: 'Not Found', message: `Account with id ${id} could not be found` });
        return res.status(200).json({
            status: 'success',
            data: {
                account
            }
        });
    }
    catch (error) {
        console.log(`error: ${error}`);
        return res.status(500).json({
            status: 'Internal Server Error',
            errorMessage: error
        });
    }
});
exports.findAccountById = findAccountById;
const createNewAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body)
            return res.status(400).json({ status: 'Bad Request', message: 'Incorrect Request Body provided' });
        const account = yield (0, account_1.createAccount)(req.body);
        return res.status(200).json({
            status: 'success',
            data: {
                account
            }
        });
    }
    catch (error) {
        console.log(`error: ${error}`);
        return res.status(500).json({
            status: 'Internal Server Error',
            errorMessage: error
        });
    }
});
exports.createNewAccount = createNewAccount;
const removeAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id)
            return res.status(400).json({ status: 'Bad Request', message: 'No id provided' });
        const { id } = req.params;
        const account = yield (0, account_1.getAccountById)(id);
        if (!account)
            return res.status(404).json({ status: 'Not Found', message: `Account with id ${req.params.id} could not be found` });
        const deletedAccount = yield (0, account_1.deleteAccount)(id);
        return res.status(200).json({
            status: 'success',
            data: {
                deletedAccount
            }
        });
    }
    catch (error) {
        console.log(`error: ${error}`);
        return res.status(500).json({
            status: 'Internal Server Error',
            errorMessage: error
        });
    }
});
exports.removeAccount = removeAccount;
const deposit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id)
            return res.status(400).json({ status: 'Bad Request', message: 'No id provided' });
        const { id } = req.params;
        if (!req.body.deposit)
            return res.status(400).json({ status: 'Bad Request', message: 'No deposit property in the Request Body' });
        const account = yield (0, account_1.getAccountById)(id);
        if (!account)
            return res.status(404).json({ status: 'Not Found', message: `No account with id ${id} could not be found` });
        const { balance } = account;
        const { deposit } = req.body;
        const filter = { _id: id };
        const update = { balance: balance + deposit };
        if (deposit < 0)
            return res.status(400).json({ status: 'Bad Request', message: 'The deposit must be a positive number' });
        yield (0, account_1.updateAccount)(filter, update);
        const newAccount = yield (0, account_1.getAccountById)(id);
        return res.status(200).json({
            status: 'success',
            data: {
                newAccount
            }
        });
    }
    catch (error) {
        console.log(`error: ${error}`);
        return res.status(500).json({
            status: 'Internal Server Error',
            errorMessage: error
        });
    }
});
exports.deposit = deposit;
const withdraw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id)
            return res.status(400).json({ status: 'Bad Request', message: 'No id provided' });
        const { id } = req.params;
        if (!req.body.withdraw)
            return res.status(400).json({ status: 'Bad Request', message: 'No withdraw property in the Request Body' });
        const account = yield (0, account_1.getAccountById)(id);
        if (!account)
            return res.status(404).json({ status: 'Not Found', message: `No account with id ${id} could not be found` });
        const { balance } = account;
        const { withdraw } = req.body;
        if (balance <= 0 || withdraw > balance)
            return res.status(400).json({ status: 'Bad Request', message: `Customer account balance is ${balance}. Unable to withdraw ${Math.abs(withdraw)}` });
        const filter = { _id: id };
        const update = { balance: balance - Math.abs(withdraw) };
        yield (0, account_1.updateAccount)(filter, update);
        const newAccount = yield (0, account_1.getAccountById)(id);
        return res.status(200).json({
            status: 'success',
            data: {
                newAccount
            }
        });
    }
    catch (error) {
        console.log(`error: ${error}`);
        return res.status(500).json({
            status: 'Internal Server Error',
            errorMessage: error
        });
    }
});
exports.withdraw = withdraw;
const transfer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id)
            return res.status(400).json({ status: 'Bad Request', message: 'No id provided' });
        const { id } = req.params;
        if (!req.body.otherAccountId)
            return res.status(400).json({ status: 'Bad Request', message: 'No id provided for other Account to transfer into' });
        if (!req.body.amount)
            return res.status(400).json({ status: 'Bad Request', message: 'No transfer amount provided in Request Body' });
        const { otherAccountId } = req.body;
        const withdrawerAccount = yield (0, account_1.getAccountById)(id);
        const depositerAccount = yield (0, account_1.getAccountById)(otherAccountId);
        if (!withdrawerAccount)
            return res.status(404).json({ status: 'Not Found', message: `The account being withdrawn from with id ${id} could not be found` });
        if (!depositerAccount)
            return res.status(404).json({ status: 'Not Found', message: `The account being deposited into with id ${otherAccountId} could not be found` });
        const { balance: withdrawerBalance } = withdrawerAccount;
        const { balance: depositorBalance } = depositerAccount;
        const { amount } = req.body;
        if (withdrawerBalance <= 0 || amount > withdrawerBalance)
            return res.status(400).json({ status: 'Bad Request', message: `Customer being withdrawn from has balance of ${withdrawerBalance}. Unable to withdraw ${Math.abs(amount)}` });
        if (amount <= 0)
            return res.status(400).json({ status: 'Bad Request', message: 'The transer amount must be a positive number' });
        const withdrawerFilter = { _id: id };
        const withdrawerUpdate = { balance: withdrawerBalance - amount };
        const depositorFilter = { _id: otherAccountId };
        const depositorUpdate = { balance: depositorBalance + amount };
        yield (0, account_1.updateAccount)(withdrawerFilter, withdrawerUpdate);
        yield (0, account_1.updateAccount)(depositorFilter, depositorUpdate);
        const newWithdrawerAccount = yield (0, account_1.getAccountById)(id);
        const newDepositorAccount = yield (0, account_1.getAccountById)(otherAccountId);
        return res.status(200).json({
            status: 'success',
            data: {
                newWithdrawerAccount,
                newDepositorAccount
            }
        });
    }
    catch (error) {
        console.log(`error: ${error}`);
        return res.status(500).json({
            status: 'Internal Server Error',
            errorMessage: error
        });
    }
});
exports.transfer = transfer;
const getBankBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accounts = yield (0, account_1.getAllAccounts)();
        const total = accounts.reduce((total, acc) => total + acc.balance, 0);
        return res.status(200).json({
            status: 'success',
            data: {
                total
            }
        });
    }
    catch (error) {
        console.log(`error: ${error}`);
        return res.status(500).json({
            status: 'Internal Server Error',
            errorMessage: error
        });
    }
});
exports.getBankBalance = getBankBalance;
