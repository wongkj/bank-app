import { Request, Response } from 'express';
import {
  findAllAccounts,
  findAccountById,
  createNewAccount,
  removeAccount,
  deposit,
  withdraw
} from './accountController';
import {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount
} from '../repositories/account';

jest.mock('../repositories/account')

const req = {
  params: {
    id: '1'
  },
  body: {
    name: 'Jason Wong',
    balance: 200
  }
} as unknown as Request;

const mockResponse = {
  status: (code: any) => ({
    json: (message: any) => ({ code, message })
  })
} as unknown as Response;

describe('findAllAccounts', () => {
  describe('succes', () => {
    test('returns 200 OK for a successfully found accounts', async () => {
      const reqWithNoBodyNoParams = {
        ...req,
        params: null,
        body: null
      } as unknown as Request;
      const mockedData = true;  
      const mockGetAllAccounts = getAllAccounts as jest.MockedFunction<typeof getAllAccounts>
      mockGetAllAccounts.mockResolvedValue(mockedData as any)   
      const expectedResult = { 
        code: 200, 
        message: { 
          status: 'success'
        }
      }
      const actualResult = await findAllAccounts(reqWithNoBodyNoParams, mockResponse);
      expect(actualResult).toMatchObject(expectedResult)
    })
  })
})

describe('findAccountById', () => {

  describe('success', () => {
    test('returns 200 OK for a successfully found account', async () => {
      const reqWithNoBody = {
        ...req,
        body: null
      } as unknown as Request;
      const mockedData = true;  
      const mockGetAccountById = getAccountById as jest.MockedFunction<typeof getAccountById>
      mockGetAccountById.mockResolvedValue(mockedData as any)   
      const expectedResult = { 
        code: 200, 
        message: { 
          status: 'success'
        }
      }
      const actualResult = await findAccountById(reqWithNoBody, mockResponse);
      expect(actualResult).toMatchObject(expectedResult)
    })
  })
  describe('failure', () => {

    afterEach(() => {
      jest.resetAllMocks()
    })    

    test('return a 400 Bad Request if no id was provided as a request parameter', async () => {
      const reqWithNoId = {
        ...req,
        params: {
          id: null
        }
      } as unknown as Request;
      const expectedResult = { 
        code: 400, 
        message: { 
          status: 'Bad Request', 
          message: 'No id provided' 
        }
      }
      const actualResult = await findAccountById(reqWithNoId, mockResponse);
      expect(actualResult).toMatchObject(expectedResult)
    })
    test('return a 404 Not Found if no item was found', async () => {
      const mockGetAccountById = getAccountById as jest.MockedFunction<typeof getAccountById>
      mockGetAccountById.mockResolvedValue(null)
      const expectedResult = { 
        code: 404, 
        message: { 
          status: 'Not Found', 
          message: `Account with id ${req.params.id} could not be found`
        }
      }      
      const actualResult = await findAccountById(req, mockResponse);
      expect(actualResult).toMatchObject(expectedResult)
    })
    test("return a 500 Internal Server Error if id property doesn't exist as a request parameter", async () => {
      const reqWithNumericId = {
        ...req,
        params: null
      } as unknown as Request;      
      const expectedResult = { 
        code: 500, 
        message: { 
          status: 'Internal Server Error'
        }
      }      
      const actualResult = await findAccountById(reqWithNumericId, mockResponse);
      expect(actualResult).toMatchObject(expectedResult)
    })    
  })
})

