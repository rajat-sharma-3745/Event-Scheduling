import express from 'express'
import cors from 'cors';
import 'dotenv/config';
import { errorMiddleware } from './middlewares/error.js';
import cookieParser from 'cookie-parser';




const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Welcome to Events');
})






app.use(errorMiddleware)

app.listen(PORT, () => console.log('Server Running on port', PORT))