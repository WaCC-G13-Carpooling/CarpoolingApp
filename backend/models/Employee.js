import mongoose from 'mongoose';
import Address from './Address';
import cors from 'cors';

const Schema = mongoose.Schema;
var AddressSchema = require('../models/Address').schema;

let Employee = new Schema({
    userName: {
        type: String
    },
    password: {
      type:String
    },
    firstName: {
      type:String
    },
    lastName: {
      type:String
    },
    homeAddress: {
        type: String
    },
    workAddress: {
      type: String
  },
    isAdmin: {
      type : Boolean
    },
    hasCar : {
      type: String
    },
    companyName : {
      type:String
    },
    phoneNumber : {
      type: String
    },
    vehicleCapacity:{
      type:Number
  }}
  ,{autoCreate: true})

export default mongoose.model('Employee', Employee);
