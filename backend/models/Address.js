import mongoose from 'mongoose';
import cors from 'cors';

const Schema = mongoose.Schema;

let Address = new Schema({
    streetName: {
        type: String
    },
    houseNumber: {
        type: Number
    },
    addition: {
        type: String
    },
    zipCode: {
        type: String
    },
    autoCreate: true})

export default mongoose.model('Address', Address);
