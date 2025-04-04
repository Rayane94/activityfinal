import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import './App.css';

function App() {
  const [movie, setMovie] = useState(null);

  const fetchMovie = async () => {
    try {
      const response = await fetch('https://jsonfakery.com/movies/random/1');
      if (!response.ok) throw new Error('Erreur lors de la récupération du film');
      const data = await response.json();
      // Vérifiez la structure du JSON retourné par l’API et ajustez le champ image
      setMovie(data[0]); // Supposons que l'API renvoie un tableau avec un objet
    } catch (error) {
      console.error('Erreur lors de la récupération du film:', error);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  // Utilisez la propriété exacte pour l'image renvoyée par l'API (ici "posterUrl" est un exemple)
  const imageUrl = movie && movie.posterUrl ? movie.posterUrl : null;

  return (
    <Container className="my-4">
      {movie ? (
        <Card className="mb-4 film-card">
          <Card.Img
            variant="top"
            src={imageUrl}
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
        <p>Chargement du film en cours...</p>
      )}

      <h2>Commentaires</h2>
      <CommentList />

      <h3>Ajouter un commentaire</h3>
      <CommentForm />
    </Container>
  );
}

export default App;
