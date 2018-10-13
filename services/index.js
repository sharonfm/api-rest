'use strict'

const jwt= require('jwt-simple')
const moment = require('moment')
const config= require('../config')

function createToken(user){
  const payLoad= {
    'contact name': user.name,
    company: user.company,
    email: user.email
  }
  return jwt.encode(payLoad, config.SECRET)
}
function decodeToken (token){
  const decoded= new Promise((resolve, reject) => {
    try{
      const payload= jwt.decode(token, config.SECRET)

      resolve(payload.sub)
    }catch(err){
      reject({
        status: 500,
        message: 'Invalid Token'
      })
    }
  })
  return decoded
}
module.exports= {
createToken,
decodeToken
}
