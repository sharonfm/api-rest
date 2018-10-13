//Autenticación

 const mongoose= require('mongoose')
 const User= require('../models/user')
 const service = require('../services')
//hola
 function signUp(req, res){
   const body= req.body;
   const user= new User(body);
   user.save()
        .then((created) => {
            res.json({
                state: 1,
                userID: created._id,
                //token: service.createToken(user)
            });
        })
        .catch((err) => {
            res.json({
              err,
              state: 0
            });
        });

 }


function generateToken(req, res){
  const company= {
    contact_name: req.body.contact_name,
    company: req.body.company,
    email: req.body.email
  };
  const token= service.createToken(company)
  res.json({token: token, message: "Token generated"})
}

function getAllUsers(req, res){
  const body= req.body;
  User.find({})
  .then((user) =>{
    res.json(user);
  })
  .catch((err) =>{
    res.json(err);
  })
}
function getUser(req, res){
  const id= req.params.id;
  User.findById(id)
  .then((user) =>{
    res.json(user);
  })
  .catch((err) =>{
    res.json(err);
  })
}
function UpdateUser(req, res){
  const body= req.body;
  const id= req.params.id;
  User.findById(id)
  .then((user) =>{
    const doc2= user;
    Object.assign(doc2, body);
    const doc= new User(doc2);

    doc.save()
    .then((updated) =>{
      res.json({message: 'User Updated', updated});
    })
    .catch((err) => {
      res.json(err);
    })
  })
  .catch((err) =>{
    res.json(err);
  })
}
function DeleteUser(req, res){
  const id= req.params.id;
  User.findById(id)
  .then((user) =>{
    const doc2= user;
    const doc= new User(doc2);

    doc.remove()
    .then((removed) =>{
      res.json({message: 'User Deleted', removed});
    })
    .catch((err) => {
      res.json(err);
    })
  })
  .catch((err) =>{
    res.json(err);
  })
}
 module.exports = {
  signUp,
  generateToken,
  getAllUsers,
  getUser,
  UpdateUser,
  DeleteUser
 }
