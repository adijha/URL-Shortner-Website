const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
	urlCode: String,
	longUrl: String,
	shortUrl: String,
	followUp: String,
	shop: String,
	id: String
});

module.exports = mongoose.model('Url', urlSchema);
