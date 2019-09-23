import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://18.206.240.224:27017");

mongoose.connection.on('connected', () => console.log('Connected to server!'));
mongoose.connection.on('error', () => console.log('Connection failed with error!'));
