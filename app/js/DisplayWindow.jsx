import React, {Component} from 'react';

var styles = {
    'window-background': {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#e7e7e7',
        borderRadius: '4px',
    },
    'current-number-box': {
        position: 'absolute',
        textAlign: 'right',
        top: '0px',
        right: '0px',
        border: '0px hidden',
        padding: '10px',
        fontSize: '40px'
    },
    'current-expression-box': {
        position: 'absolute',
        textAlign: 'right',
        right: '0px',
        left: '0px',
        height: '20px',
        bottom: '0px',
        border: '0px hidden',
        fontSize: '10px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis , ellipsis',
    },
    'current-expression-text': {
        position: 'absolute',
        right: '10px',
        bottom: '10px',
        padding: '0px',
        margin: '0px'
    }
};

function formatNumber(number) {
    if (number.toString().length <= 12) return number.toString();
    
    number = parseFloat(number.toString());
    
    if (number < 0 && number > -1) return number.toPrecision(4);  // two negative signs
    if (number < -1) return number.toPrecision(6);  // one negative sign
    return number.toPrecision(7);  // zero negative signs
}

class DisplayWindow extends Component {
    render() {
        return <div style={styles['window-background']}>
            <div style={styles['current-number-box']}>
                { formatNumber(this.props.currentNum) }
            </div>
            <div style={styles['current-expression-box']}>
                <span style={styles['current-expression-text']}>{this.props.currentExpr}</span>
            </div>
        </div>;
    }
}

export default DisplayWindow;