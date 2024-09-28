import express from 'express';
import cors from 'cors';
import dbConfig from './dbConfig.js'
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import user from './app/apis/user.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(cors());



if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/fe/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'fe', 'build', 'index.html'));
    })
}


app.get('/ping', (req, res) => {
    res.send('Hello World');
})

user(app);

mongoose.set('debug', false);

app.listen(4152, () => {
    console.log('Server is running on port 4152');
})
