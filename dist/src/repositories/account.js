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
exports.updateAccount = exports.deleteAccount = exports.createAccount = exports.getAccountById = exports.getAllAccounts = void 0;
const accountSchema_1 = require("../models/accountSchema");
const getAllAccounts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield accountSchema_1.Account.find();
});
exports.getAllAccounts = getAllAccounts;
const getAccountById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield accountSchema_1.Account.findById(id);
});
exports.getAccountById = getAccountById;
const createAccount = (body) => __awaiter(void 0, void 0, void 0, function* () {
    return yield accountSchema_1.Account.create(body);
});
exports.createAccount = createAccount;
const deleteAccount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield accountSchema_1.Account.findByIdAndDelete(id);
});
exports.deleteAccount = deleteAccount;
const updateAccount = (filter, update) => __awaiter(void 0, void 0, void 0, function* () {
    return yield accountSchema_1.Account.findOneAndUpdate(filter, update);
});
exports.updateAccount = updateAccount;
