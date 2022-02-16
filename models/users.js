// const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');
// const Schema = mongoose.Schema;
//
// const userSchema = new Schema({
//   _id: Schema.Types.ObjectId,
//   username: String,
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
//   },
//   password: {type: String, requried: true}
// })
//
// // userSchema.methods.authenticate = (password) => {
// //   return this.password === password;
// // }
// // userSchema.plugin(passportLocalMongoose)
// const User = mongoose.model('User', userSchema);
//
// module.exports = User;
