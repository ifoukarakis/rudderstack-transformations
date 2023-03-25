import { validBook, invalidBook } from './fixtures/book';
import  {productSchema } from './fixtures/schemas';
import { Schema } from '../src/jsonschema';
import { validateProperties } from '../src/validation';

test('does not filter valid event when validating properties', async () => {
    const schema = new Schema(productSchema);
    const result = await validateProperties(validBook, schema);
    expect(result).toBe(validBook);
});

test('does filter invalid event when validating properties', async () => {
    const schema = new Schema(productSchema);
    const result = await validateProperties(invalidBook, schema);
    expect(result).toBeUndefined();
});