import mongoose from 'mongoose';
import {Address} from './Address';
import cors from 'cors';

const Schema = mongoose.Schema;
var AddressSchema = require('../models/Address').schema;
var EmployeeSchema = require('../models/Employee').schema;

let Company = new Schema({
    name: {
        type: String
    },
    baseLocation: {
        type: AddressSchema.Types.ObjectId,ref : 'Address'
    },
    locations: [{
        type: AddressSchema.Types.ObjectId,ref : 'Address'
    }],
    userName :{
        type:String
      },
    password: {
      type:String
    },
    employeeList :{
      type: EmployeeSchema.Types.ObjectId,ref : 'Employee'
    }
    ,autoCreate: true})

export default mongoose.model('Company', Company);
