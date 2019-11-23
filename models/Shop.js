const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: String,
  data: JSON,
  orders: [
    {
      _id: false,
      id: { type: Number, required: true, dropDups: true },
      phone: Number,
      url: String,
      dataTime: { type: String, default: Date(Date.now()).toString() },
      purchase: { type: Boolean, default: false },
      followUp: { type: Number, default: 0 }
    }
  ],

  sms: Array,
  smsCount: Number,
  template: [
    {
      _id: false,
      topic: { type: String, required: true, dropDups: true },
      customer: String,
      admin: String
    }
  ],
  abandanTemplate: [
    {
      _id: false,
      topic: { type: String, required: true, dropDups: true },
      template: String,
      time: String,
      status: Boolean
    }
  ]
});

module.exports = mongoose.model("Store", shopSchema);
