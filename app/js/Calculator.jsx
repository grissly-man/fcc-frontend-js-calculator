import React, {Component} from 'react';
import DisplayWindow from './DisplayWindow';
import Button from './Button';

var styles = {
    "calculator-container": {
        position: 'absolute',
        top: 0, left: 0, bottom: 0, right: 0,
        margin: 'auto',
        width: "340px",
        height: "522px",
        border: '0px hidden',
    },
    "calculator-inner": {
        width: "100%",
        height: "100%",
        borderRadius: "15px",
        backgroundColor: 'white'
    },
    "display-container": {
        position: "absolute",
        top: "0px",
        left: '0px',
        right: '0px',
        height: "100px",
        padding: "10px",
        margin: "0px",
        border: "0px hidden",
    },
    "buttons-container": {
        position: 'absolute',
        top: '135px',
        left: '10px',
        right: '10px',
        bottom: "10px",
        margin: '0px',
        padding: '0px',
        border: '0px hidden'
    }
};

class Calculator extends Component {
    constructor(props) {
        super(props);
        
        this.appendCurrentNum = this.appendCurrentNum.bind(this);
        this.appendCurrentExpr = this.appendCurrentExpr.bind(this);
        this.appendDecimal = this.appendDecimal.bind(this);
        this.evaluate = this.evaluate.bind(this);
        this.deleteNum = this.deleteNum.bind(this);
        this.clear = this.clear.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        
        this.state = {
            currentNum: '0',
            currentExpr: "",
            decimalSet: false,
            evaluated: false,
            numberSet: false,
        };
    }
    
    appendCurrentNum(number) {
        if (this.state.numberSet && this.state.currentNum.length >= 12) return;
        if (this.state.currentNum === '0' && number.toString() === '0') return;
        
        return this.setState({
            currentNum: !this.state.numberSet || this.state.currentNum.toString() === '0' ? number.toString() : this.state.currentNum.toString() + number,
            evaluated: false,
            decimalSet: this.state.evaluated ? false : this.state.decimalSet,
            numberSet: true,
            currentExpr: this.state.evaluated ? "" : this.state.currentExpr,
        });
    }
    
    appendCurrentExpr(string) {
        var currentExpr;
        if (this.state.evaluated) {
            currentExpr = this.state.currentNum;
        } else if (!this.state.numberSet) {
            if (this.state.currentExpr == "") return;
            currentExpr = this.state.currentExpr.substr(0, this.state.currentExpr.length - 1);
        } else {
            currentExpr = this.state.currentExpr + this.state.currentNum;
        }
        
        return this.setState({
            evaluated: false,
            decimalSet: false,
            numberSet: false,
            currentExpr: currentExpr + string
        });
    }
    
    appendDecimal() {
        if (this.state.numberSet && (this.state.decimalSet || this.state.currentNum.length >= 12)) return;
        
        return this.setState({
            currentNum: this.state.numberSet ? this.state.currentNum + "." : "0.",
            decimalSet: true,
            numberSet: true,
            evaluated: false,
            currentExpr: this.state.evaluated ? "" : this.state.currentExpr
        });
    }
    
    deleteNum() {
        if (this.state.evaluated || !this.state.numberSet) return;
        
        var decimalSet = this.state.decimalSet;
        if (this.state.currentNum.length === 1) return this.setState({
            currentNum: '0'
        });
        
        if (this.state.currentNum.charAt(this.state.currentNum.length - 1) === '.') decimalSet = false;
        
        return this.setState({
            currentNum: this.state.currentNum.substr(0, this.state.currentNum.length - 1),
            decimalSet: decimalSet
        });
    }
    
    evaluate() {
        if (this.state.evaluated) return;
        
        return this.setState({
            evaluated: true,
            currentExpr: this.state.currentExpr + this.state.currentNum + "=",
            currentNum: eval(this.state.currentExpr + this.state.currentNum).toString(),
            decimalSet: false,
            numberSet: false
        });
    }
    
    clear() {
        return this.setState({
            decimalSet: false,
            numberSet: false,
            evaluated: false,
            currentNum: '0',
            currentExpr: !this.state.numberSet ? "" : this.state.currentExpr
        });
    }
    
    handleKeyDown(e) {
        var keycode = e.which || e.keyCode;
        switch (keycode) {
            case 27:
                e.preventDefault();
                return this.clear();
            case 8:
                e.preventDefault();
                return this.deleteNum();
            case 13:
                e.preventDefault();
                return this.evaluate();
        }
    }
    
    handleKeyPress(e) {
        var charcode = e.charCode;
        if (charcode >= 48 && charcode <= 57) {
            e.preventDefault();
            return this.appendCurrentNum(charcode - 48);
        }
        switch (charcode) {
             case 42:
                e.preventDefault();
                return this.appendCurrentExpr("*");
             case 43:
                e.preventDefault();
                return this.appendCurrentExpr("+");
             case 45:
                e.preventDefault();
                return this.appendCurrentExpr("-");
             case 46:
                e.preventDefault();
                return this.appendDecimal();
             case 47:
                e.preventDefault();
                return this.appendCurrentExpr("/");
        }
    }
    
    render() {
        return <div onKeyPress={this.handleKeyPress} onKeyDown={this.handleKeyDown} style={styles['calculator-container']}>
            <div style={styles['calculator-inner']}>
                <div style={styles['display-container']}>
                    <DisplayWindow currentNum={this.state.currentNum} currentExpr={this.state.currentExpr} />
                </div>
                <div style={styles['buttons-container']}>
                    <Button autoFocus={true} color="#555555" onClick={this.deleteNum} width={2}>&#8592;</Button>
                    <Button color="f44336" onClick={this.clear}>CE</Button>
                    <Button color="008CBA" onClick={this.appendCurrentExpr}>/</Button>
                    <Button onClick={this.appendCurrentNum}>{7}</Button>
                    <Button onClick={this.appendCurrentNum}>{8}</Button>
                    <Button onClick={this.appendCurrentNum}>{9}</Button>
                    <Button color="008CBA" onClick={this.appendCurrentExpr}>*</Button>
                    <Button onClick={this.appendCurrentNum}>{4}</Button>
                    <Button onClick={this.appendCurrentNum}>{5}</Button>
                    <Button onClick={this.appendCurrentNum}>{6}</Button>
                    <Button color="008CBA" onClick={this.appendCurrentExpr}>-</Button>
                    <Button onClick={this.appendCurrentNum}>{1}</Button>
                    <Button onClick={this.appendCurrentNum}>{2}</Button>
                    <Button onClick={this.appendCurrentNum}>{3}</Button>
                    <Button color="008CBA" onClick={this.appendCurrentExpr}>+</Button>
                    <Button onClick={this.appendCurrentNum}>{0}</Button>
                    <Button onClick={this.appendDecimal}>.</Button>
                    <Button width={2} color="#4CAF50" onClick={this.evaluate}>=</Button>
                </div>
            </div>
        </div>;
    }
}

export default Calculator;