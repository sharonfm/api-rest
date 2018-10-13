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
      required: true
  },
  Size: String,
  Latitude: String,
  Longitude: String
})
module.exports = mongoose.model('Hotel', HotelSchema, 'Hotel_Tourism')
