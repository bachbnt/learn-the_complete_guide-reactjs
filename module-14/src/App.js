import React, { useCallback, useEffect, useMemo, useState } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';

import './App.css';

const dummyMovies = [
  {
    id: 1,
    title: 'Some Dummy Movie',
    openingText: 'This is the opening text of the movie',
    releaseDate: '2021-05-18',
  },
  {
    id: 2,
    title: 'Some Dummy Movie 2',
    openingText: 'This is the second opening text of the movie',
    releaseDate: '2021-05-19',
  },
];

function App() {
  const [movies, setMovies] = useState(dummyMovies);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('https://swapi.dev/api/films/');
      const data = await res.json();
      if (!res.ok) {
        throw new Error('Error');
      }
      const mappedMovies = data.results.map((item) => {
        return {
          id: item.episode_id,
          title: item.title,
          openingText: item.opening_crawl,
          releaseDate: item.release_date,
        };
      });
      setMovies(mappedMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie) => {
    const res = await fetch('', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    console.log(data);
  };

  const content = useMemo(() => {
    if (error) {
      return <p>{error}</p>;
    } else if (loading) {
      return <p>Loading...</p>;
    } else if (movies?.length === 0) {
      return <p>Empty</p>;
    } else {
      return <MoviesList movies={movies} />;
    }
  }, [error, loading, movies]);

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}>Fetch Movies</AddMovie>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
