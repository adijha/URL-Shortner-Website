const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Url = require("../models/Url");
// const Store = require("../models/Shop");

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

const Store = new mongoose.model("Store", shopSchema);

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      Store.updateOne(
        { "test.id": 1 },
        {
          $set: {
            "test.$.followUp": 9999
          }
        },
        function(err, data) {
          if (!err) {
            console.log(data);
          } else {
            console.log(err);
          }
        }
      );

      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
