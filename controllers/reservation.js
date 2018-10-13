
const mongoose = require('mongoose');
const Reservation = require('../models/reservation')
const Hotel= require('../models/hotel')

function CreateReservation(req, res){
  const booking = req.body;
  //  console.log(booking);
    Reservation.aggregate([
        {
        $match: {
            $and: [{
                hotelID: booking.hotelID,
            },
                {
                startDate: {
                    $lte: booking.endDate,
                },
            }, {
                endDate: {
                    $gte: booking.startDate,
                },
            }] },
        }, {
        $group: {
            _id: null,
            total: {
                $sum: "$RoomsReserved"
            }
        }
    }])
    .then(function(result) {
        const booked = result;
        //console.log(booked);
        let availables;
        Hotel.findById(booking.hotelID)
            .then((hotel) => {
                //console.log(hotel);
                if (booked.length !== 0) {
                  //  console.log(booked[0]);
                    availables = hotel.Rooms - booked[0].total;
                } else {
                    availables = hotel.Rooms;
                }
                //console.log(availables);
                if(availables >= booking.RoomsReserved) {
                    const document = new Reservation(req.body);
                    document.save()
                        .then((saved) => {
                            res.json({
                                success: true,
                                message: 'Rooms Reserved',
                                reservationID: saved._id
                            });
                        })
                        .catch((err) => {
                            res.json(err);
                        })
                } else {
                    res.json({
                        success: false,
                        message: 'Cannot reservate because there are no more rooms availables'
                    });
                }
            })
    })
};

module.exports= {CreateReservation}
