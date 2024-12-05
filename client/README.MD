<div align="center">
  <h1>SMART PUMP FRONTEND</h1>
</div>

<div align="center">
  <img src="./src/assets/logo.png" width="100" height="100" alt="logo img">
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
2. Run in terminal command:
```
tailwind.css - npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```
3. Open file welcome.html with live server
### Main stack 
* HTML
* TAILWIND
* JAVASCRIPT

### Improvements-detected
* The project requires additional messages to inform the user when something goes wrong and to explain why. Additionally, I did not add validations as I intended, but the project detects most of them. Unfortunately, I did not have enough time to update the user image. And the app do not use .env.
