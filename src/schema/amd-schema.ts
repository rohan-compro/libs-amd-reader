import LoSchema from './lo-schema';

export default {
    type: 'object',
    properties: {
        lo: {
            "type": "array",
            "items": LoSchema
        }
    },
};