describe('createNewAccount', () => {
  describe('success', () => {
    test('returns 200 OK for a successful account creation', async () => {
      const reqWithNoParams = {
        ...req,
        params: null
      } as unknown as Request;
      const mockedData = true;  
      const mockCreateAccount = createAccount as jest.MockedFunction<typeof createAccount>
      mockCreateAccount.mockResolvedValue(mockedData as any)   
      const expectedResult = { 
        code: 200, 
        message: { 
          status: 'success'
        }
      }
      const actualResult = await createNewAccount(reqWithNoParams, mockResponse);
      expect(actualResult).toMatchObject(expectedResult)
    })
  })
  describe('failure', () => {
    test('return 400 Bad Request if there is no body in the Request', async () => {
      const reqWithNoBody = {
        ...req,
        params: null,
        body: null
      } as unknown as Request;
      const expectedResult = { 
        code: 400, 
        message: { 
          status: 'Bad Request', 
          message: 'Incorrect Request Body provided' 
        }
      }
      const actualResult = await createNewAccount(reqWithNoBody, mockResponse);
      expect(actualResult).toMatchObject(expectedResult)
    })  
  })
})

describe('removeAccount', () => {
  describe('success', () => {
    test('returns 200 OK for a successful removal of account', async () => {
      const reqWithNoBody = {
        ...req,
        body: null
      } as unknown as Request;
      const mockedData = true;
      const mockGetAccountById = getAccountById as jest.MockedFunction<typeof getAccountById>
      mockGetAccountById.mockResolvedValue(mockedData as any)   
      const mockDeleteAccount = deleteAccount as jest.MockedFunction<typeof deleteAccount>
      mockDeleteAccount.mockResolvedValue(mockedData as any)   
      const expectedResult = { 
        code: 200, 
        message: { 
          status: 'success'
        }
      }
      const actualResult = await removeAccount(reqWithNoBody, mockResponse);
      expect(actualResult).toMatchObject(expectedResult)
    })
  })
  describe('failure', () => {
    test('return a 400 Bad Request if no id was provided as a request parameter', async () => {
      const reqWithNoId = {
        ...req,
        params: {
          id: null
        }
      } as unknown as Request;
      const expectedResult = { 
        code: 400, 
        message: { 
          status: 'Bad Request', 
          message: 'No id provided' 
        }
      }
      const actualResult = await removeAccount(reqWithNoId, mockResponse);
      expect(actualResult).toMatchObject(expectedResult)
    })
    test('return a 404 Not Found if no item was found', async () => {
      const mockGetAccountById = getAccountById as jest.MockedFunction<typeof getAccountById>
      mockGetAccountById.mockResolvedValue(null)
      const expectedResult = { 
        code: 404, 
        message: { 
          status: 'Not Found', 
          message: `Account with id ${req.params.id} could not be found`
        }
      }      
      const actualResult = await removeAccount(req, mockResponse);
      expect(actualResult).toMatchObject(expectedResult)
    })
  })
})

