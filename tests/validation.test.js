import { validBook, invalidBook } from './fixtures/book';
import {defaultEvent } from './fixtures/default';
import  {productSchema, personSchema } from './fixtures/schemas';
import { Contracts } from 'validation';

describe('Contracts', () => {

    global.fetch = jest.fn(() => Promise.resolve(productSchema));

    test('does not filter valid event when validating properties', async () => {
        // Price property is in right format.
        const contracts = new Contracts();
        contracts.registerSchemaFromJSON('Add To Cart', productSchema);
        const result = contracts.validateProperties(validBook);
        expect(result).toBe(true);
    });

    test('does filter invalid event when validating properties', async () => {
        // Price property is in invalid format.
        const contracts = new Contracts();
        contracts.registerSchemaFromJSON('Add To Cart', productSchema);
        const result = contracts.validateProperties(invalidBook);
        expect(result).toBe(false);
    });

    test('does consider valid event when no schema is registered', async () => {
        const contracts = new Contracts(true);
        contracts.registerSchemaFromJSON('Add To Cart', productSchema);
        const result = contracts.validateProperties(defaultEvent);
        expect(result).toBe(true);
    });

    test('does consider valid event when no schema is registered', async () => {
        const contracts = new Contracts(false);
        contracts.registerSchemaFromJSON('Add To Cart', productSchema);
        const result = contracts.validateProperties(defaultEvent);
        expect(result).toBe(false);
    });

    test('should successfuly load schema from object', () => {
        const contracts = new Contracts();
        contracts.registerSchemaFromJSON('Add To Cart', productSchema);
        expect(contracts.schemas['Add To Cart'].schema).toEqual(productSchema);
    });

    test('should successfuly load multiple schemas from URLs', async () => {
        const contracts = new Contracts();
        fetch.mockImplementationOnce(() => Promise.resolve(productSchema));
        await contracts.registerSchemaFromURL('Add To Cart', 'https://www.example.com/product.json');
        fetch.mockImplementationOnce(() => Promise.resolve(personSchema));
        await contracts.registerSchemaFromURL('User Registered', 'https://www.example.com/person.json');
        expect(contracts.schemas['Add To Cart'].schema).toEqual(productSchema);
        expect(contracts.schemas['User Registered'].schema).toEqual(personSchema);
    });
});
