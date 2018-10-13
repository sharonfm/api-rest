'use strict'

const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
   email: {
       type: String,
       required: true,
       unique: true,
       dropDups: true
   },
   password: {
       type: String,
       required: true
   },
   name: {
       type: String,
       required: true
   },
   lastname: {
       type: String,
       required: true
   },
   address: {
       type: String,
       required: true
   }
 })

 module.exports = mongoose.model('user', UserSchema, 'Users')
