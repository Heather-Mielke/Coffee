// const mongoose = require('mongoose');
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const checkAuth = require('./middleware/check-auth')
//
// //schema for user creation
// const User = require('./models/users.js')
//
// router.post('/signup', (req, res, next) => {
//   User.find({email: req.body.email})
//     .exec()
//     .then(user => {
//       //checking if user exists one time. If you do not use the value then it would always say the user already exists
//       if (user.length >= 1) {
//         return res.status(409).json({
//           message: "Email exists"
//         })
//       }else {
//         //hashes the password, 10 is standard salt to ensure encryption of password
//         bcrypt.hash(req.body.password, 10, (err, hash) => {
//          if (err) {
//            return res.status(500).json({
//              error: err
//            })
//          }else{
//            //creating a new user
//            const user = new User({
//              _id: new mongoose.Types.ObjectId(),
//              email: req.body.email,
//              password: hash
//             })
//             //saves the user and displays message if created or catches error that occured
//             user
//             .save()
//             .then(result => {
//               console.log(result);
//               res.status(201).json({
//                 message:'User Created'
//               })
//             })
//             .catch(err => {
//               console.log(err);
//               res.status(500).json({
//                 error:err
//               })
//             })
//           }
//         })
//       }
//     })
//   })
//
// router.post('/login', (req, res, next) => {
//   User.find({email: req.body.email})
//   .exec()
//   .then(user => {
//     if (user.length < 1) {
//       return res.status(401).json({
//         message: 'Auth failed'
//       })
//     }
//     bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//       if (err) {
//         return res.status(401).json({
//           message: 'Auth failed'
//         })
//       }
//       if (result) {
//         const token = jwt.sign({
//           email: user[0].email,
//           userId: user[0]._id
//         }, process.env.JWT_KEY,
//         {
//           expiresIn: '1h'
//         }
//       )
//         return res.status(200).json({
//           message: 'Auth successful',
//           token: token
//         })
//       }
//       res.status(401).json({
//         message:'Auth failed'
//       })
//     })
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({
//       error:err
//     })
//   })
// })
//
//
// router.delete('/:userId', (req, res, next) => {
//   User.deleteOne({_id: req.params.userId})
//   .exec()
//   .then(result => {
//     res.status(200).json({
//       message: 'User deleted'
//     })
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({
//       error:err
//     })
//   })
// })
//
// module.exports = router;
