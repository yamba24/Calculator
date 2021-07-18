import React, { Component } from 'react';
import Button from './components/Button';
import "./css/style.css";
import * as math from 'mathjs';

class App extends Component {
  constructor(props){
      super(props)

      this.state={
          toCalc: '0',
          final: '0',
          dot: false
      }
  }

  reset = () =>{
      this.setState({dot: false, toCalc: '0', final: '0'})
  }


  addToCurrent = (symbol) =>{
      let {toCalc, dot} = this.state;
      if (symbol === '.')
        this.setState({dot: true})
      if(['/', '*', '-', '+'].indexOf(symbol) > -1){
        this.setState({dot: false, toCalc: toCalc + symbol});
      }
      else{
        if((toCalc.charAt(toCalc.length - 1) === "0" && toCalc.length > 2 && symbol !== ".")){
          if (!dot){
            this.setState({toCalc: toCalc.substring(0,toCalc.length-1) + symbol})
          }
          else {
            this.setState({toCalc: toCalc + symbol}) 
          }
        }
        else if((toCalc.charAt(0) === "0" && symbol !== "." && toCalc.charAt(toCalc.length-1) === '.')){
            this.setState({toCalc: toCalc + symbol})
        }
        else if((toCalc.charAt(0) === "0" && !dot && symbol !== "." && (toCalc.charAt(toCalc.length - 1) !== '+' && toCalc.charAt(toCalc.length - 1) !== '*' && toCalc.charAt(toCalc.length - 1) !== '/' && toCalc.charAt(toCalc.length - 1) !== '-'))){
            this.setState({toCalc: symbol})
        }
        else{
            this.setState({toCalc: toCalc + symbol})
        }
      }
  }

  solve = (symbol) =>{
      let {final} = this.state;
          final = math.evaluate(this.state.toCalc);
          this.setState({final});
  }

  render(){
      const buttons = [
          {symbol: 'C', cols: 3, action: this.reset},
          {symbol: '/', cols: 1, action: this.addToCurrent},
          {symbol: '7', cols: 1, action: this.addToCurrent},
          {symbol: '8', cols: 1, action: this.addToCurrent},
          {symbol: '9', cols: 1, action: this.addToCurrent},
          {symbol: '*', cols: 1, action: this.addToCurrent},
          {symbol: '4', cols: 1, action: this.addToCurrent},
          {symbol: '5', cols: 1, action: this.addToCurrent},
          {symbol: '6', cols: 1, action: this.addToCurrent},
          {symbol: '-', cols: 1, action: this.addToCurrent},
          {symbol: '1', cols: 1, action: this.addToCurrent},
          {symbol: '2', cols: 1, action: this.addToCurrent},
          {symbol: '3', cols: 1, action: this.addToCurrent},
          {symbol: '+', cols: 1, action: this.addToCurrent},
          {symbol: '0', cols: 2, action: this.addToCurrent},
          {symbol: '.', cols: 1, action: this.addToCurrent},
          {symbol: '=', cols: 1, action: this.solve},
      ]
      return (
          <div className="App">
              
                  <div className="float-last">{this.state.toCalc}</div>
              
              <input className="result" type="text" value={this.state.final}></input>

              {buttons.map((btn, i)=>{
                  return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol)=>btn.action(symbol)} />
              })}

          </div>
      );
  }
}

export default App;