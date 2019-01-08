import React, {Component} from 'react';
import './App.css';
import Aux from './hoc/_aux';
import Search from './component/Search/Search';
import SearchResult from './component/SearchResult/SearchResult';
import Modal from './component/Modal/Modal';
import axios from 'axios';
import Overlay from './component/Overlay/Overlay';
import XMLParser from 'react-xml-parser';

class App extends Component {
    state = {
        searchText: '',
        allResults: [],
        currentBook: null,
        isDisplay: false, //to display modal
        isDisplayLoader: false, //to display loader
        isContentLoading: false // to display content on click of search button
    }

    inputChangeHandler = (input) => {
        const searchText = input.target.value;
        this.setState({searchText: searchText});
    };

    buttonClickHandler = () => {
        const searchText = this.state.searchText;
        if (searchText.length === 0) {
            this.setState({
                allResults: [
                    {
                        'status': 'Nothing to search'
                    }
                ]
            });
            return null;
        }
        this.setState({isContentLoading: true});
        this.getData(searchText);
    }

    getData = (searchText) => {
        const url = axios.defaults.baseURL + '/search/index.xml?key=' + axios.defaults.apiKey + '&q=' + searchText;
        this
            .getDataFromGoodReadsApi(url)
            .then((resp) => {
                try {
                    this
                        .parseXMLtoJson(resp.data, 'work')
                        .then((res) => {
                            const jsonData = res;
                            const arr = Object
                                .keys(jsonData)
                                .map((key) => {
                                    return [key, jsonData[key]];
                                });
                            this.setState({allResults: arr, isContentLoading: false});
                        })
                        .catch((err) => console.log(err));
                } catch (error) {
                    console.log(error);
                    this.setState({
                        allResults: [
                            {
                                'status': 'No Response from API'
                            }
                        ],
                        isContentLoading: false
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    clickHandler = (book) => {
        const url = axios.defaults.baseURL + '/book/show/' + book.best_book.id + '?key=' + axios.defaults.apiKey;
        this.setState({isDisplayLoader: true});
        this
            .getDataFromGoodReadsApi(url)
            .then((resp) => {
                try {
                    this
                        .parseXMLtoJson(resp.data, 'book')
                        .then((res) => {
                            const jsonData = res;
                            const arr = Object
                                .keys(jsonData)
                                .map((key) => {
                                    return jsonData[key];
                                });
                            this.setState({currentBook: arr, isDisplay: true, isDisplayLoader: false});
                        })
                        .catch((err) => console.log(err));

                    // let jsonData = resp.data.query.results.GoodreadsResponse.book;
                    // this.setState({currentBook: [jsonData], isDisplay: true, isDisplayLoader:
                    // false});
                } catch (error) {
                    console.log(error);
                    alert('No Response from API');
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    parseXMLtoJson = (xmlResp, type) => {
        return new Promise((resolve, reject) => {
            try {
                const xml = new XMLParser().parseFromString(xmlResp);
                const xmlChildren = xml.getElementsByTagName(type);
                const data = xmlChildren.map(result => this.XMLToJson(result));
                resolve(data);
            } catch (error) {
                reject(error);
            }
        })
    }

    XMLToJson = xmlData => {
        const allNodes = new Array(...xmlData.children);
        const jsonResult = {};
        allNodes.forEach(node => {
            if (node.children.length) {
                jsonResult[node.name] = this.XMLToJson(node);
            } else {
                jsonResult[node.name] = node.value;
            }
        });
        return jsonResult;
    };

    getDataFromGoodReadsApi = (url) => {
        return new Promise((resolve, reject) => {
            const requestUri = `https://cors-anywhere.herokuapp.com/` + url;
            axios
                .get(requestUri)
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
                <Search
                    buttonClick={this.buttonClickHandler}
                    changed={(evt) => this.inputChangeHandler(evt)}/>
                <SearchResult
                    allResults={this.state.allResults}
                    clicked={this.clickHandler}
                    contentLoading={this.state.isContentLoading}/>
                <Modal
                    show={this.state.isDisplay}
                    currentBook={this.state.currentBook}
                    modalClose={this.modalCloseHandler}/>
            </Aux>
        );
    }
}

export default App;
