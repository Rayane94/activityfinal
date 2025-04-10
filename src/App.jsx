import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import './App.css';

function App() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovie = async () => {
    try {
      const response = await fetch('https://jsonfakery.com/movies/random/1');
      if (!response.ok)
        throw new Error('Erreur lors de la récupération du film');
      const data = await response.json();
      setMovie(data[0]);
    } catch (err) {
      setError('Une erreur est survenue lors de la récupération du film. Veuillez réessayer plus tard.');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  if (loading) {
    return (
      <Container className="my-4 custom-container text-center">
        <Spinner animation="border" />
        <p>Chargement du film en cours...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4 custom-container">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4 custom-container">
      {movie ? (
        <>
          <Row className="mb-4">
            <Col md={6}>
              <Card>
                <Card.Img 
                  variant="top"
                  src={movie.poster_path}
                  alt={movie.original_title}
                  className="film-poster"
                />
              </Card>
            </Col>
            <Col md={6}>
              <h1 className="film-title">{movie.original_title}</h1>
              <p className="film-details">
                <strong>Date de sortie :</strong> {movie.release_date}
              </p>
              <p className="film-details">
                <strong>Votes :</strong> {movie.vote_average} / 5<br />
                <strong>Nombre de votes :</strong> {movie.vote_count}
              </p>
              <p className="film-synopsis">
                <strong>Synopsis :</strong> {movie.overview}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="comment-section-title">Commentaires</h2>
              <CommentList />
              <h3 className="comment-form-title">Ajouter un commentaire</h3>
              <CommentForm />
            </Col>
          </Row>
        </>
      ) : (
        <p>Aucun film trouvé.</p>
      )}
    </Container>
  );
}

export default App;
