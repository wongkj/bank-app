"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accountController = __importStar(require("../controllers/accountController"));
const router = express_1.default.Router();
router
    .route("/customer")
    .post(accountController.createNewAccount);
router
    .route("/customer/:id")
    .delete(accountController.removeAccount)
    .get(accountController.findAccountById);
router
    .route("/customer/deposit/:id")
    .put(accountController.deposit);
router
    .route("/customer/withdraw/:id")
    .put(accountController.withdraw);
router
    .route("/customer/transfer/:id")
    .put(accountController.transfer);
router
    .route("/manager")
    .get(accountController.findAllAccounts);
router
    .route("/manager/balance")
    .get(accountController.getBankBalance);
exports.default = router;
