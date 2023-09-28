import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useContext, useState } from 'react';
import { NavLinks } from "../../data/Nav-links.js"
import { nanoid } from 'nanoid';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { PostProvider } from '../../Context/PostContext.js';

const Navigation = () =>
{
    const { books, setFilteredBooks, filteredBooks } = useContext(PostProvider);
    const [ formValue, setFormValue ] = useState('');

    console.log(filteredBooks);

    const getValueFromForm = (value) =>
    {

        if (value === "")
        {
            setFilteredBooks(books)
        }
        setFormValue(value);
    }

    const submitFilter = (e) =>
    {
        e.preventDefault();
        const bookFiltered = books.filter((book) => book.title
            .toLowerCase()
            .includes(formValue
                .toLowerCase()))
        setFilteredBooks(bookFiltered)

    }





    return (
        <Navbar expand="lg" className="bg-success ">
            <Container>
                <Navbar.Brand href="#">
                    <img
                        alt=""
                        src="https://static-00.iconduck.com/assets.00/open-book-icon-2048x2048-wuklhx59.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{ ' ' }
                    Epibooks
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        { NavLinks.map((link) => (
                            <Nav.Link key={ nanoid() }
                                href={ link.url }>
                                { link.label }
                            </Nav.Link>
                        )) }



                    </Nav>
                    <Form onSubmit={ submitFilter } className="d-flex">
                        <Form.Control

                            onChange={ (e) => getValueFromForm(e.target.value) }
                            name='formValue'
                            value={ formValue }
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button type="submit" variant="danger">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>



    )

};
export default Navigation;
