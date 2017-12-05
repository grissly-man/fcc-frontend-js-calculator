import React, {Component} from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        
        this.width = this.props.width || 1;
    }
    
    handleClick(e) {
        e.preventDefault(); 
        e.target.style.top = "4px";
        this.props.onClick(this.props.children);
    }
    
    handleRelease(e) {
        e.preventDefault();
        e.target.style.top = "0px";
        e.target.style.padding = '0px';
    }
    
    handleFocus(e) {
        e.target.style.outline="none";
    }
    
    render() {
        var styles = {
            'button-container': {
                position: 'relative',
                display: 'inline-block',
                width: this.width * 25 + "%",
                height: '20%',
                margin: '0px',
                padding: '0px',
                border: '0px hidden'
            },
            'button': {
                position: 'absolute',
                margin: 'auto',
                top: '0px',
                bottom: '0px',
                left: '0px',
                right: '0px',
                height: '60px',
                width: this.width * 70 + (this.width - 1) * 10 +"px",
                backgroundColor: this.props.color || '#e7e7e7',
                borderRadius: '4px',
                border: '0px hidden',
                color: this.props.color ? "#fff" : "#000",
                fontSize: '20pt',
                transition: 'all 0.1s',
                WebkitTransition: 'all 0.1s'
            }
        };
        return <div style={styles['button-container']}>
            <button autoFocus={this.props.autoFocus} style={styles['button']} onFocus={this.handleFocus} onTouchStart={this.handleClick} onTouchEnd={this.handleRelease} onMouseDown={this.handleClick} onMouseUp={this.handleRelease}>{this.props.children}</button>
        </div>;
    }
}

export default Button;