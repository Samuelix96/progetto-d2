import React, {useState} from "react";
import { Col, Container, Row } from "react-bootstrap";

const Counter = () => {
    const [counter , setCounter ] = useState(0);

    const incrementCount = () => {
        setCounter((prevState) => prevState + 1)
    }
    const decrementCount = () => {
        setCounter ((prevState) => prevState - 1 )
    }

    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <h1>
                        {counter}
                    </h1>

                    <button onClick={incrementCount}>
                        Increment
                    </button>

                    <button onClick={decrementCount}>
                        Decrement
                    </button>
                </Col>
            </Row>
        </Container>
    )
}
export default Counter;