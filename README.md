# Cypress task for spriteCloud

Example project for Cypress
<br>Official page: https://www.cypress.io
<br>Guides: https://docs.cypress.io/guides/overview/why-cypress
<br>Commands: https://docs.cypress.io/api/table-of-contents

## Installation

1. Follow the guide and install nvm - https://heynode.com/tutorial/install-nodejs-locally-nvm/

    - Install node.js version ~16 and set it as default
      ```
      nvm install 16
      nvm alias default 16
      nvm use 16
      ```

2. Install project dependencies
   ```
   npm install
   ```

## Usage

### Task has 3 parts UI(Cypress, Cypress + Cucumber) and API 

## 1. UI

   ```
   Under cypress -> e2e -> spriteUI there are 8 test cases of task requested by sspriteCloud
   ```
   ```
   Under cypress -> e2e -> feature there are some extra scenarios with BDD Cucumber(not requested by task).   
   They are developed just to show how Cypress run with Cucumber and the way I implement it in my current project.
   ```
   ```
   Scenarios are to fill the forms and it is very useful for us as QA Automation and non-technical people.
   
   In order to run it, check 'Running the tests' section below. If you are using VSC you may need to specify the path of stepDefs 
   (on my side I am using IntelliJ ultimate, so it is pretty easy)
   ```
## 2. API

   ```
   Under cypress -> e2e -> spriteAPI there are developed all API test cases for PET section specified in swagger. 
   ```

## Running the tests

To open Cypress

```
npx cypress open
```

To run tests headless mode

```
npx cypress run
```

To run tests headless and generate html reports use scripts specified on package.json file

```
For remove and generate mochawesome html report
npm run remove-reports:run:report
```

```
After execute 'npm run remove-reports:run:report' command, you can open in browser hmtl report under 
cypress->results->report.html
```

To run tests headlessly with chrome

```
npx cypress run --browser chrome
```



## Please if you need more info, do not hesitate to contact me 
```
klevismuda@gmail.com
```