const { parseAmd } = require('./lib/index.js');
const fs = require('fs');
const path = require('path');

const excelFilePath = path.join(path.resolve(), 'resource', `KB_BE_L5_Avallain_Mapping_Document_ZHG.xlsm`);
const fileData = fs.readFileSync(excelFilePath);

try {
    const response = parseAmd(fileData);
    console.log(response);
}
catch (error) {
    console.log(error);
}