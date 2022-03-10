import express from 'express';
import moviesController from '../controllers/moviesController.js';

const Router = express.Router();

Router.route('/movies')
  .get(moviesController.getAllMovies)
  .post(moviesController.createMovie);

Router.route('/movies/:id')
  .get(moviesController.getMovieById)
  .put(moviesController.updateMovie);

export default Router;
