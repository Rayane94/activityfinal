import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert, Form } from 'react-bootstrap';
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
        throw new Error(`Erreur technique: ${response.status} - ${response.statusText}`);
      const data = await response.json();
      setMovie(data[0]);
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors de la récupération du film:', err);
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
          {/* Image du film en haut */}
          <Card className="mb-4">
            <Card.Img
              variant="top"
              src={movie.poster_path}
              alt={movie.original_title}
              className="film-poster"
            />
          </Card>

          {/* Détails du film en dessous, centrés */}
          <h1 className="film-title">{movie.original_title}</h1>
          <p className="film-release">
            <strong>Date de sortie :</strong> {movie.release_date}
          </p>
          <div className="film-info">
            <p>
              <strong>Votes :</strong> {movie.vote_average} / 5<br />
              <strong>Nombre de votes :</strong> {movie.vote_count}
            </p>
          </div>
          <p className="film-synopsis">
            <strong>Synopsis :</strong> {movie.overview}
          </p>

          {/* Case : par exemple, "Ajouter aux favoris" */}
          <div className="favorites-checkbox">
            <Form.Check
              type="checkbox"
              id="favoritesCheck"
              label="Ajouter aux favoris"
            />
          </div>

          {/* Section Commentaires */}
          <h2 className="section-title">Commentaires</h2>
          <CommentList />
          <h3 className="section-title">Ajouter un commentaire</h3>
          <CommentForm />
        </>
      ) : (
        <p>Aucun film trouvé.</p>
      )}
    </Container>
  );
}

export default App;