describe('deposit', () => {
  describe('success', () => {
    test('returns 200 OK for a successful deposit', async () => {
      const reqWithDeposit = {
        ...req,
        body: {
          deposit: 100
        }
      } as unknown as Request;
      const mockedData = true;
      const mockGetAccountById = getAccountById as jest.MockedFunction<typeof getAccountById>
      mockGetAccountById.mockResolvedValue(mockedData as any)   
      const mockUpdateAccount = updateAccount as jest.MockedFunction<typeof updateAccount>
      mockUpdateAccount.mockResolvedValue(mockedData as any)   
      const expectedResult = { 
        code: 200, 
        message: { 
          status: 'success'
        }
      }
      const actualResult = await deposit(reqWithDeposit, mockResponse);
      expect(actualResult).toMatchObject(expectedResult)
    })
  })
  describe('failure', () => {
    test('return a 400 Bad Request if no id was provided as a request parameter', async () => {
      const reqWithNoId = {
        ...req,
        params: {
          id: null
        }
      } as unknown as Request;
      const expectedResult = { 
        code: 400, 
        message: { 
          status: 'Bad Request', 
          message: 'No id provided' 
        }
      }
      const actualResult = await deposit(reqWithNoId, mockResponse);
      expect(actualResult).toMatchObject(expectedResult)
    })
    test('return a 400 Bad Request if deposit not in request body', async () => {
      const reqWithNoDeposit = {
        ...req,
        body: {}
      } as unknown as Request;
      const expectedResult = { 
        code: 400, 
        message: { 
          status: 'Bad Request', 
          message: 'No deposit property in the Request Body'
        }
      }      
      const actualResult = await deposit(reqWithNoDeposit, mockResponse);
      expect(actualResult).toMatchObject(expectedResult)
    })
    test('return a 400 Bad Request if deposit not in request body', async () => {
      const reqWithNoDeposit = {
        ...req,
        body: {}
      } as unknown as Request;
      const expectedResult = { 
        code: 400, 
        message: { 
          status: 'Bad Request', 
          message: 'No deposit property in the Request Body'
        }
      }      
      const actualResult = await deposit(reqWithNoDeposit, mockResponse);
      expect(actualResult).toMatchObject(expectedResult)
    })
    test('return a 404 Not Found if no item was found', async () => {
      const reqWithDeposit = {
        ...req,
        body: {
          deposit: 100
        }
      } as unknown as Request;
      const mockGetAccountById = getAccountById as jest.MockedFunction<typeof getAccountById>
      mockGetAccountById.mockResolvedValue(null)
      const expectedResult = { 
        code: 404, 
        message: { 
          status: 'Not Found', 
          message: `No account with id ${req.params.id} could not be found`
        }
      }
      const actualResult = await deposit(reqWithDeposit, mockResponse);
      expect(actualResult).toMatchObject(expectedResult)
    })
    test('return a 400 Bad Request the deposit is not a positive number', async () => {
      const reqWithDeposit = {
        ...req,
        body: {
          deposit: -100
        }
      } as unknown as Request;
      const mockedData = true;
      const mockGetAccountById = getAccountById as jest.MockedFunction<typeof getAccountById>
      mockGetAccountById.mockResolvedValue(mockedData as any)   
      const expectedResult = { 
        code: 400, 
        message: { 
          status: 'Bad Request', 
          message: `The deposit must be a positive number`
        }
      }
      const actualResult = await deposit(reqWithDeposit, mockResponse);
      expect(actualResult).toMatchObject(expectedResult)
    })
  })
})

describe('withdraw', () => {

  describe('success', () => {
    test('returns 200 OK for a successful withdrawal', async () => {
      const reqWithDeposit = {
        ...req,
        body: {
          withdraw: 100
        }
      } as unknown as Request;
      const mockedData = true;
      const mockGetAccountById = getAccountById as jest.MockedFunction<typeof getAccountById>
      mockGetAccountById.mockResolvedValue(mockedData as any)   
      const mockUpdateAccount = updateAccount as jest.MockedFunction<typeof updateAccount>
      mockUpdateAccount.mockResolvedValue(mockedData as any)   
      const expectedResult = { 
        code: 200, 
        message: { 
          status: 'success'
        }
      }
      const actualResult = await withdraw(reqWithDeposit, mockResponse);
      expect(actualResult).toMatchObject(expectedResult)
    })
  })

  describe('failure', () => {
    test('return a 400 Bad Request if no id was provided as a request parameter', async () => {
      const reqWithNoId = {
        ...req,
        params: {
          id: null
        }
      } as unknown as Request;
      const expectedResult = { 
        code: 400, 
        message: { 
          status: 'Bad Request', 
          message: 'No id provided' 
        }
      }
      const actualResult = await withdraw(reqWithNoId, mockResponse);
      expect(actualResult).toMatchObject(expectedResult)
    })
  })
  test('return a 400 Bad Request if deposit not in request body', async () => {
    const reqWithNoWithdraw = {
      ...req,
      body: {}
    } as unknown as Request;
    const expectedResult = { 
      code: 400, 
      message: { 
        status: 'Bad Request', 
        message: 'No withdraw property in the Request Body'
      }
    }      
    const actualResult = await withdraw(reqWithNoWithdraw, mockResponse);
    expect(actualResult).toMatchObject(expectedResult)
  })
})