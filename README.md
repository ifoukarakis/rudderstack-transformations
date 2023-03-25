[![Tests](https://github.com/ifoukarakis/rudderstack-transformations/actions/workflows/test.yml/badge.svg)](https://github.com/ifoukarakis/rudderstack-transformations/actions/workflows/test.yml)

# Sample Rudderstack Transformations

Contains list of rudderstack transformations. Offers an environment that allows unit testing individual transformations.

# Transformations

## Validation ([source](src/validation.js))

<details>
<summary>Asserts the event's properties follow the constraints of a JSON schema.</summary> 

One of the most common challenges when gathering data is agreement between all involved stakeholders on the format, structure, and semantics of data. One popular solution is to apply "data contracts" to ensure that different systems or components communicate effectively and accurately. The `validation` transformation uses JSON Schema specification to assert that event's [properties](https://www.rudderstack.com/docs/event-spec/standard-events/track/#properties) obey the agreed constraints.

Events that fail to comply with the agreed constraint can either be dropped or re-routed to a different destination for debugging.
</details>

<details>
<summary>Configuration</summary> 

**Drop events in case there's no schema registered**

Simply add `false` as an argument to `Contracts` constructor:

`const contracts = new Contracts(true);`

**Register schemas for event**

Schemas can be loaded either from URLs or from JSON objects. For example, the following validation function registers two schemas for two events from two different URLs:
```js
export async function transformBatch(events, metadata) {
    // Create a registry for schemas
    const contracts = new Contracts();
    // Register schema for event "Add To Cart" from a URL
    await contracts.registerSchemaFromURL("Add To Cart", "https://raw.githubusercontent.com/ifoukarakis/tests/main/product.json");
    // Register a different schema for event "User Registered" from a URL
    await contracts.registerSchemaFromURL("User Registered", "https://raw.githubusercontent.com/ifoukarakis/tests/main/person.json");
    // Register more events here.

    return events.filter(event => contracts.validateProperties(event))
}
```

In the following example, a single schema is registered from a JSON Object:

```js
const productSchema = {
    "$id": "https://example.com/person.schema.json",
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "Product",
    "type": "object",
    "properties": {
        "product_id": {
            "type": "string",
            "description": "The product's ID."
        },
        "name": {
            "type": "string",
            "description": "The person's last name."
        },
        "price": {
            "type": "string",
            "pattern": "^(0|([1-9]+[0-9]*))(\\.[0-9]{1,2})?$",
            "minLength": 1,
            "description": "The product's price.",
            "examples": [
                "0",
                "0.00",
                "0.05",
                "19.95",
                "255.5",
                "120000"
            ]
        }
    },
    "required": ["product_id", "name", "price"]
}

export async function transformBatch(events, metadata) {
    const contracts = new Contracts(true);
    await contracts.registerSchemaFromJSON("Add To Cart", productSchema);

    // Register more events here.
    return events.filter(event => contracts.validateProperties(event))
}
```

> Note: embedding the JSON schemas on the transformation's code should help improve performance, but might reduce readability of the code.

</details>

<details>
<summary>Deployment</summary>

1. Add the contents of [jsonschema.js](vendor/jsonschema.js) in a library ([instructions](https://www.rudderstack.com/docs/features/transformations/libraries/)). **IMPORTANT:** Make sure that the name of the library is `jsonschema`.
2. Add the contents of [validation.js](src/validation.js) to a new Javascript validation ([instructions](https://www.rudderstack.com/docs/features/transformations/#adding-a-transformation)).
3. Make sure that the configuration matches your expectations.
4. Connect the new transformation to the proper destination ([instructions](https://www.rudderstack.com/docs/features/transformations/#connecting-transformation-to-a-destination)).
</details>

<details>
<summary>Examples</summary>
</details>

<details>
<summary>Notes/Troubleshooting</summary>
- Only `JSONSchema draft-2020-12` is currently supported.
- Make sure that `await` is before the call to `contracts.registerSchemaFrom...`.
</details>



# Roadmap

- [ ] Automate upload of libraries and validations.
- [ ] Separate transformation from library authoring.
- [ ] Python version.