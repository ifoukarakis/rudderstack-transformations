# Developing

This document provides guidelines for developing new transformations. 

- [Developing](#developing)
  - [Requirements](#requirements)
  - [Project structure](#project-structure)
  - [Project structure](#project-structure-1)
  - [npm tasks](#npm-tasks)
  - [Common operations](#common-operations)
    - [Adding a new transformation](#adding-a-new-transformation)
    - [Add a new library](#add-a-new-library)

## <a name='Requirements'></a>Requirements

- Node and npm installed (currently tested using node 14.x).

## <a name='Projectdirectories'></a>Project structure

## Project structure

```
├── docs                   <-- Documentation
├── package-lock.json
├── package.json           <-- Project setup & dependencies
├── README.md
├── src                    <-- Source code for transformations
│  └── validation.js
├── tests                  <-- Tests
│  ├── fixtures            <-- Test fixtures (i.e. sample rudderstack events)
│  │  ├── book.js
│  │  ├── default.js
│  │  └── schemas.js
│  └── validation.test.js  <-- Test vof validation.js
└── vendor                 <-- Libraries from 3rd parties to be uploaded as libraries in Rudderstack UI.
   └── jsonschema.js       
```

This project is a typical npm project. The main directories are:

- `src` - contains transformation and custom library code.
- `tests` - contains tests for transformations and libraries.
- `vendor` - contains libraries from 3rd parties.

> If you are familiar with Node development, you might be wondering why 3rd party libraries are manually added under `vendor` rather using `npm i ...` command. The main reason is that deploying libraries in Rudderstack libraries [requires copy-pasting the code via the UI](https://www.rudderstack.com/docs/features/transformations/libraries/#adding-a-library). 

## <a name='npmtasks'></a>npm tasks

Install or update dependencies using `npm install` or `npm i`.

Run tests using `npm test`.

Check code for linting errors by running `npm run lint`.

## <a name='Commonoperations'></a>Common operations

### <a name='Addinganewtransformation'></a>Adding a new transformation

1. Create a new file under `src`.
2. Add the transformation function, as well as other functions that might be required by the transformation function.

### <a name='Addanewlibrary'></a>Add a new library

Just add the file under `vendor/`. The library will be free to use in your transformations.
