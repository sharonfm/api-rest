'use strict'
const Hotel= require('../models/hotel')//esquema de hotel
//const https = require('https')

function getHotels (req,res){
  const params = req.query //porque viene como parámetro en la url

  Hotel.find(params, (err, hotel) => {
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}` })
    if(!hotel) return res.status(404).send({message: `El hotel no existe`})
    //Si no ocurre nada de esto es pq si existe.
    res.status(200).send({ hotel })
  })
  /*
  Hotel.find({}).exec().then((docs) => {
         docs.forEach(function(hotel, index) {
             const address = hotel.ADDRESS.replace(/["]+/g, '');

             if(hotel.Latitude ===  undefined ){
               console.log(hotel.Latitude ===  undefined)
             https.get("https://geocoder.api.here.com/6.2/geocode.json?app_id=sNvkDXsVsZ5XFarQRCeF&app_code=T30x8qywRMP_zpZVcjRN8A&searchtext=" + address, (resp) => {
                 let data = '';
                 resp.on('data', (chunk) => {
                     data += chunk;
                 });
                 resp.on('end', () => {
                     try {
                      JSON.parse(data).Response.View.length;
                         const coordinates = JSON.parse(data).Response.View[0].Result[0].Location.NavigationPosition[0];
                         //console.log(coordinates);
                         //console.log("i'm here ")
                         Hotel.updateMany({ADDRESS: hotel.ADDRESS}, { Latitude: coordinates.Latitude, Longitude: coordinates.Longitude }, (err) => {});
                     } catch(e) {}
                 })
             })
           }

         });
     })*/
     //res.json({});
}

function getHotel (req, res){
  Hotel.find({},(err, hotels) => {//encuentre todos
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}` })
    if (!hotels) return res.status(404).send({message: `No existen hoteles`})
    //Si todo salió bien
    res.status(200).send({hotels});
  })
}

function getDistance(req, res){
  const params= req.query;
  function haversineDistance(par) {
         function toRad(x) {
             return x * Math.PI / 180;
         }
         var lat1 = par.lat1;
         var lon1 = par.long1;

         var lat2 = par.lat2;
         var lon2 = par.long2;

         var R = 6371; // km earth

         var x1 = lat2 - lat1;
         var dLat = toRad(x1);

         var x2 = lon2 - lon1;
         var dLon = toRad(x2)
         var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
             Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
             Math.sin(dLon / 2) * Math.sin(dLon / 2);
         var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
         var d = R * c;

         return d;
     }

  let A= [];
  Hotel.find({})
  .then((docs) => {
    docs.forEach(function(hotel, index) {
      console.log("Hola");
      const coordinates = {
        'lat1': params.Latitude,
        'long1': params.Longitude,
        'lat2': hotel.Latitude,
        'long2': hotel.Longitude
      };
                    const d = haversineDistance(coordinates);
                    console.log(d);
                    if (d <= params.Range) {
                        A.push(hotel);
                    }
                });
                res.json(A);
            }).catch(err => {
       if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}` });
        if(!hotel) return res.status(404).send({message: `El hotel no existe`});
     })
}

function saveHotel (req,res) {
  console.log('POST/api/hotel')
  console.log(req.body) //con esto tenemos todo el modelo
  let hotel = new Hotel()

  hotel.save((err, hotelStored) => {
    if(err) res.status(500).send({message: `Error al guardar en la base de datos ${err} `})
    res.status(200).send({hotel: hotelStored})
  })
}

function updateHotel (req, res){
  let hotelID = req.params.hotelID
  let update = req.body
  Hotel.findByIdAndUpdate(hotelID, update, (err, hotelUpdated) => {
    if(err) res.status(500).send({message: `Error al actualizar el hotel ${err}`})
     res.status(200).send({hotel: hotelUpdated })
  })
}

function deleteHotel (req, res){
  let hotelID = req.params.hotelID
    Hotel.findById(hotelID, (err, hotel) => {
      if (err) res.status(500).send({message: `Error al borrar el hotel: ${err}`})
      hotel.remove(err => {
        if (err) res.status(500).send({message: `Error al borrar el hotel: ${err}`})
        res.status(200).send({message:'El hotel ha sido elminado '})
      })
    })
}

module.exports= {
  getHotel,
  getHotels,
  getDistance,
  saveHotel,
  updateHotel,
  deleteHotel
}
