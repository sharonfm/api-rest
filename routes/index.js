
const express = require('express');
const hotelCtrl = require('../controllers/hotel');
const userCtrl= require('../controllers/user');
//const reservCtrl= require('../controllers/reservation');
const auth = require('../middlewares/auth');
const api= express.Router();

api.get('/hotel', hotelCtrl.getHotels);// Obtener la info de hotels
api.get('/hotel/:params', hotelCtrl.getHotel); //Acceder a un único recurso (hotelID)
api.get('/hotel/coordinates', hotelCtrl.getDistance);
api.post('/hotel', auth ,hotelCtrl.saveHotel); // Subir info
api.put('/hotel/:hotelID', auth , hotelCtrl.updateHotel); // Actualizaciones
api.delete('/hotel/:hotelID', auth , hotelCtrl.deleteHotel); // Eliminar

api.post('/hotel/generateToken', userCtrl.generateToken);

api.get('/private', auth, (req, res) => {
  res.status(200).send({message: 'Tienes acceso'})
})
api.get('/user/all',userCtrl.getAllUsers );
api.get('/user/:id', userCtrl.getUser);
api.post('/user/signUp', userCtrl.signUp);
api.put('/user/:id', userCtrl.UpdateUser);
api.delete('/user/:id', userCtrl.DeleteUser);

//api.post('/reservation/create', userCtrl.CreateReserv);


module.exports = api;
