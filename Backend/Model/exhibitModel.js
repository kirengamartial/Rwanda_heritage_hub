// exhibitModel.js
const mongoose = require('mongoose');

const exhibitSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

const Exhibit = mongoose.model('Exhibit', exhibitSchema);

module.exports = Exhibit;
