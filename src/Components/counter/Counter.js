import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Counter extends Component {
    constructor(props) {
        super(props);

        this.state= {
            counter:0
        }
    }
    incrementCount() {
        this.setState((prevState) => ({
            counter: prevState.counter + 1
        })
    )}

    decrementCount() {
        this.setState((prevState) => ( {
            counter: prevState.counter === 0 ? 0 : prevState.counter - 1
        })
    )}

    render() {
        return(
            <Container>
                <h1>
                {this.state.counter}
                </h1>

                <button onClick={() => this.incrementCount()}>
                Incrementa
                </button>
                <button onClick={() => this.decrementCount()}>Decresci</button>
            </Container>
        )
    }
}
