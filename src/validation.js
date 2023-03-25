import { Schema } from 'jsonschema';


export function loadSchemaFromJSON(value) {
    return new Schema(value);
}

export async function loadSchemaFromURL(url) {
    const res = await fetch(url);
    return new Schema(res);
}

export async function validateProperties(event, schema) {
    if(!schema.validate(event.properties)) return;
    return event;
}

export async function transformEvent(event, metadata) {
    const res = await fetch('https://raw.githubusercontent.com/ifoukarakis/tests/main/schema.json');
    const schema = new Schema(res);
    if(!schema.validate(event.properties)) return;
    return event;
}
