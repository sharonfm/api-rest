'use strict'

const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const ReservationSchema = new Schema({
   hotelID: {
       type: String,
       required: true
   },
   userID: {
       type: String,
       required: true
   },
   startDate: {
       type: String,
       required: true
   },
   endDate: {
       type: String,
       required: true
   },
   RoomsReserved: {
       type: String,
       required: true
   }
 })

 module.exports = mongoose.model('Reservation', ReservationSchema, 'Reservations')
