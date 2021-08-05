import { Component, useState } from 'react';
import PropTypes from 'prop-types';
import './Counter.css';
import { render } from '@testing-library/react';

export default class Counter extends Component {
    // Define initial state in constructor
    // state => counter val: 0
    constructor() {
        super();
        this.state = {
            counter: 0
        }
        // Binding method to state variable 
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    increment(by) {
        // Update state using previous state
        this.setState(
            (prevState) => {
                return {counter: prevState.counter + by}
        });
    }

    decrement(by) {
        // Update state using previous state
        this.setState(
            (prevState) => {
                return {counter: prevState.counter - by}
        });
    }

    reset() {
        this.setState({counter: 0});
    }

    render() {
        return (
            <div className="counter">
            <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <CounterButton by={2} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <span className="count">{this.state.counter}</span>
            <ResetButton resetMethod={this.reset}/>
            </div>
        );
    }
}

// Functional Components Versions
function CounterButton(props) {
    return( 
        <div className="counter">
            <button onClick={() => props.incrementMethod(props.by)}>+{props.by}</button>
            <button onClick={() => props.decrementMethod(props.by)}>-{props.by}</button>
        </div>
    );
}

CounterButton.defaultProps = {
    by: 1
}
CounterButton.propTypes = {
    by: PropTypes.number
}

function ResetButton(props) {
    return (
        <div className="reset">
            <button className="resetButton" onClick={() => props.resetMethod()}>RESET</button>
        </div>
    );
}


// Class Components Version

// class CounterButton extends Component {
//     constructor() {
//         super();
//         // Binding method 
//         this.increment = this.increment.bind(this);
//         this.decrement = this.decrement.bind(this);
//     }

//     increment() {
//         this.props.incrementMethod(this.props.by);
//     }

//     decrement() {
//         this.props.decrementMethod(this.props.by);
//     }

//     render() {
//         return( 
//             <div className="counterButton">
//                 <button onClick={this.increment}>+{this.props.by}</button>
//                 <button onClick={this.decrement}>-{this.props.by}</button>
//             </div>
//         );
//     }
// }

