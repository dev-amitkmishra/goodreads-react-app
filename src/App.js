import React, {Component} from 'react';
import './App.css';
import Aux from './hoc/_aux';
import Search from './component/Search/Search';
import SearchResult from './component/SearchResult/SearchResult';
import proxify from 'proxify-url';
import axios from 'axios';

// key: F3Bik4kyfevhEVa9X2Y9dQ secret: WBCoe9yr3o0xiKpDZGy1l7PjGx6PqoapWotLuAc
class App extends Component {
    state = {
        allResults: []
    }
    changeHandler = (input) => {
        const searchText = input.target.value;
        this.getData(searchText);
    }

    getData = (searchText) => {
        const url = 'https://www.goodreads.com/search/index.xml?key=F3Bik4kyfevhEVa9X2Y9dQ&q=react';
        let proxyUrl = proxify(url, {inputFormat: 'xml'});
        axios
            .get(proxyUrl)
            .then((resp) => {
                let jsonData = resp.data.query.results.GoodreadsResponse.search.results.work;
                debugger;
                const arr = Object
                    .keys(jsonData)
                    .map((key) => {
                        return [key, jsonData[key].average_rating];
                    });
                this.setState({allResults: arr})
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <Aux>
                <div>This app is created by Amit miShra</div>
                <Search changed={(evt) => this.changeHandler(evt)}/>
                <SearchResult allResults={this.state.allResults}/>
            </Aux>
        );
    }
}

export default App;
