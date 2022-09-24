# Boat Slip Interview Question

A boat slip API that allows for management of boat slips including -

- Getting a list of all boat slips
- Docking a boat into the next available slip
- Removing a boat from a specific slip

_Please note: data will be reset on initization, but will remain between calls_

## Installation

1. run `npm install`
2. run `npm start`

## Usage

Utilizing an API application the following commands are accessible on `localhost:8080/boat-slips`

- `GET /boat-slips` - gets all the avaliable boat slips and their vacnacies
- `POST /boat-slips` - allows a boat to be put into port utilizing a body of `{"vesselName" : string}`
- `PUT /boat-slips/:id` - removes a boat from a specific dock

## Automated testing

Automated tests have been created, these can be ran via `npm test`

## Design jusifitcation

- express routes
- data stored locally
- utilizing mocha and supertest

## Possible Imporvements:

- Use PATCH instead of POST for updating vessels into vacancies
- Use POST to create new slips
