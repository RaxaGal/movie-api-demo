import axios from 'axios';
import { getMoviebyImdb } from '../../src/controllers/moviesController';
import mongoose from 'mongoose';
import * as moc from "../../src/controllers/moviesController"
import { CONSTANTS } from '../../src/utils/app_constants';
import movie from '../../src/models/movie';

jest.mock('axios');

const _id = "64668d93bbeb045040697b7c";
const moviesTestData = {
    Title: "Race to Space",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTczNDUwMDA1NV5BMl5BanBnXkFtZTcwNTA5MTAwMQ@@._V1_SX300.jpg",
    Type: "movie",
    Year: "2001",
    imdbID: "tt0167360",
    Ratings: [
        {
            Source: "Internet Movie Database",
            Value: "5.4/10"
        },
        {
            Source: "Rotten Tomatoes",
            Value: "71%"
        }
    ],
    Actors: "Alex D. Linz, William Atherton, James Woods",
    Awards: "2 wins & 2 nominations",
    BoxOffice: "N/A",
    Country: "Germany, United States",
    DVD: "13 Aug 2002",
    Director: "Sean McNamara",
    Genre: "Drama, Family",
    Language: "English",
    Metascore: "N/A",
    Plot: "In the 1960s a young woman works at NASA as an animal trainer responsible for the chimpanzee who will go into space.",
    Production: "N/A",
    Rated: "PG",
    Released: "15 Mar 2002",
    Response: "True",
    Runtime: "104 min",
    Website: "N/A",
    Writer: "Eric Gardner, Steven H. Wilson",
    imdbRating: "5.4",
    imdbVotes: "945"
};
const mReq:any = {};
const mRes:any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

beforeAll(async ()=>{
        await mongoose.connect('mongodb://localhost:27017/', {
            dbName: 'movie_api',
            user: 'username',
            pass: 'password',
            autoCreate: true,
        });
    await movie.create(moviesTestData);
});

beforeEach(async ()=>{
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://localhost:27017/', {
            dbName: 'movie_api',
            user: 'username',
            pass: 'password',
            autoCreate: true,
        });
        await movie.create(moviesTestData);
    }
});

/* Closing database connection after all test. */
afterAll(async () => {
    await mongoose.connection.close();
  });

test('GET /movies should refresh movies collection & return an array of movies data', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({status:200, data: {Search:[moviesTestData],totalResults:1 } });
    await moc.getAllMovies(mReq, mRes);

    // expect(axios).toBeCalledWith({
    //     method: 'GET',
    //     url: process.env.OMDB_API_URL || CONSTANTS.OMDB_API_URL,
    //     // headers: { Authorization: `abc` },
    //   });
    // const result = await getAllMovies(moviesTestData.imdbID, _id);
    // expect(result).toEqual(moviesTestData);
    
    // const response = await request(app).get('/movies');

    expect(mRes.status).toBeCalledWith(200);
    // expect(mRes.json).toBe(true);

    // expect(response.status).toBe(200);
    // expect(Array.isArray(response.body)).toBe(true);
    // expect(response.body[0]?.Title).toBe(true);
});

// Catch block for function
test('GET /movies should throw an error if movies data not fetched.', async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce({status: CONSTANTS.HTTP_STATUS.SERVER_ERROR, data: {} });
    await moc.getAllMovies(mReq, mRes);
    expect(mRes.status).toBeCalledWith(500);
});

// else block for function
test('GET /movies should return an error if movies data not found.', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({status: CONSTANTS.HTTP_STATUS.SERVER_ERROR, data: {} });
    await moc.getAllMovies(mReq, mRes);
    expect(mRes.status).toBeCalledWith(404);
});

test('GET /movies/:title should return an array of movies data', async () => {
    await moc.getMoviesByFields(mReq, mRes);
    expect(mRes.status).toBeCalledWith(200);
});
// Else block
test('GET /movies/:title should return 404 if no movies data available', async () => {
    const mReq:any = {params:{title:'This is dummy title'}};
    await moc.getMoviesByFields(mReq, mRes);
    expect(mRes.status).toBeCalledWith(404);
});

// catch Block
test('GET /movies/:title should return an error if function fails', async () => {
    await mongoose.connection.close();
    await moc.getMoviesByFields(mReq, mRes);
    expect(mRes.status).toBeCalledWith(500);
});

test('getMoviebyImdb should fetch and return movies data', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: moviesTestData });
    const result = await getMoviebyImdb(moviesTestData.imdbID, _id);
    expect(result).toEqual(moviesTestData);
});

test('getMoviebyImdb should throw an error if the API call fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Failed to fetch movie data'));
    expect(getMoviebyImdb(moviesTestData.imdbID, _id)).rejects.toThrow('Failed to fetch movie data');
});