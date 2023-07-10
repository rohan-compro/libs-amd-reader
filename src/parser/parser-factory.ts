import XlsxParser from './xlsx/xlsx-parser';

export default class ParserFactory {
    create(parserType: string | undefined) {
        switch (parserType) {
            default:
                return new XlsxParser();
        }
    }
}
