import ParserFactory from "./parser-factory";
import ApplicationCommonUtil from "../utilities/application-common.util";

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

            const parsedAmdData = parser.parse(file);
            ApplicationCommonUtil.validateAmdParsedData(parsedAmdData);

            return parsedAmdData;
        }
        catch (error) {
            throw error;
        }
    }
}
