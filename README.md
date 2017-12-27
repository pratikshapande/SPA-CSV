# Angular2 Line Chart (Task)

The objective of the task is to take the CSV file supplied by a user (attached CSV). Save the same in any database, and generate a unique link for each dataset. When user opens the link, render a line chart with the data submitted by user.

### CSV Format

`SERIES,YEAR|SCORE,YEAR|SCORE......`

The first column is name of the series, all other columsn in the row contains pipe de-limited data, related to that series. The first param is the year (X-Axis) and second param is the score (Y-Axis).

### Tasks

    1. Develop a SPA using any frontend framework like Angular, ReactJs, VueJs.
    2. The interface should allow user to upload a CSV file (fixed format as attached CSV)
    3. All CSV parsing and validation need to be done in browser, and final JSON should be sent to server.
    4. Develop a API server using any framework like HapiJS, ExpressJS etc., which takes JSON input, and stores the data in databse.
    5. Provde a unique link to the user. When user open the link, it should render a line chart with provided data.
    6. The Backend and Frontend code should be completly isolated

### Assumptions
    
    1. Assume that the CSV format is fixed (as attached
    2. Assume that each series is unique and there exists one and only one row with series name
    3. No Authentication is necessary

## Technologies Used

    - ReactJS
    - Angular2 (angular-cli)
    - D3
    - NodeJs, ExpressJs
    - MongoDB

## UI Setup

### Prerequisites
    - Webpack & Webpack-dev-server

Go to `/ui-reactjs` folder and run below commands.

```sh
$ npm install
$ npm start
```

## Server Setup

### Prerequisites
    - Gulp
    - MongoDB

Go to `/server` folder and run below commands. Please make sure to run MongoDB server

```sh
$ npm install
$ gulp
```

## Server Setup

UI will run on `http://localhost:4200`

Server will run on `http://localhost:8000`