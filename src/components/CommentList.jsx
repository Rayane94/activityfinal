import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeComment } from '../redux/commentSlice';
import { Card, Button } from 'react-bootstrap';

function CommentList() {
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  if (comments.length === 0) {
    return (
      <Card body className="mt-3">
        <p className="mb-0 text-center">Aucun commentaire pour le moment.</p>
      </Card>
    );
  }

  return (
    <div className="mt-3">
      {comments.map((c) => (
        <Card body className="mb-2" key={c.id}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Note : </strong>{c.note}/5
              <br />
              <strong>Commentaire : </strong>{c.comment}
            </div>
            <Button
              variant="danger"
              onClick={() => dispatch(removeComment(c.id))}
            >
              Supprimer
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default CommentList;