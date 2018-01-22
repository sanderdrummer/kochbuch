import {dateService} from './dateService';

describe('dateService', () => {

    it('should generate a date string', () =>  {

        const date = new Date(1516613085815);
        const expected = '2018-01-22';
        const resultString = dateService.getDateString(date);

        expect(resultString).toEqual(expected);
    });
    it('should return empty string on invalid usage', () =>  {

        const date = null;
        const expected = '';
        const resultString = dateService.getDateString(date);

        expect(resultString).toEqual(expected);
    });

    it('should generate a month year url', () => {

        const date = new Date(1516613085815);
        const expected = '2018/01/';
        const resultString = dateService.getMonthYearUrl(date);

        expect(resultString).toEqual(expected);
    });

    it('should return empty string on invalid url parsing', () =>  {

        const date = null;
        const expected = '';
        const resultString = dateService.getDateString(date);

        expect(resultString).toEqual(expected);
    });

});