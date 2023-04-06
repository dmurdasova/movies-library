import React from 'react';
import { useRoutes } from 'react-router-dom';
import './App.scss';
import MoviePage from './movie-page/MoviePage';
import Movies from './movies/Movies';

function App() {
    const routes = useRoutes([
        { path: '/', element: <Movies /> },
        { path: '/:id', element: <MoviePage /> }
    ]);

    return routes;
}

export default App;
