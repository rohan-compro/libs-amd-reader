const ScreenSchema = {
    type: 'object',
    properties: {
        screenNumber: { type: 'number' },
        activityTypeName: { type: 'string' },
        layoutInfo: { type: 'string' },
        rubric: { type: 'string' },
        contents: { type: 'string' },
        supplementArea: { type: 'string' },
        attachmentArea1: { type: 'string' },
        attachmentArea2: { type: 'string' },
        mediaInHeader: { type: 'string' },
        mediaInHeaderScreenInfo: { type: 'string' },
        feedBackBand1Correct: { type: 'string' },
        feedBackBand2InCorrect: { type: 'string' },
        feedBackThreshold: { type: 'string' },
        loGlobalOptions: { type: 'string' },
        loScreenSpecificOptions: { type: 'string' },
        additionalNotes: { type: 'string' },
        r1BuildComments: { type: 'string' },
        r1CheckiComments: { type: 'string' },
        r2BuildComments: { type: 'string' },
        r1CheckComments: { type: 'string' },
        rcBuildComments: { type: 'string' },
        rcCheckComments: { type: 'string' },
    },
    required: [
        'screenNumber',
        'activityTypeName',
        'layoutInfo',
        'rubric',
        'contents',
        'supplementArea',
        'attachmentArea1',
        'attachmentArea2',
        'mediaInHeader',
        'mediaInHeaderScreenInfo',
        'feedBackBand1Correct',
        'feedBackBand2InCorrect',
        'feedBackThreshold',
        'loGlobalOptions',
        'loScreenSpecificOptions',
        'additionalNotes',
        'r1BuildComments',
        'r1CheckiComments',
        'r2BuildComments',
        'r1CheckComments',
        'rcBuildComments',
        'rcCheckComments',
    ],
    errorMessage: {
        properties: {
            screenNumber: 'Value of screenNumber should be a number',
            activityTypeName: 'Value of activityTypeName should be a string',
            layoutInfo: 'Value of layoutInfo should be a string',
            rubric: 'Value of rubric should be a string',
            contents: 'Value of contents should be a string',
            supplementArea: 'Value of supplementArea should be a string',
            attachmentArea1: 'Value of attachmentArea1 should be a string',
            attachmentArea2: 'Value of attachmentArea2 should be a string',
            mediaInHeader: 'Value of mediaInHeader should be a string',
            mediaInHeaderScreenInfo: 'Value of mediaInHeaderScreenInfo should be a string',
            feedBackBand1Correct: 'Value of feedBackBand1Correct should be a string',
            feedBackBand2InCorrect: 'Value of feedBackBand2InCorrect should be a string',
            feedBackThreshold: 'Value of feedBackThreshold should be a string',
            loGlobalOptions: 'Value of loGlobalOptions should be a string',
            loScreenSpecificOptions: 'Value of loScreenSpecificOptions should be a string',
            additionalNotes: 'Value of additionalNotes should be a string',
            r1BuildComments: 'Value of r1BuildComments should be a string',
            r1CheckiComments: 'Value of r1CheckiComments should be a string',
            r2BuildComments: 'Value of r2BuildComments should be a string',
            r1CheckComments: 'Value of r1CheckComments should be a string',
            rcBuildComments: 'Value of rcBuildComments should be a string',
            rcCheckComments: 'Value of rcCheckComments should be a string',
        },
        required: {
            screenNumber: 'Missing required parameter: screenNumber',
            activityTypeName: 'Missing required parameter: activityTypeName',
            layoutInfo: 'Missing required parameter: layoutInfo',
            rubric: 'Missing required parameter: rubric',
            contents: 'Missing required parameter: contents',
            supplementArea: 'Missing required parameter: supplementArea',
            attachmentArea1: 'Missing required parameter: attachmentArea1',
            attachmentArea2: 'Missing required parameter: attachmentArea2',
            mediaInHeader: 'Missing required parameter: mediaInHeader',
            mediaInHeaderScreenInfo: 'Missing required parameter: mediaInHeaderScreenInfo',
            feedBackBand1Correct: 'Missing required parameter: feedBackBand1Correct',
            feedBackBand2InCorrect: 'Missing required parameter: feedBackBand2InCorrect',
            feedBackThreshold: 'Missing required parameter: feedBackThreshold',
            loGlobalOptions: 'Missing required parameter: loGlobalOptions',
            loScreenSpecificOptions: 'Missing required parameter: loScreenSpecificOptions',
            additionalNotes: 'Missing required parameter: additionalNotes',
            r1BuildComments: 'Missing required parameter: r1BuildComments',
            r1CheckiComments: 'Missing required parameter: r1CheckiComments',
            r2BuildComments: 'Missing required parameter: r2BuildComments',
            r1CheckComments: 'Missing required parameter: r1CheckComments',
            rcBuildComments: 'Missing required parameter: rcBuildComments',
            rcCheckComments: 'Missing required parameter: rcCheckComments',
        }
    }
};

const LoSchema = {
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

const ProductInfoSchema = {
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

export default {
    type: 'object',
    properties: {
        learningObjects: {
            "type": "array",
            "items": LoSchema
        },
        productInfo: ProductInfoSchema
    },
};