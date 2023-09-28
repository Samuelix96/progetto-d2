
import { nanoid } from "nanoid";
import React, { useState, useEffect, useContext } from "react";
import LatestRelease from "../card/LatestRelease";
import { BeatLoader } from "react-spinners";
import { Container, Row, Col } from "react-bootstrap";
import { PostProvider } from "../../Context/PostContext";
import CommentArea from "../recommendation/CommentArea";


const LifeCycleExample = () =>
{

    const { filteredBooks, loading, setLoading, errors, setErrors, selected, setSelected } = useContext(PostProvider);
    console.log("tuuu ", selected);

    console.log(filteredBooks);
    




    return (
        <Container fluid className="my-4 ">
            { errors && <h1>Download Main books negative </h1> }
            { loading && !errors && (
                <BeatLoader
                    style={ { display: 'flex', justifyContent: 'center', height: '100vh' } }
                    loading={ loading }
                    size={ 150 }
                    aria-label="Loading Spinner "
                    data-testid="loader"
                />
            ) }
            <Row>
                <Col lg={ 8 } className="d-flex justify-content-center  gap-4 flex-wrap ">
                    { !loading && !errors &&
                        filteredBooks.slice(0, 44).map((book) =>
                        {
                            return (
                                <LatestRelease
                                    key={ nanoid() }
                                    title={ book.title }
                                    category={ book.category }
                                    img={ book.img }
                                    price={ book.price }
                                    info="Book Detail"
                                    asin={ book.asin }

                                />
                            );
                        }) }
                </Col>

                <Col lg={ 4 }>
                   
                </Col>
            </Row>
        </Container>
    );
}

export default LifeCycleExample;