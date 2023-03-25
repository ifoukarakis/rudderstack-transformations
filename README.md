# Sample Rudderstack Transformations

Contains list of rudderstack transformations. Offers an environment that allows unit testing individual transformations.

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

# Roadmap

- [ ] Automate upload of libraries and validations.
- [ ] Separate transformation from library authoring.
- [ ] Python version.