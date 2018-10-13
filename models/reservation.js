'use strict'

const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const ReservationSchema = new Schema({
  Userid: {
   type: String,
   required: true,
 },
 idHotel: {
   type: String,
   required: true
 },
 'HOTEL NAME': {
   type: String
 },
 startDate: {
   type: String,
   required: true
 },
 State: {
   type: String,
   required: true
 },
 endDate: {
   type: String,
   required: true
 },
 RoomsReserved: {
   type: Number,
   required: true,
   min: [1, 'You need to book at least 1 room']
 }
 })

 module.exports = mongoose.model('Reservation', ReservationSchema, 'Reservations')
