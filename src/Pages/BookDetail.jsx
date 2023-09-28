import React, { useContext, useEffect, useState, } from 'react'
import { useParams } from 'react-router'
import { PostProvider } from '../Context/PostContext';
import { Col, Container, Row } from 'react-bootstrap';
import SingleBook from "../Components/card/SingleBook"
import { nanoid } from 'nanoid';
import BeatLoader from "react-spinners/BeatLoader";
import { Form } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import Navigation from "../Components/navbar/Navigation"


const BookDetail = () =>
{
  const { bookasin } = useParams()

  const Url = "https://striveschool-api.herokuapp.com/api/comments/";
  const keyApi = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTA5ZDJlNmE3YzIyZjAwMTRjMTAzZjkiLCJpYXQiOjE2OTUxNDI2MzAsImV4cCI6MTY5NjM1MjIzMH0.dCEns1eEHd3UZl7jHLyeOUtXFK4UXv2JEbbn5G5nlaE"
  
  const [ author, setAuthor ] = useState('');
  const [ rate, setRate ] = useState(0);
  const [ commentTextArea, setCommentTextArea ] = useState('');
  const [ showAlert, setShowAlert ] = useState(false);
  const [ alertMessage, setAlertMessage ] = useState("");
  const [ alertVariant, setAlertVariant ] = useState("");
  const [ refresh, setRefresh ] = useState(false);

  const { errors, loading, setLoading, setErrors, } = useContext(PostProvider);
  const [ allComment, setAllComment ] = useState([]);
  const [ reload, setReload ] = useState(false);

  const toggleReload = () => setReload(!reload);
  const [ bookDetail, setBookDetail ] = useState(null);
  
  const resetForm = () =>
  {
    setAuthor('');
    setRate(0);
    setCommentTextArea('');
  };

  const handleAlert = (message, variant) =>
  {
    setShowAlert(true);
    setAlertMessage(message);
    setAlertVariant(variant);

    // impostare un timeout per nascondere automaticamente l'alert dopo un certo periodo di tempo, se lo desideri
    setTimeout(() =>
    {
      setShowAlert(false);
      setAlertMessage("");
      setAlertVariant("");
    }, 3000); // Nascondi l'alert dopo 5 secondi (5000 millisecondi)
  };

  const getBookDetail = async () =>
  {
    setLoading(true);
    try
    {

      const response = await fetch(`https://epibooks.onrender.com/${ bookasin }`);
      
      const data = await response.json();
      setBookDetail(data);
      setLoading(false);
    } catch (e)
    {
      setErrors(e);
    }
  }

  const getComments = async () =>
  {
    const UrlAsin = Url + bookasin;


    try
    {
      const response = await fetch(UrlAsin, {
        method: 'GET',
        headers: {
          "Authorization": keyApi
        }
      });
      console.log("Ci provo ", response)
      const data = await response.json();
      console.log("This is ASIN " + bookasin)
      setAllComment(data);
    } catch (e)
    {
      console.log("Error array comment", e);
    }

  }

  const postComments = async (e) =>
  {
    e.preventDefault();

    try
    {
      const response = await fetch(Url, {
        method: 'POST',
        body: JSON.stringify({
          "rate": rate,
          "comment": commentTextArea,
          "elementId": bookasin,
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": keyApi
        },
      });
      const data = await response.json()
      console.log(data);
      setRefresh(!refresh)
      resetForm();
    } catch (e)
    {
      console.log("Error post comment", e);
    }
  }
  const deleteComment = async (commentId) =>
  {

    const commentUrl = `https://striveschool-api.herokuapp.com/api/comments/${ commentId }`;
    try
    {
      await fetch(commentUrl, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": keyApi
        },
      });
      setRefresh(!refresh)
      handleAlert("Comment deleted", "success");
    } catch (e)
    {
      console.log("Error delete comment", e);
    }
  }
  useEffect(() =>
  {
    getBookDetail();
    getComments();
  }, [ refresh ])

  return (
    <>
    <Navigation />
      <Container>
        <Row className="justify-content-center">
          <Col md={ 8 } >
            <div>
              { errors && <h1>Download Main books negative </h1> }
              { loading && !errors && (
                <BeatLoader
                  style={ { display: 'flex', justifyContent: 'center', height: '100vh' } }
                  loading={ loading }
                  size={ 160 }
                  aria-label="Loading Spinner "
                  data-testid="loader"
                />
              ) }
              { bookDetail && (<SingleBook
                key={ nanoid() }
                title={ bookDetail[ 0 ].title }
                category={ bookDetail[ 0 ].category }
                img={ bookDetail[ 0 ].img }
                price={ bookDetail[ 0 ].price }
                asin={ bookDetail[ 0 ].asin }
              />) }
            </div>
          </Col>
          <Col md={ 4 } >
            <Form className='bg-info my-5 p-2 rounded'>
              <Form.Group className="d-flex align-items-center m-2" controlId="exampleForm.ControlInput1">
                <Form.Label className="p-1"> Author</Form.Label>
                <Form.Control
                  type="email"
                  value={ author }
                  name='author'
                  placeholder="Author"
                  autoFocus
                  onChange={ (e) => setAuthor(e.target.value) }
                />
                <Form.Label className="p-1"> Rate</Form.Label>
                <Form.Control
                  type="number"
                  name='rate'
                  value={ rate }
                  placeholder="rate from 1 to 5"
                  autoFocus
                  onChange={ (e) => setRate(e.target.value) }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Aggiungi un tuo Commmento</Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={ (e) => setCommentTextArea(e.target.value) }
                  name="commentTextArea"
                  value={ commentTextArea }
                  rows={ 3 } />
              </Form.Group>
              <Button variant="primary" type="submit"
                onClick={ (e) => postComments(e) }>
                Post Comment
              </Button>
              <ul className='bg-info'>
                { handleAlert && (
                  <Alert variant={ alertVariant } onClose={ () => setShowAlert(false) } dismissible>
                    { alertMessage }
                  </Alert>
                ) }
                { allComment.map((comment) => (
                  <li className='' key={ nanoid() }>
                    <p className='float-start'>{ comment.author }</p><br></br>
                    <Button className='my-4 mx-2 btn-danger float-end' onClick={ () => deleteComment(comment._id)
                      .then(() => toggleReload()) }>
                      <Trash color="black" />
                    </Button><br></br>
                    <br></br>
                    <p className='float-none'>{ comment.comment }</p>
                    <p className="float-none text-start">{ comment.rate }</p>
                    <hr></hr>
                  </li>
                )) }
              </ul>
            </Form>
          </Col>

        </Row>
      </Container>
    </>
  );
}

export default BookDetail;