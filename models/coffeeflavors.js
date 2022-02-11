const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coffeeSchema = new Schema ({
  name: {type: String, required: true},
  type: {type: String, required: true},
  base: {type: String, required: true},
  dairy: String,
  syrup: [String],
  added: [String]
});

const coffeeCollection = mongoose.model('Coffee', coffeeSchema);

module.export = coffeeCollection;
