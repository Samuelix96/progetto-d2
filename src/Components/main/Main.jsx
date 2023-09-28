import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import LatestRelease from "../card/LatestRelease";
import Form from 'react-bootstrap/Form';
import horror from "../../data/esercizi/horror.json"






const Main = () => {
    const [formValue, setFormValue] = useState("");
    const [filteredBooks, setFilteredBooks] = useState(horror)

    const getValueFromForm = (value) => {

        if (value === "") {
            setFilteredBooks(horror)
        }
        setFormValue(value);
    }

    const submitFilter = (e) => {
        e.preventDefault();

        const bookFiltered = filteredBooks
            .filter((book) => book.title
                .toLocaleLowerCase()
                .includes(formValue
                    .toLocaleLowerCase()))
                    setFilteredBooks(bookFiltered)
    }

    return (
        <Container>
            <Row>
                <Form onSubmit={submitFilter}>
                    <Row>
                        <Form.Group>
                            <Form.Label>Search Your Book </Form.Label>
                            <Form.Control
                                name="formValue"
                                value={formValue}
                                type="text"
                                onChange={(e) => getValueFromForm(e.target.value)}
                            />
                            <Button type="submit">Search</Button>
                        </Form.Group>
                    </Row>
                </Form>

                <Col className="d-flex justify-content-center  gap-4 flex-wrap">
                    {filteredBooks.map((horror) => (
                        <LatestRelease
                            img={horror.img}
                            title={horror.title}
                            category={horror.category}
                            info="Vai a"
                        />
                    ))}
                </Col>
            </Row>
        </Container>
    )
}


export default Main;