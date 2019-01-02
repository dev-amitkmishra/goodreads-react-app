import React from "react";

const search = (props) => {
    return(
        <div>
            <input type="text" onChange={props.changed} placeholder="Start typing..."/>
        </div>
    );
}

export default search;