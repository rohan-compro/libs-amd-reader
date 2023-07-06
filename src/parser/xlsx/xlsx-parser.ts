import * as xlsx from 'xlsx';
import { SheetNamesEnum } from '../../constants/sheet-names';
import { LearningObjectSheetColumnNames } from '../../constants/learning-object-sheet-column-names';
import schemaValidator from './utilities/schema-validator.util';
import AmdSchema from '../../schema/amd-schema';
import Lo from '../../model/lo';
import Amd from '../../model/amd';
import Screen from '../../model/screen';
import TransformError from '../../utilities/transform-error.util';
import ApplicationErrors from '../../utilities/application-errors';


export default class XlsxParser implements Base {
    public workbook: any;

    constructor() { }

    /**
     * Parse the excel file, validate sheet names and column names then create the AMD object
     * @param fileData 
     * @returns {Amd} Returns AMD object
     */

    public parse(fileData: any) {
        try {
            this.workbook = xlsx.read(fileData, { type: 'buffer' });

            // validate sheet names
            if (!this.validateSheetNames()) {
                throw new TransformError(ApplicationErrors.AMD_SHEET_NAMES_VALIDATION_FAILED);
            }

            // validate column names in learning object sheet
            if (!this.validateColumnNames(this.workbook.Sheets[SheetNamesEnum.LEARNING_OBJECT], LearningObjectSheetColumnNames)) {
                throw new TransformError(ApplicationErrors.LEARNING_OBJECT_SHEET_COLUMN_NAMES_VALIDATION_FAILED);
            }

            return this.parseLearningObjectSheet();
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Checks all required sheets are present in excel file or not
     * @returns Returns boolean value for whether all required sheets are present in excel file or not
     */
    public validateSheetNames() {
        return Object.values(SheetNamesEnum).every((knownSheetName) => this.workbook.SheetNames.find((availableSheet: string) => availableSheet?.trim() === knownSheetName?.trim()));
    }

    /**
     * Checks if all required column are present in the input sheet or not
     * @param sheet 
     * @param {string[]} knownColumnNames 
     * @returns Returns boolean value for whether all required column are present in the input sheet or not
     */
    public validateColumnNames(sheet: any, knownColumnNames: string[]) {
        if (!sheet || !knownColumnNames) return;

        //generate all column names of sheet
        const availableColumnNames: string[] = [];
        let range = xlsx.utils.decode_range(sheet['!ref']);
        for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
            let cellAddress = xlsx.utils.encode_cell({ r: 0, c: colNum });
            let cell = sheet[cellAddress];
            let cellValue = cell ? cell.v : null;
            availableColumnNames.push(cellValue);
        }

        return knownColumnNames.every((knownColName: string) => availableColumnNames.find((availColName) => knownColName?.trim() === availColName?.trim()));
    }

    /**
     * Iterate over Learning Object sheet and creates an AMD object
     * @returns {AMD} Returns an AMD object after parsing Learning Object sheet
     */
    public parseLearningObjectSheet() {
        const amd = new Amd();
        let lastLoArguments = [], screenArguments: any = [], screenArray = [];

        let learningObjectWorksheet = this.workbook.Sheets[SheetNamesEnum.LEARNING_OBJECT];

        // Extract the range of cells in the learningObjectWorksheet
        let range = xlsx.utils.decode_range(learningObjectWorksheet['!ref']);

        // Iterate over each row in the range
        for (let rowNum = 1; rowNum <= 8; rowNum++) {
            for (let colNum = range.s.c; colNum <= 23; colNum++) {
                let cellAddress = xlsx.utils.encode_cell({ r: rowNum, c: colNum });
                let cell = learningObjectWorksheet[cellAddress];
                let cellValue = cell ? cell.v : null;

                if (colNum == 0) {
                    // handle lo cell
                    if (cellValue) {
                        if (cellValue.toLocaleLowerCase().trim() == 'Signed off'.toLocaleLowerCase().trim() ||
                            cellValue.toLocaleLowerCase().trim() == 'End'.toLocaleLowerCase().trim()) {
                            // handle end / signed off cellValue
                            lastLoArguments[2] = screenArray;
                            lastLoArguments[3] = amd.learningObjects.length + 1;
                            amd.learningObjects.push(new (Lo as any)(...lastLoArguments));
                            screenArguments = [];
                            screenArray = [];
                            lastLoArguments = [];
                            break;
                        }
                        else {
                            // cellValue is first lo cellValue
                            lastLoArguments[0] = cellValue;
                        }
                    }
                }
                else if (colNum == 1) {
                    // handle lo title cellValue
                    if (cellValue) {
                        lastLoArguments[1] = cellValue;
                    }
                }
                else {
                    // handle new screen cellValue
                    if (colNum == 2 || colNum == 11) {
                        cellValue = parseInt(cellValue);
                    }

                    if (cellValue) {
                        screenArguments.push(cellValue);
                    }
                    else {
                        screenArguments.push('');
                    }
                }
            }
            // change the screen, push screen in lo
            if (screenArguments?.length > 0) {
                screenArray.push(new (Screen as any)(...screenArguments));
                screenArguments = [];
            }
        }



        return amd;
    }

    /**
     * Uses AJV library to validate schema of input object and throws error if validation fails
     * @param schema 
     * @param dataToValidate 
     * @param errorObj 
     */
    public validateSchema(schema: any, dataToValidate: any, errorObj: any) {
        const amdValidator = schemaValidator.getSchemaValidator(schema);
        const { valid, errorMsg } = amdValidator(dataToValidate);
        if (!valid) {
            throw new TransformError(errorObj, { message: errorMsg }, {
                info: {
                    score: dataToValidate
                }
            });
        }
    }
}
