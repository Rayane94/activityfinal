import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/commentSlice';

const schema = yup.object().shape({
  comment: yup.string()
    .required('Le commentaire est obligatoire')
    .max(500, 'Maximum 500 caractères'),
  note: yup.number()
    .typeError('La note est obligatoire')
    .required('La note est obligatoire')
    .min(1, 'La note minimale est 1')
    .max(5, 'La note maximale est 5'),
  acceptConditions: yup.boolean()
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
    defaultValues: {
      comment: '',
      note: '',
      acceptConditions: false,
    },
  });

  const onSubmit = (data) => {
    const { comment, note } = data;
    const id = new Date().getTime().toString();
    dispatch(addComment({ id, comment, note }));
    reset({ comment: '', note: '', acceptConditions: false });
  };

  const noteOptions = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="mt-3">
      <Form.Group controlId="formComment" className="mb-3">
        <Form.Label>Ajouter un commentaire</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Votre commentaire"
          {...register('comment')}
          className={errors.comment ? 'is-invalid' : ''}
        />
        {errors.comment && (
          <Form.Control.Feedback type="invalid">
            {errors.comment.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group controlId="formNote" className="mb-3">
        <Form.Label>Note</Form.Label>
        <Form.Select
          {...register('note')}
          className={errors.note ? 'is-invalid' : ''}
        >
          <option value="">Sélectionnez une note</option>
          {noteOptions.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </Form.Select>
        {errors.note && (
          <Form.Control.Feedback type="invalid">
            {errors.note.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group controlId="formAcceptConditions" className="mb-3">
        <Form.Check
          type="checkbox"
          label="J’accepte les conditions générales"
          {...register('acceptConditions')}
          className={errors.acceptConditions ? 'is-invalid' : ''}
        />
        {errors.acceptConditions && (
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors.acceptConditions.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Button variant="primary" type="submit">
        Ajouter
      </Button>
    </Form>
  );
}

export default CommentForm;
