import TransformError from "./transform-error.util";
import SchemaValidator from "../parser/xlsx/utilities/schema-validator.util";
import ApplicationErrors from "./application-errors";
import AmdSchema from "../schema/amd-schema";
import Amd from "../model/amd";

export default class ApplicationCommonUtil {

    /**
     * Uses AJV library to validate schema of input object and throws error if validation fails
     * @param parsedAmdData 
     */
    static validateAmdParsedData(parsedAmdData: Amd) {
        const amdValidator = SchemaValidator.getSchemaValidator(AmdSchema);
        const { valid, errorMsg } = amdValidator(parsedAmdData);
        if (!valid) {
            throw new TransformError(ApplicationErrors.AMD_VALIDATION_FAILED, { message: errorMsg }, {
                info: {
                    score: parsedAmdData
                }
            });
        }
    }
}