import Screen from './screen';

export default class Lo {
    constructor(
        public lo: string,
        public loTitle: string,
        public screen: Screen[],
        public loNumber: number
    ) { }
}