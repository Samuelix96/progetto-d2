import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const CommentList = ({author, comment}) =>
{
  return (
    <ListGroup as="ol" numbered>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{author}</div>
          {comment}
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default CommentList;