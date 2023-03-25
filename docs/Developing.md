# Developing

This document provides guidelines for developing new transformations. 

## Requirements

- Node and npm installed (currently tested using node 14.x).

## Project directories
This project is a typical npm project. The main directories are:

- `src` - contains transformation and custom library code.
- `tests` - contains tests for transformations and libraries.
- `vendor` - contains libraries from 3rd parties.

> If you are familiar with Node development, you might be wondering why 3rd party libraries are manually added under `vendor` rather using `npm i ...` command. The main reason is that deploying libraries in Rudderstack libraries [requires copy-pasting the code via the UI](https://www.rudderstack.com/docs/features/transformations/libraries/#adding-a-library). 

## Common tasks

Install or update dependencies using `npm install` or `npm i`.

Run tests using `npm test`
