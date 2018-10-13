'use strict'

const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const HotelSchema = Schema({
  'HOTEL NAME': {
      type: String,
      required: true
  },
  ADDRESS: {
      type: String,
      required: true
  },
  STATE: {
      type: String,
      required: true
  },
  PHONE: String,
  FAX: String,
  'EMAIL ID': {
      type: String,
      unique: true,
      dropDups: true
  },
  WEBSITE: String,
  TYPE: {
      type: String,
      required: true
  },
  Rooms: {
      type: Number,
      required: true,
      min: 10
  },
  Size: String,
  Latitude: String,
  Longitude: String
})
HotelSchema.pre('save', function Save(next) {
    if (this.Rooms >= 10 && this.Rooms <= 50) {
        this.Size = 'Small';
    } else if (this.Rooms >= 51 && this.Rooms < 100) {
        this.Size = 'Medium';
    } else if (this.Rooms >= 100) {
        this.Size = 'Large';
    }
    next();
})
module.exports = mongoose.model('Hotel', HotelSchema, 'Hotel_Tourism')
