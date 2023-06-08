# Bank App
Banking App Coding Challenge

### App Objectives 

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

### Using the App

Once the Docker Container is up and running, the app should be ready to use. 
- Open up your web browser.
- The API root endpoint is:
```
http://localhost:3000/api/v1/cats
```
- The app has 2 query string parameters: 
    - **type**: This is _required_. The app will throw an error if this is not included. The **type** allowed are:
        - **child_friendly**
        - **dog_friendly**
        - **stranger_friendly**
    - **limit**: this is **optional**. If no limit is provided then the default value of **5** will be used.

##### Here are some example requests you can make
&nbsp;
`Getting the top 5 child friendly cats`
```
http://localhost:3000/api/v1/cats?type=child_friendly
```
`Getting the top 5 dog friendly cats`
```
http://localhost:3000/api/v1/cats?type=dog_friendly
```
`Getting the top 5 dog stranger friendly cats`
```
http://localhost:3000/api/v1/cats?type=stranger_friendly
```
`Getting the top 11 stranger friendly cats`
```
http://localhost:3000/api/v1/cats?type=stranger_friendly&limit=11
```
