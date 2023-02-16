import express from 'express';
import cors from 'cors';

import imageRoutes from './routes/images.js';

const app = express();

app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/', imageRoutes);

const PORT = 5000;

app.listen(PORT, console.log('Server running on 5000'));