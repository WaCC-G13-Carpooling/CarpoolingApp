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
app.use('/', router);

app.listen(3002, () => console.log('express server running on port 3002'));

mongoose.connect("mongodb://18.206.240.224:27017/carpool", { useNewUrlParser: true });

mongoose.connection.on('connected', () => console.log('Connected to server!'));
mongoose.connection.on('error', () => console.log('Connection failed with error!'));

// ROUTES FOR EMPLOYEES

router.route('/employees').get((req, res) => {
  Employee.find((err, employees) => {
    if(err)
      console.log(err);
    else
      res.json(employees);
  })
})

router.route('/employees/register').post((req, res) => {
  let employee = new Employee(req.body);
  employee.save()
    .then(employee => {
      res.status(200).json({ 'employee': 'Added successfully!' })
    })
    .catch(err => {
      res.status(400).send('Failed to create new record!');
    })
});


router.route('/employees/:id').get((req, res) => {
  Employee.findById(req.params.id, (err, employee) => {
    if(err)
      console.log(err);
    else
      res.json(employee);
  })
})

router.route('/employees/delete/:id').get((req, res) => {
  Employee.findByIdAndRemove({ _id: req.params.id}, (err, employee) => {
    if(err)
      console.log(err);
    else
      res.json('Remove successfull');
  })
})

// ROUTES FOR COMPANIES

router.route('/companies').get((req, res) => {
  Company.find((err, companies) => {
    if(err)
      console.log(err);
    else
      res.json(companies);
  })
})

router.route('/companies/:id').get((req, res) => {
  Company.findById(req.params.id, (err, company) => {
    if(err)
      console.log(err);
    else
      res.json(company);
  })
})


router.route('/companies/register').post((req, res) => {
  let company = new Company(req.body);
  company.save()
    .then(company => {
      res.status(200).json({ 'company': 'Added successfully!' })
    })
    .catch(err => {
      res.status(400).send('Failed to create new record!');
    })
});

router.route('/companies/update/:id').put((req,res) => {
  Company.findById(req.params.id, (err, company) => {
    if (!company) {
      return next(new Error('Could not load document'));
    }
    else {
      company.name = req.body.name;
      company.userName = req.body.userName;
      company.password = req.body.password;
      company.baseLocation = req.body.baseLocation;
      company.employeeList = req.body.employeeList;
      company.locations = req.body.locations;

      company.save().then(issue => {
        res.json('Update done');
      }).catch(err => {
        res.status(400).send('Update failed');
      });
    }
  });
})

