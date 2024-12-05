<div align="center">
  <h1>SMART PUMP BACKEND</h1>
</div>

<div align="center">
  <img src="https://programaconleo.com/wp-content/uploads/2022/12/que-es-nodejs.png" width="200" height="100" alt="logo img">
  </img>
</div>

## Table of Contents
- [Requirements](#requirements) 
- [Run-in-development](#run-in-development)
  - [Main-stack](#main-stack )
- [Improvements-detected](#improvements-detected)

## Requirements
* Login to the app via email and password
* Restrict access to valid a User
* Once logged in show the details of the user on the page
* Authorized users can check their account balance
* Allow the user to change their details
* lowdb (DB) -> https://github.com/typicode/lowdb
* node.js -> http://nodejs.org/ 

## Run in development
1. Open a terminal
2. Run command: (REQUIRED)
```
npm i
```
3. Use your own varibles in .env (OPTIONAL)
4. Run command:
```
npm run dev
```

### Main stack 
* NODEJS
* EXPRESS
* LOWDB

### Improvements-detected
* I just added a .env file for easier testing, but I know it's a bad practice.
* I would like to use a real database
* Add more validations