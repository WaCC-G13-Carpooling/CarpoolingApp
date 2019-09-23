import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Employee from './models/Employee'
import Address from './models/Address'
import Company from './models/Company'



const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://18.206.240.224:27017");

mongoose.connection.on('connected', () => console.log('Connected to server!'));
mongoose.connection.on('error', () => console.log('Connection failed with error!'));

router.route('/employees').get((req, res) => {
  Employee.find((err, employees) => {
    if(err)
      console.log(err);
    else
      res.json(employees);
  })
})

router.route('/employees/:id').get((req, res) => {
  Employee.findById(req.params.id, (err, employee) => {
    if(err)
      console.log(err);
    else
      res.json(employee);
  })
})

