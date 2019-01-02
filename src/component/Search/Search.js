import React from "react";
import classes from './Search.css';

const search = (props) => {
    return(
        <div>
            <input type="text" key="seachInput" className={classes.Input} onChange={props.changed} placeholder="Start typing..."/>
            <button  key="seachBtn"onClick={props.buttonClick} className={classes.Button}>Search</button>
        </div>
    );
}

export default search;