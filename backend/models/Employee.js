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
        type: Schema.Types.ObjectId, ref : "Address"
    },
    workAddress: {
      type: Schema.Types.ObjectId, ref : "Address"
  },
    isAdmin: {
      type : Boolean
    },
    hasCar : {
      type: Boolean
    },
    companyName : {
      type:String
    },
    phoneNumber : {
      type: String
    }}
    ,{autoCreate: true})

export default mongoose.model('Employee', Employee);
