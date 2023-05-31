import mongoose, { Schema, Document } from 'mongoose';
import { getMoviebyImdb } from '../controllers/moviesController';

interface IMovie extends Document {
  Title: string;
  Poster: string;
  Type: string;
  Year: string;
  imdbID: string;
  Director: string;
  Rated: string,
  Released: string,
  Runtime: string,
  Genre: string,
  Writer: string,
  Actors: string,
  Plot: string,
  Language: string,
  Country: string,
  Awards: string,
  Ratings: object[],
  Metascore: string,
  imdbRating: string,
  imdbVotes: string,
  DVD: string,
  BoxOffice: string,
  Production: string,
  Website: string,
  Response: string,
}

const movieSchema = new Schema<IMovie>({
  Title: { type: String, required: true },
  Poster: { type: String, required: true },
  Type: { type: String, required: true },
  Year: { type: String, required: true },
  imdbID: { type: String, required: true },
  Director: { type: String, required: false },
  Rated: { type: String, required: false },
  Released: { type: String, required: false },
  Runtime: { type: String, required: false },
  Genre: { type: String, required: false },
  Writer: { type: String, required: false },
  Actors: { type: String, required: false },
  Plot: { type: String, required: false },
  Language: { type: String, required: false },
  Country: { type: String, required: false },
  Awards: { type: String, required: false },
  Ratings: { type: [Object], required: false },
  Metascore: { type: String, required: false },
  imdbRating: { type: String, required: false },
  imdbVotes: { type: String, required: false },
  DVD: { type: String, required: false },
  BoxOffice: { type: String, required: false },
  Production: { type: String, required: false },
  Website: { type: String, required: false },
  Response: { type: String, required: false },
});

movieSchema.post('save', async (doc: any) => {
  await getMoviebyImdb(doc.imdbID, doc._id?.toHexString());
});

export default mongoose.model<IMovie>('Movie', movieSchema);
