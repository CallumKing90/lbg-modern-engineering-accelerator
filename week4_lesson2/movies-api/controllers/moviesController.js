import Movie from '../models/movie.js'

async function getAllMovies(req, res, next) {
    try {
        const movies = await Movie.find();
        return res.status(200).json(movies)
    } catch (err) {
        next(err)
    }
}

async function createMovie(req, res, next) {
    try {
        const newMovie = await Movie.create(req.body);
        return res.status(201).send(newMovie)
    } catch (err) {
        next(err)
    }
}

async function getMovieById(req, res, next) {
    const { id } = req.params;

    try {
        const movie = await Movie.findById(id)
        return res.status(200).send(movie)
    } catch(err) {
        next(err)
    }
}

async function updateMovie(req, res, next) {
    const {id} = req.params
    const {body} = req

    try {
        const movie = await Movie.findById(id);
        movie.set(body)

        movie.save();

        return res.status(200).json(movie)
    } catch(err) {
        next(err)
    }
}

export default { getAllMovies, createMovie, getMovieById, updateMovie }