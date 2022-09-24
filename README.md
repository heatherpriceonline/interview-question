# Boat Slip Interview Question

A boat slip API that allows for management of boat slips including -

- Getting a list of all boat slips
- Docking a boat into the next available slip
- Removing a boat from a specific slip

_Please note: data will be reset on initization, but will remain between api calls_

## Installation and Quick Start

1. run `npm install`
2. run `npm start`

## Usage

Utilizing an API application (postman) or `curl` the following commands are accessible on `localhost:8080/boat-slips`

- `GET /boat-slips` - gets all the avaliable boat slips and their vacnacies
- `POST /boat-slips` - allows a boat to be put into port utilizing a body of `{"vesselName" : string}`
- `PUT /boat-slips/:id/vacate` - where :id is the ID number of the slip you'd like to vacate

## Automated testing

Automated tests have been created, these can be ran via `npm test` within a terminal

## Design jusifitcation

### Folder Structure

- controllers - provides the logic for each route, separated to keep business logic separated from possible front ends
- routes - provides the routes for the endpoints, allows for other possible endpoints to be created
- test - automated tests are included for API calls using Mocha and supertest
- index.js - required for express - includes the port and imports the routes

### Packages used

Minimal third party packages were used to provide simplicity.

- Express - utilized as a server
- Mocha - utilized for testing simplicity
- Assert - utilizted alongside mocha to provide assertion statements
- SuperTest - utilzied within tests for simiplification of testing API calls

## Possible Imporvements:

- Use PATCH instead of POST for updating vessels into vacancies
- Use POST to create new slips
- Use DELETE to remove slips
- Create a UI to see the various slips and their currrent status
- Proper error handling
- Utilization of a Database e.g. MongoDB and mongoose
