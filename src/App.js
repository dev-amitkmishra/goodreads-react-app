import React, {Component} from 'react';
import './App.css';
import Aux from './hoc/_aux';
import Search from './Component/Search/Search';
import SearchResult from './Component/SearchResult/SearchResult';
import Modal from './Component/Modal/Modal';
import proxify from 'proxify-url';
import axios from 'axios';

// key: F3Bik4kyfevhEVa9X2Y9dQ secret: WBCoe9yr3o0xiKpDZGy1l7PjGx6PqoapWotLuAc
class App extends Component {
    state = {
        allResults: [],
        currentBook: null,
        isDisplay: false,
        isDisplayLoader: false
    }
    changeHandler = (input) => {
        const searchText = input.target.value;
        if (searchText.length >= 3) {
            this.getData(searchText);
        }
    }

    getData = (searchText) => {
        this
            .getDataFromGoodReadsApi('https://www.goodreads.com/search/index.xml?key=F3Bik4kyfevhEVa9X2Y9dQ&q=' + searchText)
            .then((resp) => {
                let jsonData = resp.data.query.results.GoodreadsResponse.search.results.work;
                const arr = Object
                    .keys(jsonData)
                    .map((key) => {
                        return [key, jsonData[key]];
                    });
                this.setState({allResults: arr})
            })
            .catch((err) => {
                console.log(err);
            })
    }

    clickHandler = (book) => {
        this.setState({
            isDisplayLoader: true
        });
        this
            .getDataFromGoodReadsApi('https://www.goodreads.com/book/show/' + book.best_book.id.content + '?key=F3Bik4kyfevhEVa9X2Y9dQ')
            .then((resp) => {
                let jsonData = resp.data.query.results.GoodreadsResponse.book;
                this.setState({
                    currentBook: [jsonData],
                    isDisplay: true,
                    isDisplayLoader: false
                });
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
                <Search changed={(evt) => this.changeHandler(evt)}/>
                <SearchResult allResults={this.state.allResults} clicked={this.clickHandler}/>
                <Modal
                    show={this.state.isDisplay}
                    currentBook={this.state.currentBook}
                    modalClose={this.modalCloseHandler}/>
            </Aux>
        );
    }
}

export default App;
