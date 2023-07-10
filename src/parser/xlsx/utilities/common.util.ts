import * as xlsx from 'xlsx';


export default class CommonUtil {

    /**
     * Checks if all required sheets are present in excel file or not
     * @param validSheetNames 
     * @param availableSheetNames 
     * @returns Returns boolean value for whether all required sheets are present in excel file or not
     */
    static validateSheetNames(validSheetNames: string[], availableSheetNames: string[]) {
        if (!(validSheetNames?.length > 0 && availableSheetNames?.length > 0)) return;

        validSheetNames = validSheetNames.map(str => str.trim());
        availableSheetNames = availableSheetNames.map(str => str.trim());

        return validSheetNames.every((validSheetName: string) => availableSheetNames.includes(validSheetName));
    }

    /**
     * Checks if all required column are present in available columns or not
     * @param validColumnNames 
     * @param availableColumnNames 
     * @returns Returns boolean value for whether all required column are present in available columns or not
     */
    static validateSheetColumns(validColumnNames: string[], availableColumnNames: string[]) {
        if (!(validColumnNames?.length > 0 && availableColumnNames?.length > 0)) return;

        validColumnNames = validColumnNames.map(str => str.trim());
        availableColumnNames = availableColumnNames.map(str => str.trim());

        return validColumnNames.every((validSheetName: string) => availableColumnNames.includes(validSheetName));
    }
}