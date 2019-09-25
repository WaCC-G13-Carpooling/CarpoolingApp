import mongoose from 'mongoose';
import cors from 'cors';

const Schema = mongoose.Schema;

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
    employeeList : [{
      type: String
    }]},{autoCreate: true})

export default mongoose.model('Company', Company);
