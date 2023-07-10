import * as xlsx from 'xlsx';
import { SheetNamesEnum, validSheetNames } from '../../constants/sheet-names';
import { learningObjectsSheetColumns } from '../../constants/learning-objects-sheet-columns';
import Lo from '../../model/lo';
import Amd from '../../model/amd';
import Screen from '../../model/screen';
import ProductInfo from '../../model/product-info';
import TransformError from '../../utilities/transform-error.util';
import ApplicationErrors from '../../utilities/application-errors';
import CommonUtil from './utilities/common.util';

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
            if (!CommonUtil.validateSheetNames(validSheetNames, this.workbook.SheetNames)) {
                throw new TransformError(ApplicationErrors.AMD_SHEET_NAMES_VALIDATION_FAILED);
            }

            //generate all column names of learning object worksheet
            const learningObjectWorksheet = this.workbook.Sheets[SheetNamesEnum.LEARNING_OBJECTS];
            const availableColumnNames: string[] = [];
            let range = xlsx.utils.decode_range(learningObjectWorksheet['!ref']);

            for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
                let cellAddress = xlsx.utils.encode_cell({ r: 0, c: colNum });
                let cell = learningObjectWorksheet[cellAddress];
                let cellValue = cell ? cell.v : null;
                availableColumnNames.push(cellValue);
            }

            // validate column names in learning object sheet
            if (!CommonUtil.validateSheetColumns(learningObjectsSheetColumns, availableColumnNames)) {
                throw new TransformError(ApplicationErrors.LEARNING_OBJECT_SHEET_COLUMN_NAMES_VALIDATION_FAILED);
            }

            const amdData: [Lo[], ProductInfo] = [this.parseLearningObjectSheet(), this.parseProductInfoSheet()];
            return new Amd(...amdData);
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Iterate over Learning Object sheet and creates an AMD object
     * @returns {AMD} Returns an AMD object after parsing Learning Object sheet
     */
    public parseLearningObjectSheet() {
        let learningObjects: Lo[] = [];
        let lastLoArguments = [], screenArguments: any = [], screenArray = [];

        let learningObjectWorksheet = this.workbook.Sheets[SheetNamesEnum.LEARNING_OBJECTS];

        // Extract the range of cells in the learningObjectWorksheet
        let range = xlsx.utils.decode_range(learningObjectWorksheet['!ref']);

        // Iterate over each row in the range
        for (let rowNum = 1; rowNum <= range.e.r; rowNum++) {
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
                            lastLoArguments[3] = learningObjects.length + 1;
                            learningObjects.push(new (Lo as any)(...lastLoArguments));
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
                    let value: string | number = '';

                    if (colNum == 2 && cellValue) {
                        value = parseInt(cellValue);
                    }
                    else if (colNum == 11 && cellValue) {
                        value = cellValue.toString();
                    }
                    else if (cellValue) {
                        value = cellValue;
                    }

                    screenArguments.push(value);
                }
            }
            // change the screen, push screen in lo
            if (screenArguments?.length > 0) {
                screenArray.push(new (Screen as any)(...screenArguments));
                screenArguments = [];
            }
        }
        return learningObjects;
    }

    public parseProductInfoSheet() {
        let productInfoData = [];
        let productInfoWorksheet = this.workbook.Sheets[SheetNamesEnum.PRODUCT_INFO];

        // Iterate over each row in the range
        for (let rowNum = 1; rowNum <= 4; rowNum++) {
            let cellAddress = xlsx.utils.encode_cell({ r: rowNum, c: 1 });
            let cell = productInfoWorksheet[cellAddress];
            let cellValue = cell ? cell.v : null;
            if (rowNum > 1 && cellValue) {
                cellValue = parseInt(cellValue);
            }
            productInfoData.push(cellValue);
        }

        return new (ProductInfo as any)(...productInfoData);
    }
}
