import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Neck from './Neck';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<Neck />, document.getElementById('guitar'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// store intervals of scale. store root note of each open string. store name of note and number eg A4 as 2 separate properties.
// state changes to fit with the scale - set to 0 if not in the scale, 1 for root note, etc.
// set state when triggering a new scale/key. work up each string (traverse table row/String component with frets in each) to set all pos_in_key
// assign a colour to each interval with className eg color1 red, color2 orange
// Change colour of table cell to match its assigned colour based on the scale