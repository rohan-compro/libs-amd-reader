export default class Screen {
    constructor(
        public screenNumber: number,
        public activityTypeName: string,
        public layoutInfo: string,
        public rubric: string,
        public contents: string,
        public supplementArea: string,
        public attachmentArea1: string,
        public attachmentArea2: string,
        public mediaInHeader: string,
        public mediaInHeaderScreenInfo: number,
        public feedBackBand1Correct: string,
        public feedBackBand2InCorrect: string,
        public feedBackThreshold: string,
        public loGlobalOptions: string,
        public loScreenSpecificOptions: string,
        public additionalNotes: string,
        public r1BuildComments: string,
        public r1CheckiComments: string,
        public r2BuildComments: string,
        public r1CheckComments: string,
        public rcBuildComments: string,
        public rcCheckComments: string
    ) { }
}