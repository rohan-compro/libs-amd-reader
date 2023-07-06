import ScreenSchema from './screen-shema';

export default {
    type: 'object',
    properties: {
        lo: { type: 'string' },
        loTitle: { type: 'string' },
        screen: {
            "type": "array",
            "items": ScreenSchema
        },
        loNumber: { type: 'number' },
    },
    required: [
        'lo',
        'loTitle',
        'screen',
        'loNumber'
    ],
    errorMessage: {
        properties: {
            lo: 'Value of lo should be a string',
            loTitle: 'Value of loTitle should be a string',
            screen: 'Value of screen should be an array of screens',
            loNumber: 'Value of loNumber should be a number',
        },
        required: {
            lo: 'Missing required parameter: lo',
            loTitle: 'Missing required parameter: loTitle',
            screen: 'Missing required parameter: screen',
            loNumber: 'Missing required parameter: loNumber',
        }
    }
};