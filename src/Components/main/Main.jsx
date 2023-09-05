import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import LatestRelease from "../card/LatestRelease";



class Main extends Component {
   constructor(props) {
    super(props);
    console.log(this.props)
   }
    render() {
        return(
            <Container>
                <Row>
                    <Col className="d-flex flex-wrap-nowrap gap-3">
                    {this.props.horrorBooks ?? this.props.horrorBooks.map((book) => (
                            <LatestRelease
                                img={book.img}
                                title={book.title}
                                category={book.category}
                                info="Vai a"
                            />
                        ))}
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Main;