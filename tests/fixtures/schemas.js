export const productSchema = {
    '$id': 'https://example.com/person.schema.json',
    '$schema': 'https://json-schema.org/draft/2020-12/schema',
    'title': 'Product',
    'type': 'object',
    'properties': {
        'product_id': {
            'type': 'string',
            'description': 'The product\'s ID.'
        },
        'name': {
            'type': 'string',
            'description': 'The person\'s last name.'
        },
        'price': {
            'type': 'string',
            'pattern': '^(0|([1-9]+[0-9]*))(\.[0-9]{1,2})?$',  // eslint-disable-line no-useless-escape
            'minLength': 1,
            'description': 'The product\'s price.',
            'examples': [
                '0',
                '0.00',
                '0.05',
                '19.95',
                '255.5',
                '120000'
            ]
        }
    },
    'required': ['product_id', 'name', 'price']
};

export const personSchema = {
    '$id': 'https://example.com/person.schema.json',
    '$schema': 'https://json-schema.org/draft/2020-12/schema',
    'title': 'Person',
    'type': 'object',
    'properties': {
        'firstName': {
            'type': 'string',
            'description': 'The person\'s first name.'
        },
        'lastName': {
            'type': 'string',
            'description': 'The person\'s last name.'
        },
        'age': {
            'description': 'Age in years which must be equal to or greater than zero.',
            'type': 'integer',
            'minimum': 0
        }
    },
    'required': ['firstName', 'lastName']
};
  