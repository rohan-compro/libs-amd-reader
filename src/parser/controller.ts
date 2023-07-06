import ParserFactory from "./parser-factory";
import AmdSchema from "../schema/amd-schema";
import ApplicationErrors from "../utilities/application-errors";

// Expose public APIs
export default class AmdReaderController {

    constructor() { }


    /**
     * Parse the excel file using appropriate library and returns parsed data
     * @param file 
     * @param config 
     * @returns Returns parsed data
     */
    static parseAmd(file: any, config: any = {}) {
        try {
            const factory = new ParserFactory();
            const parser = factory.create(config.parserType);

            const parsedData = parser.parse(file);
            parser.validateSchema(AmdSchema, parsedData, ApplicationErrors.LEARNING_OBJECT_SHEET_VALIDATION_FAILED);

            return parsedData;
        }
        catch (error) {
            throw error;
        }

        // model = parser.parse(file)

        // validator.validate(model); // ajv - declarative

        // throw exception if not valid 
        // exception - class type 
    }
}
