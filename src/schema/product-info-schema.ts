export default {
    type: 'object',
    properties: {
        projectName: { type: 'string' },
        designPack: { type: 'string' },
        numberOfUnits: { type: 'number' },
        screensPerUnit: { type: 'number' },
    },
    required: [
        'projectName',
        'designPack',
        'numberOfUnits',
        'screensPerUnit'
    ],
    errorMessage: {
        properties: {
            projectName: 'Value of projectName should be a string',
            designPack: 'Value of designPack should be a string',
            numberOfUnits: 'Value of numberOfUnits should be a number',
            screensPerUnit: 'Value of screensPerUnit should be a number',
        },
        required: {
            projectName: 'Missing required parameter: projectName',
            designPack: 'Missing required parameter: designPack',
            numberOfUnits: 'Missing required parameter: numberOfUnits',
            screensPerUnit: 'Missing required parameter: screensPerUnit'
        }
    }
};