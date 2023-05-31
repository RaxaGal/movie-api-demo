import express from 'express';
let router = express.Router();
import asyncHandler from "express-async-handler";
import * as movieCtrl from "../controllers/moviesController";


router.route("/").get(asyncHandler(movieCtrl.getAllMovies));
router.route("/:title").get(asyncHandler(movieCtrl.getMoviesByFields));
export default router;
