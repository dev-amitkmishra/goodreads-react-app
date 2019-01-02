import React from 'react';
import classes from './Overlay.css';

const overlay = (props) => (
    props.show ? <div className={classes.Overlay}></div>: null
);

export default overlay;