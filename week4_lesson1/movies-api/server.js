import express from 'express';
import { port } from './config/environment.js';
import Router from './config/router.js';

const app = express();

app.use('/api', Router);

app.listen(port, () => console.log('app is listening on port ' + port));
