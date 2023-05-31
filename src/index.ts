import express from 'express';
import mongoose from 'mongoose';
import moviesRouter from "./routes/moviesRouter";
import cors from 'cors';
import cookieParser from 'cookie-parser';
export const app = express();
const port = 3000;


app.use(cors());
app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static('This is a test'));
app.use('/api-docs', express.static('docs'));
app.use('/movies', moviesRouter);


// MongoDB connection setup

const mongoConnection = async () => {
  await mongoose.connect('mongodb://mongo:27017/', {
    dbName: 'movie_api',
    /** username for authentication, equivalent to `options.auth.user`. Maintained for backwards compatibility. */
    user: 'username',
    /** password for authentication, equivalent to `options.auth.password`. Maintained for backwards compatibility. */
    pass: 'password',
    /** Set to `true` to make Mongoose automatically call `createCollection()` on every model created on this connection. */
    autoCreate: true
  })
  console.log("Mongoose connection Initated.");

};

mongoConnection();

// ElasticSearch setup
// TODO: Add ElasticSearch setup code here


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
