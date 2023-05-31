import axios from "axios";
import movie from "../models/movie";
import { CONSTANTS } from "../utils/app_constants";
import { Request, Response } from "express";

/**
 * Get all Movies from MongoDB
 * @route GET /movies
 * @group Movies - Operations about movies
 * @returns 200 - An array of movies Objects
 * @security none
 */
export const getAllMovies = async (req: Request, res: Response) => {
    const title: string = 'space';
    let totalHits: number = 0;
    let currentPage: number = 1;
    let totalPages: number = 1;
    let movieData = [];
    try {
        do {
            const response: any = await fetchMoviesFromOmdb(title, currentPage);
            if (response.data && response.data?.Search) {
                movieData.push(...(response.data?.Search));
            }
            if (!totalHits) {
                totalHits = response?.data?.totalResults || 1;
                totalPages = Math.ceil(totalHits / 10);
                await movie.deleteMany({})
            }
            currentPage++;
        } while (totalPages >= currentPage);

        if (movieData?.length) {
            await movie.create(movieData, { timestamps: true, });
            const importedMovies = await movie.find();
            res.status(CONSTANTS.HTTP_STATUS.OK).json(importedMovies);
        } else {
            res.status(CONSTANTS.HTTP_STATUS.NOT_FOUND).json('Failed to fetch movie data from OMDB.');
        }
    } catch (error) {
        console.error('Failed to fetch movie data', error);
        res.status(CONSTANTS.HTTP_STATUS.SERVER_ERROR).json('Failed to fetch movie data.');
    }
};

export const getMoviesByFields = async (req: Request, res: Response) => {
    const params = req.params?.title || 'space';
    const docsPerPage = parseInt(req.params?.docsPerPage) || 5;
    const pageNumber = parseInt(req.params?.pageNumber) || 0;
    try {
        const movieData = await movie.find().or([
            { Title: { "$regex": params, "$options": "i" } },
            { Director: { "$regex": params, "$options": "i" } },
            { Plot: { "$regex": params, "$options": "i" } }
        ])
            .skip(docsPerPage * pageNumber)
            .limit(docsPerPage)
        if (movieData?.length) {
            res.status(CONSTANTS.HTTP_STATUS.OK).json(movieData);
        } else {
            res.status(CONSTANTS.HTTP_STATUS.NOT_FOUND).json({ error: "No movies found." });
        }
    } catch (error) {
        console.error('Failed to fetch movie data', error);
        res.status(CONSTANTS.HTTP_STATUS.SERVER_ERROR).json({ error: 'Failed to fetch movie data' });
    }
};

export const getMoviebyImdb = async (imdbID: string, docId: string) => {
    try {
        const response = await axios.get(process.env.OMDB_API_URL || CONSTANTS.OMDB_API_URL, {
            params: {
                apiKey: process.env.OMDB_API_KEY || CONSTANTS.OMDB_API_KEY,
                i: imdbID,
                plot: 'full'
            },
        });
        const movieData = response?.data;
        if (movieData) {
            await movie.updateOne({ _id: docId }, movieData);
        }
        return movieData;
    } catch (error) {
        console.error('Failed to fetch movie data', error);
        throw Error('Failed to fetch movie data');
    }
};

const fetchMoviesFromOmdb = async (title: string, currentPage: number) => {

    const request = axios.get(process.env.OMDB_API_URL || CONSTANTS.OMDB_API_URL, {
        params: {
            apiKey: process.env.OMDB_API_KEY || CONSTANTS.OMDB_API_KEY,
            s: title,
            y: 2001,
            type: 'movie',
            page: currentPage
        },
    });
    return request;
}