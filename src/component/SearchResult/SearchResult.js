import React from "react";
import classes from './SearchResult.css';

const searchResult = (props) => {
    let result = Object
        .keys(props.allResults)
        .map(key => {
            return [...Array(props.allResults[key])].map((bookInfo, i) => {
                let book = bookInfo[1];
                return <div
                    className={classes.Card}
                    onClick={() => props.clicked(book)}
                    key={book.id.content}><img src={book.best_book.small_image_url} alt='Not found'/>
                    <h4 key={key + i}>{book.best_book.title}</h4>
                </div>
            })
        })
    return (
        <div className={classes.Container}>
            {result}
        </div>
    )
};

export default searchResult;