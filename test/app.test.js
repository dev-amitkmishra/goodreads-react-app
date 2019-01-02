import {inputChangeHandler, getDataFromGoodReadsApi} from '../src/App';

describe('inputChangeHandler', () => {
    it('should be set to state', () => {
        expect(inputChangeHandler('react')).toMatchSnapshot();
    });
})

describe('getDataFromGoodReadsApi', () => {
    it('should get the response', () => {
        const url = axios.defaults.baseURL + '/search/index.xml?key=' + axios.defaults.apiKey + '&q=' + searchText;
        expect(getDataFromGoodReadsApi(url)).toContain(json);
    });
})
