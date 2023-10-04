import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Trash } from 'react-bootstrap-icons';

import { Pen } from 'react-bootstrap-icons';
import "./comment.css"


function CommentArea ({ bookId })
{
  

  const [ refresh, setRefresh ] = useState(false);
  const [author, setAuthor] = useState('');
  const [ rate, setRate ] = useState('');
  const [ commentTextArea, setCommentTextArea ] = useState('');

  const [ show, setShow ] = useState(false);
  const [ allComment, setAllComment ] = useState([]);
  const [ reload, setReload ] = useState(false);
  const [ editingCommentId, setEditingCommentId ] = useState(null);
  const [ editedCommentText, setEditedCommentText ] = useState('');
  const [ editedRate, setEditedRate ] = useState('');
  const [ isEditing, setIsEditing ] = useState(false);


  const Url = "https://striveschool-api.herokuapp.com/api/comments/";
  const keyApi = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFkMTZmZTUyYmJmMzAwMTg3OWIxZjAiLCJpYXQiOjE2OTY0MDUyNDcsImV4cCI6MTY5NzYxNDg0N30.3njPWkxVp0kLob40Jezj4NkxeSvXSlFlqP00bTf_pSI" 
  const UrlAsin = Url + bookId;


  const toggleReload = () => setReload(!reload);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const resetForm = () =>
  {
    setAuthor('')
    setRate('');
    setCommentTextArea('');
  };


  const getComments = async () =>
  {


    console.log("New UUUUUUrl " + UrlAsin);

    try
    {
      const response = await fetch(UrlAsin, {
        method: 'GET',
        headers: {
          "Authorization": keyApi
        }
      });
      const data = await response.json();
      console.log("This is ASIN " + bookId)
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
          "elementId": bookId,
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

  const cancelEditingComment = () =>
  {
    setIsEditing(false);
    setEditingCommentId(null);
    setEditedCommentText('');
  };

  const saveEditedComment = async commentId =>
  {
    if (isEditing)
    {
      const updatedComment = {
        comment: editedCommentText,
        rate: editedRate,
      };
      await putComments(commentId, updatedComment);
    } else
    {
      cancelEditingComment();
    }
  };

  const startEditingComment = (commentId, commentText) =>
  {
    setEditingCommentId(commentId);
    setEditedCommentText(commentText);

    setIsEditing(true);
  };



  const putComments = async (commentId, updatedComment) =>
  {
    try
    {
      const response = await fetch(`${ Url }${ commentId }`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTEyZThmMTBjNThjZTAwMTRlNmFjOTYiLCJpYXQiOjE2OTU3MzgwOTgsImV4cCI6MTY5Njk0NzY5OH0.lMKKZWsFjByxSZEaKpmxkwTkMaaXJLoKqywrukD1aH0',
        },
        body: JSON.stringify(updatedComment),
      });

      if (response.ok)
      {
        const updatedComments = allComment.map(comment =>
          comment._id === commentId
            ? {
              ...comment,
              comment: updatedComment.comment,
              rate: updatedComment.rate,
            }
            : comment
        );
        setAllComment(updatedComments);
        setEditingCommentId(null);
      } else
      {
        console.error('Errore, non riesco ad modificare il commento');
      }
    } catch (error)
    {
      console.error('Impossibile modificare i commenti', error);
    }
  };

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
      // handleAlert("Comment deleted", "success");
    } catch (e)
    {
      console.log("Error delete comment", e);
    }
  }


  useEffect(() =>
  {
    getComments()
  }, [ refresh ]);

  return (
    <>
      <Button
        variant='primary'
        onClick={ handleShow }>
        Mostra commenti
      </Button>

      <Modal
        show={ show }
        onHide={ handleClose }
        className='mr-0'>
        <Modal.Header closeButton>
          <Modal.Title>Commenti</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            { allComment.map(comment => (
              <li key={ comment._id }>
                <p>{ comment.author }</p>
                { editingCommentId === comment._id ? (
                  <>
                    <Form.Control
                      as='textarea'
                      rows={ 3 }
                      
                      value={ editedCommentText }
                      onChange={ e => setEditedCommentText(e.target.value) }
                    />
                    <Form.Group className='mb-3'>
                      <Form.Label>Nuovo voto</Form.Label>
                      <Form.Control
                        min={ 1 }
                        max={ 5 }
                        value={ editedRate }
                        onChange={ e => setEditedRate(e.target.value) }
                        name='editedRate'
                        type='number'
                      />
                    </Form.Group>
                    <Button
                      variant='primary'
                      onClick={ () => saveEditedComment(comment._id) }>
                      Salva
                    </Button>
                    <Button
                      variant='secondary'
                      onClick={ () => cancelEditingComment() }>
                      Annulla
                    </Button>
                  </>
                ) : (
                  <>
                    <p>{ comment.comment }</p>
                    <p>Voto: { comment.rate }/5</p>{ ' ' }
                    <Button
                      className='mb-4'
                      variant='primary'
                      onClick={ () =>
                        startEditingComment(comment._id, comment.comment)
                      }>
                      MODIFICA
                      <Pen
                        className='modified'
                        variant='light'
                      />
                    </Button>
                    <Button
                      className='mb-4'
                      variant='danger'
                      onClick={ () => deleteComment(comment._id) }>
                      ELIMINA
                      <Trash
                        className='cestino'
                        color='black'
                        style={ { cursor: 'pointer' } }
                      />
                    </Button>
                  </>
                ) }
              </li>
            )) }
          </ul>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              
              <Form.Label>email</Form.Label>
              <Form.Control
                value={ author }
                type="email"
                onChange={ (e) => setAuthor(e.target.value) }
                placeholder="Your email"
                autoFocus
              />
              <Form.Label>Voto da 1/5 </Form.Label>
              <Form.Control
                value={ rate }
                type="number"
                onChange={ (e) => setRate(e.target.value) }
                placeholder="Voto da 1/5"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control
                
                value={ commentTextArea }
                name="commentTextArea"
                onChange={ (e) => setCommentTextArea(e.target.value) }
                as="textarea" rows={ 3 } />
              <Button variant="primary" onClick={ (e) => postComments(e) }>
                Send comment
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose }>
            Close
          </Button>
          <Button variant="primary" onClick={ handleClose }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )


}
export default CommentArea;
