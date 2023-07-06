import Amd from "../model/amd"

interface errorObjectInterface {
  message: string,
  code: string
}

interface optionsInterface {
  info: {
    score: Amd
  }
}

export default class TransformError extends Error {
  /**
     * Constructor to inititialize the custom errors
     * @param {object} errorObject
     * @param {object} originalError
     */

  public name: string;
  public originalError: any;
  public errorCode: string;
  public errorInfo: any;

  constructor(errorObject: errorObjectInterface, originalError?: any, options?: optionsInterface) {
    super(errorObject.message);
    this.name = this.constructor.name;

    if (originalError) {
      this.originalError = {
        message: originalError.message,
        stack: originalError.stack,
        ...originalError
      };
    }
    this.errorCode = errorObject.code;
    this.errorInfo = options && options.info;
  }
}