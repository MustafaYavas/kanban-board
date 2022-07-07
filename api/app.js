import boardsRoutes from './routes/boards-routes.js';   // boardsRoutes is a kind of middleware
import usersRoutes from './routes/users-routes.js';
import HttpError from './models/http-error.js';

import express from 'express';

const app = express();
const port = 5000;

app.use(express.json());
/*
This will parse any incoming requests body and extract any JSON data which is in there, convert it to regular Javascript data structures like objects and arrays and then call next automatically so that we reached the next middleware nd then also add this JSON data
*/

app.use('/api/boards', boardsRoutes);  // -----> /api/boards/...
app.use('/api/users', usersRoutes);  // -----> /api/users/...


// if it doesn't match any route
app.use((req, res, next) => {
    throw new HttpError('Could not found this route!', 404);
})


// Triggered if there is an error in the routes. e.g. for a board not found in db
app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error)
    }

    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occured!'});
})

app.listen(port, () => {
	console.log(`Server is up on port: ${port}`);
});
