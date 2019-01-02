import React from "react";
import classes from './SearchResult.css';

const searchResult = (props) => {
    let result = Object
        .keys(props.allResults)
        .map(key => {
            return [...Array(props.allResults[key])].map((_, i) => {
                return <div className={classes.Card}><h4 key={key + i} type={key}>{props.allResults[key]}</h4></div>
            })
        })
    return (
        <div>
            {result}
        </div>
    )
};

export default searchResult;