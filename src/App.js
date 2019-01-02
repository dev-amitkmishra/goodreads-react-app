import React, {Component} from 'react';
import './App.css';
import Aux from './hoc/_aux';
import Search from './component/Search/Search';
import SearchResult from './component/SearchResult/SearchResult';
import Modal from './component/Modal/Modal';
import proxify from 'proxify-url';
import axios from 'axios';
import Overlay from './component/Overlay/Overlay';

class App extends Component {
    state = {
        searchText: '',
        allResults: [],
        currentBook: null,
        isDisplay: false,
        isDisplayLoader: false,
        isContentLoading: false
    }

    inputChangeHandler = (input) => {
        const searchText = input.target.value;
        this.setState({
            searchText: searchText
        });
    };

    buttonClickHandler = () => {
        const searchText = this.state.searchText;
        if(searchText.length === 0) {
            this.setState({allResults: [{'status': 'Nothing to search'}]});
            return null;
        }
        this.setState({isContentLoading: true});
        this.getData(searchText);
    }

    getData = (searchText) => {
        const url = axios.defaults.baseURL + '/search/index.xml?key=' + axios.defaults.apiKey +'&q=' + searchText;
        this
            .getDataFromGoodReadsApi(url)
            .then((resp) => {
                try {
                    let jsonData = resp.data.query.results.GoodreadsResponse.search.results.work;
                    const arr = Object
                        .keys(jsonData)
                        .map((key) => {
                            return [key, jsonData[key]];
                        });
                    this.setState({allResults: arr, isContentLoading: false});
                } catch (error) {
                    console.log(error);
                    this.setState({allResults: [{'status': 'No Response from API'}], isContentLoading: false});
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    clickHandler = (book) => {
        const url = axios.defaults.baseURL + '/book/show/' + book.best_book.id.content + '?key=' + axios.defaults.apiKey;
        this.setState({isDisplayLoader: true});
        this
            .getDataFromGoodReadsApi(url)
            .then((resp) => {
                let jsonData = resp.data.query.results.GoodreadsResponse.book;
                this.setState({currentBook: [jsonData], isDisplay: true, isDisplayLoader: false});
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getDataFromGoodReadsApi = (url) => {
        return new Promise((resolve, reject) => {
            let proxyUrl = proxify(url, {inputFormat: 'xml'});
            axios
                .get(proxyUrl)
                .then((resp) => {
                    resolve(resp);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                })
        })
    }

    modalCloseHandler = () => {
        this.setState({isDisplay: false})
    }

    render() {
        return (
            <Aux>
                <Overlay showLoader={this.state.isDisplayLoader}/>
                <Search buttonClick={this.buttonClickHandler} changed={(evt) => this.inputChangeHandler(evt)}/>
                <SearchResult allResults={this.state.allResults} clicked={this.clickHandler} contentLoading={this.state.isContentLoading}/>
                <Modal
                    show={this.state.isDisplay}
                    currentBook={this.state.currentBook}
                    modalClose={this.modalCloseHandler}/>
            </Aux>
        );
    }
}

export default App;
