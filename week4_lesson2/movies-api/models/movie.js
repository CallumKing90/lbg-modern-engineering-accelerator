import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    genre: String,
    releaseYear: Number,
})

movieSchema.plugin(mongooseUniqueValidator);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;