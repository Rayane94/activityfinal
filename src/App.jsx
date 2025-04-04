import React from 'react';
import { Container, Card } from 'react-bootstrap';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import './App.css';

function App() {
  const movie = {
    title: "Maya l'abeille 2 : Les jeux du miel",
    year: 2018,
    genre: "Animation, Aventure",
    description: "Maya l'abeille 2 suit les aventures de Maya et de ses amis dans un univers coloré où règnent la joie et la découverte.",
    poster: "https://via.placeholder.com/300x450.png?text=Maya+l'abeille+2" // Remplacez cette URL par l'image exacte de la maquette si disponible
  };

  return (
    <Container className="my-4">
      <Card className="mb-4">
        <Card.Img variant="top" src={movie.poster} alt={movie.title} style={{ height: '450px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>
            <strong>Année :</strong> {movie.year}<br />
            <strong>Genre :</strong> {movie.genre}
          </Card.Text>
          <Card.Text>{movie.description}</Card.Text>
        </Card.Body>
      </Card>

      <h2>Commentaires</h2>
      <CommentList />
      <CommentForm />
    </Container>
  );
}

export default App;
