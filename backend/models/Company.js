import mongoose from 'mongoose';
import cors from 'cors';

const Schema = mongoose.Schema;
var EmployeeSchema = require('../models/Employee').schema;

let Company = new Schema({
    name: {
        type: String
    },
    baseLocation: {
        type: String
    },
    locations: [{
        type: String
    }],
    userName :{
        type:String
      },
    password: {
      type:String
    },
    employeeList :{
      type: Schema.Types.ObjectId,ref : 'Employee'
    }},{autoCreate: true})

export default mongoose.model('Company', Company);
