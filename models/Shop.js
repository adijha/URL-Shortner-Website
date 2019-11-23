const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
	test: [
		{
			_id: false,
			id: { type: Number, required: true, dropDups: true },
			phone: Number,
			url: String,
			dataTime: { type: String, default: Date(Date.now()).toString() },
			purchase: { type: Boolean, default: false },
			followUp: { type: Number, default: 0 }
		}
	]
});

const Store = new mongoose.model('Store', shopSchema);
