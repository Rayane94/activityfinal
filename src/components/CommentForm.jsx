import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/commentSlice';

const schema = yup.object().shape({
  comment: yup
    .string()
    .required('Le commentaire est obligatoire')
    .max(500, 'Maximum 500 caractères'),
  note: yup
    .number()
    .typeError('La note est obligatoire')
    .required('La note est obligatoire')
    .min(1, 'La note minimale est 1')
    .max(5, 'La note maximale est 5'),
  acceptConditions: yup
    .boolean()
    .oneOf([true], 'Vous devez accepter les conditions générales'),
});

function CommentForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // data : { comment, note, acceptConditions }
    const { comment, note } = data;
    const id = new Date().getTime().toString(); // id = date
    dispatch(addComment({ id, comment, note }));
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="mt-3">
      <Form.Group className="mb-3" controlId="formComment">
        <Form.Label>Ajouter un commentaire</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Votre commentaire"
          {...register('comment')}
        />
        {errors.comment && (
          <Form.Text className="text-danger">
            {errors.comment.message}
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formNote">
        <Form.Label>Note</Form.Label>
        <Form.Select {...register('note')}>
          <option value="">Sélectionnez une note</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Select>
        {errors.note && (
          <Form.Text className="text-danger">
            {errors.note.message}
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAcceptConditions">
        <Form.Check
          type="checkbox"
          label="J’accepte les conditions générales"
          {...register('acceptConditions')}
        />
        {errors.acceptConditions && (
          <Form.Text className="text-danger">
            {errors.acceptConditions.message}
          </Form.Text>
        )}
      </Form.Group>
      <Button variant="primary" type="submit">
        Ajouter
      </Button>
    </Form>
  );
}

export default CommentForm;