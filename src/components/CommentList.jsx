import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import { removeComment } from '../redux/commentSlice';

function CommentList() {
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  if (comments.length === 0) {
    return (
      <ListGroup className="mb-4">
        <ListGroup.Item className="text-center">
          Aucun commentaire pour le moment.
        </ListGroup.Item>
      </ListGroup>
    );
  }

  return (
    <ListGroup className="mb-4">
      {comments.map((c) => (
        <ListGroup.Item key={c.id}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Note :</strong> {c.note}/5<br />
              <strong>Commentaire :</strong> {c.comment}
            </div>
            <Button variant="danger" onClick={() => dispatch(removeComment(c.id))}>
              Supprimer
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default CommentList;
