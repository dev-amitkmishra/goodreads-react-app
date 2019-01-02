import React from "react";

const search = (props) => {
    return(
        <div>
            <input type="text" onChange={props.changed}/>
        </div>
    );
}

export default search;