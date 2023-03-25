import { Schema } from 'jsonschema';

/*
Class responsible for managing contracts.
*/
export class Contracts {
    /**
     * Create a new contracts instance.
     * 
     * @param {Boolean} allowUnregisteredEvents whether to allow unknown events or not.
     */
    constructor(allowUnregisteredEvents=true) {
        this.schemas = {};
        this.allowUnregisteredEvents = allowUnregisteredEvents;
    }

    async registerSchemaFromJSON(event, schema) {
        this.schemas[event] = new Schema(schema);
    }

    async registerSchemaFromURL(event, url) {
        const response = await fetch(url);
        this.schemas[event] = new Schema(response);
    }

    validateProperties(event) {
        const schema = this.schemas[event.event];
        if(schema) return schema.validate(event.properties);

        // If unregistered event, fallback. 
        return this.allowUnregisteredEvents;
    }
}

export async function transformBatch(events, metadata) {  // eslint-disable-line no-unused-vars
    // Replace following line with const contracts = new Contracts(false); if you want to consider unregistered events as invalid.
    const contracts = new Contracts(true);
    // Register event schemas here
    await contracts.registerSchemaFromURL("Add To Cart", "https://raw.githubusercontent.com/ifoukarakis/tests/main/product.json");
    await contracts.registerSchemaFromURL("User Registered", "https://raw.githubusercontent.com/ifoukarakis/tests/main/person.json");
    // End of event schema registration

    return events.filter(event => contracts.validateProperties(event))
}
