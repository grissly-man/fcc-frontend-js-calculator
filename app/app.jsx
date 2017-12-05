import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './js/Calculator';
import ArtistTag from './js/ArtistTag';

var styles = {
    "page-style": {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        backgroundColor: 'orange',
        padding: '0px',
        margin: '0px',
        fontFamily: '"Lucida Console", Monaco, monospace'
    }
}

ReactDOM.render(
    <div style={styles['page-style']}>
        <Calculator />
        <ArtistTag />
    </div>,
    document.getElementById('app')
);