// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import './App.css';

function App() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://jsonfakery.com/movies/random/1');
      if (!response.ok) throw new Error('Erreur lors de la récupération du film');
      const data = await response.json();
      setMovie(data[0]);
    } catch (error) {
      setError('Une erreur est survenue lors de la récupération du film. Veuillez réessayer plus tard.');
      console.error('Erreur lors de la récupération du film:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <Container className="my-4">
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p>Chargement du film en cours...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : movie ? (
        <Card className="mb-4 film-card">
          <Card.Img
            variant="top"
            src={movie.poster_path}
            alt={movie.title}
            className="film-poster"
          />
          <Card.Body>
            <Card.Title className="film-title">{movie.title}</Card.Title>
            <Card.Text className="film-details">
              <strong>Année :</strong> {movie.year}<br />
              <strong>Genre :</strong> {movie.genre}
            </Card.Text>
            <Card.Text className="film-description">{movie.description}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>Aucun film trouvé.</p>
      )}

      <h2>Commentaires</h2>
      <CommentList />

      <h3>Ajouter un commentaire</h3>
      <CommentForm />
    </Container>
  );
}

export default App;
