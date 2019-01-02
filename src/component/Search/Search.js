import React from "react";
import classes from './Search.css';

const search = (props) => {
    return(
        <div>
            <input type="text" className={classes.Input} onChange={props.changed} placeholder="Start typing..."/>
        </div>
    );
}

export default search;