import React, { Component } from 'react';
import Button from '../components/Button';
import Display from '../components/Display';
import './Calculator.css';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = {
    ...initialState,
  };

  clearMemory = () => {
    this.setState({ ...initialState });
  };

  setOperation = (operation) => {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const result = operation === '=';
      const currentOperation = this.state.operation;
      const values = [...this.state.values];

      switch (operation) {
        case '/':
          values[0] = values[0] / values[1];
          values[1] = 0;
          break;
        case '*':
          values[0] = values[0] * values[1];
          values[1] = 0;
          break;
        case '-':
          values[0] = values[0] - values[1];
          values[1] = 0;
          break;
        case ('+'):
          values[0] = values[0] + values[1];
          values[1] = 0;
          break;
        case '=':          
          values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
          values[1] = 0;
          break;
        default:
          console.log('erro');
      }

      this.setState({
        displayValue: values[0],
        operation: result ? null : operation,
        current: result ? 0 : 1,
        clearDisplay: !result,
        values,
      });
    }
  };

  addDigit = (digit) => {
    if (digit === '.' && this.state.displayValue.includes('.')) {
      return;
    }

    const clearDisplay =
      this.state.displayValue === '0' || this.state.clearDisplay;

    const currentValue = clearDisplay ? '' : this.state.displayValue;

    const displayValue = currentValue + digit;

    this.setState({ displayValue, clearDisplay: false });

    if (digit !== '.') {
      const index = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[index] = newValue;
      this.setState({ values });
    }
  };

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
