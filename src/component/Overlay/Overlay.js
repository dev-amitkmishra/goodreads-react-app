import React from 'react';
import classes from './Overlay.css';

const overlay = (props) => {
    if (props.show) {
        return <div className={classes.Overlay}></div>
    }
    if (props.showLoader) {
            return <div className={classes.Overlay}><span className={classes.Loader}>Loading...</span></div>;
    }
    return null;
}

export default overlay;