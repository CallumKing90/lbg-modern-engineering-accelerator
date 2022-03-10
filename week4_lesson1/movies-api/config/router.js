import express from 'express';

const Router = express.Router();

Router.route('/movies').get((req, res) =>
  res.send('We got a request to /movies')
);

Router.route('/movies/:id').get((req, res) => {
  return res.send('we got a req to /movies:id');
});

export default Router;
