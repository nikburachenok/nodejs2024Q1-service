# Home Library Service

## Installation process
1. Create the .env file using [example](.env.example);
2. Install npm modules using ```npm install```
3. Create account on Docker Hub
4. Install the Docker Desktop application, launch and log in.

## Setting application port
You can use .env file to set port for application. To do this you need to change the PORT environment. By default port is 4000.

## Running application
To run application you need to have an account on Docker Hub, Docker Desktop application installed and launched on your laptop.
To start application use following command:
```npm run start:docker```

## Vulnerabilities scanning
To scan application image use ```npm run scan:docker```

## Swagger
After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation by typing http://localhost:4000/swagger/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing
After application running, open new terminal and enter ```npm run test``` to run all tests without authorization.
To run only one of all test suites use ```npm run test -- <path to suite>```.
Please don't use ```npm run test:auth```, ```npm run test:refresh```, ```npm run test:watch```, ```npm run test:cov``` and ```npm run test:debug``` commands, because all tests are not implemented in this part of task.

## Auto-fix and format
Use ```npm run lint``` and ```npm run format``` to launch eslint or prettier formatters.

## Server structure
Use [this instruction](README.md#swagger) to launch swagger and look at server structure and available requests
