import express from 'express';
import { port } from './config/environment.js';
import Router from './config/router.js';
import { connectDb } from './db/helpers.js';

const app = express();
app.use(express.json());

app.use('/api', Router);

async function startServer() {
    try {
        await connectDb();
        console.log('Mongoose is connected')
        app.listen(port, () => console.log('app is listening on port ' + port));
    } catch (err) {
        console.log('something went wrong', err)
    }
}

startServer()


