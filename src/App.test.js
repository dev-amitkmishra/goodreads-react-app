import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import Search from './component/Search/Search';

Enzyme.configure({adapter: new Adapter()});
axios.defaults.baseURL = 'https://www.goodreads.com';
axios.defaults.apiKey = 'HW9oK1OCdzb6ayaoLDwRw';
axios.defaults.apiSecret = 'arTgJgEhlHHaZwySJx8dp5pez4e69EdHhNJO6D9lo';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe("AppComponent", () => {
    it("should have app component", () => {
        const wrapper = shallow(<App/>);
    });
});

describe("SearchComponent", () => {
    it("should have search component", () => {
        const wrapper = shallow(<Search/>);
    });
});

describe("GoodReadsResponse", () => {
    it('should get response from goodreads API', () => {
      console.log(axios.defaults.baseURL);
        const url = 'https://cors-anywhere.herokuapp.com/' + axios.defaults.baseURL + '/search/index.xml?key=' + axios.defaults.apiKey + '&q=react';
        const app = new App();
        return app.getDataFromGoodReadsApi(url).then((data) => {
          expect(typeof data).toBe('object');
        })
    });
});