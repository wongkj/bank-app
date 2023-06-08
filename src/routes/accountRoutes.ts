import express from 'express';
import * as accountController from '../controllers/accountController';

const router = express.Router()

router
  .route("/customer")
  .post(accountController.createNewAccount)

router
  .route("/customer/:id")
  .delete(accountController.removeAccount)
  .get(accountController.findAccountById)

router
  .route("/customer/deposit/:id")
  .put(accountController.deposit)

router
  .route("/customer/withdraw/:id")
  .put(accountController.withdraw) 

router
  .route("/customer/transfer/:id")
  .put(accountController.transfer) 

router
  .route("/manager")
  .get(accountController.findAllAccounts)

router
  .route("/manager/balance")
  .get(accountController.getBankBalance) 

export default router;