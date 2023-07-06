import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);

/**
 * Class for validating Json Schema
 */
class SchemaValidator {
  /**
   * This returns a function to validate the params from schema using ajv module.
   * @param {Object} schema
   */
  static getSchemaValidator(schema: any) {
    const validate: any = ajv.compile(schema);
    return (data: any) => {
      const valid = validate(data);
      let errorMsg = null;
      if (!valid) {
        errorMsg = validate.errors.map((error: any) => error.message).join('\n');
      }
      return {
        valid,
        errorMsg
      };
    };
  }
}

export default SchemaValidator;