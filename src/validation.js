import { Schema } from './jsonschema';

export async function validateProperties(event, schema) {
    if(!schema.validate(event.properties)) return;
    return event
}


export async function transformEvent(event, metadata) {
    const res = await fetch('https://raw.githubusercontent.com/ifoukarakis/tests/main/schema.json');
    const schema = new Schema(res);
    if(!schema.validate(event.properties)) return;
    return event;
}