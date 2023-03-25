import { validBook, invalidBook } from './fixtures/book';
import  {productSchema } from './fixtures/schemas';
import { Schema } from 'jsonschema';
import { validateProperties, loadSchemaFromJSON, loadSchemaFromURL } from 'validation';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
  })
);

test('does not filter valid event when validating properties', async () => {
    // Price property is in right format.
    const schema = new Schema(productSchema);
    const result = await validateProperties(validBook, schema);
    expect(result).toBe(validBook);
});

test('does filter invalid event when validating properties', async () => {
    // Price property is in invalid format.
    const schema = new Schema(productSchema);
    const result = await validateProperties(invalidBook, schema);
    expect(result).toBeUndefined();
});

test('should successfuly load schema from object', () => {
    const result = loadSchemaFromJSON(productSchema);
    expect(result.schema).toBe(productSchema);
  });

  test('should successfuly load schema from URL', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve(productSchema));
    const result = await loadSchemaFromURL('https://www.example.com/schema.json');
    expect(result.schema).toBe(productSchema);
  });