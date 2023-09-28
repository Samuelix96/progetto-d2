import React from 'react'
import { Container, Row, Col,  } from 'react-bootstrap'
import { nanoid } from 'nanoid'

const SingleBook = ({img, category, title, price, asin }) => {
  return (
    <Container className='my-5 d-flex justify-content-center'>
    <Row>
      <Col className="col-12">
        <div key={nanoid()}  className="card" style={{ width: "18rem" }}>
          <img src={img} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{category}</p>
            <p className="card-text">Prezzo: {price}</p>
            <p className="card-text">{asin}</p>
            
          </div>
        </div>
      </Col>
    </Row>
  </Container>
  )
}

export default SingleBook
