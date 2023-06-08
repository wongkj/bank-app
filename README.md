# Bank App
Banking App Coding Challenge

### App Objectives
* Customers can join the bank by providing a `name` and `initial deposit`.
* Bank should have multiple customers and allow them to `deposit`,
`withdraw` and `check balances`.
* Managers should also be able to see `total bank balance`.
* Customers cannot withdraw more money than they have in their account.
* Customers can `transfer` money to other customers.

### Reason for Approach

I decided to use TypeScript as that's the language I've been using the most recently and it was an important requirement in the Job Description. I went with Express as that was an obvious choice for building the API in TypeScript. I also decided to dockerize the entire application as I wanted to include a database to persist the data. I went with MongoDB as it was easier to set up. My other option was to use PostgreSQL and use Sequelize ORM as the connection layer between PostgreSQL and Express but that would have taken more time to set up.  

### Requirements

- Docker installed on your machine.
- Method of making API Calls such as POSTMAN or using Curl commands.

## Dependencies

I used the following npm packages in the app.

| Plugin | README |
| ------ | ------ |
| express | For building the API |
| mongoose | For connecting the express app to the MongoDB database |
| jest | For unit testing |
| nodemon | For development |
| typescript | For building in TypeScript |
| ts-node | To execute TypeScript code in development without having to compile to JavaScript |
| @types/* | Various type modules for TypeScript development |

### Getting the App into your machine

Clone this repository into your local machine by executing the following:

```
git clone git@github.com:wongkj/bank-app.git
```

### Setting Up

You will need Docker installed on your machine for the installation of this app.
The Bank App is very easy to install and deploy in a Docker container. As well as a container for the express app, a container for the MongoDB database will also be generated.
By default, the Docker will expose port 8000.

When the repository is cloned on to your machine, you will need to execute the following command in a terminal to spin up a Docker Container of the Bank App Image and MongoDB Image.

```
docker-compose up -d --build
```

Once the app has been built, execute the following command to check that the containers are up and running:

```
docker ps
```

You should see the following containers up and running, `bank-app_node-app_1` and `bank-app_mongo_1`. It should also be running on port `8000`.

### Running the tests

As soon as the app is up and runing just execute the following `npm` command to run the tests:

```
npm run test
```

### Using the App

Once the Docker Container is up and running, the app should be ready to use. 
- Open up POSTMAN or your terminal to execute the Curl commands .
- The API root domain is:
```
http://localhost:8000/api/v1/account
```

##### Here are some example requests you can make as the `Manager`
&nbsp;
`Returning all the customer accounts`
```
curl --location --request GET 'http://localhost:8000/api/v1/account/manager'
```
`Returning the total bank balance`
```
curl --location --request GET 'http://localhost:8000/api/v1/account/manager/balance'
```

##### Here are some example requests you can make as the `Customer`
&nbsp;

`Returning your account information`
You will need to know your account `_id` to execute this command.

```
curl --location --request GET 'http://localhost:8000/api/v1/account/customer/{id}'
```
Example:
```
curl --location --request GET 'http://localhost:8000/api/v1/account/customer/6482554ab6db72b9a1669b89'
```
`Creating a new account`
You will need your `name` and a `balance` in the Request Body. The `balance` will be the initial deposit.

```
curl --location --request POST 'http://localhost:8000/api/v1/account/customer' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": {name},
    "balance": {amount}
}'
```
Example:
```
curl --location --request POST 'http://localhost:8000/api/v1/account/customer' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Bruce Wayne",
    "balance": 1000000
}'
```
`Deposit into Account`
You will need to know your account `_id` to execute this command.
You will need a `deposit` amount in the Request Body.

```
curl --location --request PUT 'http://localhost:8000/api/v1/account/customer/deposit/{id}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "deposit": {amount}
}'
```
Example:
```
curl --location --request PUT 'http://localhost:8000/api/v1/account/customer/deposit/648254ddb6db72b9a1669b81' \
--header 'Content-Type: application/json' \
--data-raw '{
    "deposit": 50
}'
```

