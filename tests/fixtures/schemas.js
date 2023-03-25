export const productSchema = {
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
            "pattern": "^(0|([1-9]+[0-9]*))(\.[0-9]{1,2})?$",
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