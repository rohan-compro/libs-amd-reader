import * as xlsx from 'xlsx';


export default class CommonUtil {

    /**
     * Checks all required sheets are present in excel file or not
     * @returns Returns boolean value for whether all required sheets are present in excel file or not
     */
    static validateSheetNames(requiredSheetNames: string[], availableSheetNames: string[]) {
        return Object.values(requiredSheetNames).every((knownSheetName) => availableSheetNames.find((availableSheet: string) => availableSheet?.trim() === knownSheetName?.trim()));
    }

    /**
     * Checks if all required column are present in the input sheet or not
     * @param sheet 
     * @param {string[]} knownColumnNames 
     * @returns Returns boolean value for whether all required column are present in the input sheet or not
     */
    static validateSheetColumns(sheet: any, knownColumnNames: string[]) {
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
}