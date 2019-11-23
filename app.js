const express = require("express");

const mongoose = require("mongoose");
const cron = require("node-cron");

const connectDB = require("./config/db");

const app = express();

const Url = require("./models/Url");
const Store = require("./models/Shop");
connectDB();

app.use(express.json());

    // var topics = [];
    // //convet JSON to array
    // for (var i in json_data) {
    //   var n = i.indexOf(" ");
    //   var res = i.substring(n + 1, -1);
    //   topics.push(res);
    // }

    // //remove dublicate element
    // const set1 = new Set(topics);
    // console.log("204", topics);

    // //convert back to array
    // let www = [...set1];

var arr = new Set();

cron.schedule("1 0,30 * * * *", () => {
  let shop = "mojitolabs.myshopify.com";
  Store.findOne({ name: shop }, (err, data) => {
    //   console.log(data)
    if (data) {
      data.abandanTemplate.forEach(e => {
        //   console.log(e)

        if (e.status === true) {
          arr.add(e);
        }
      });
    } else console.log(err);
    console.log("Abandan Arr-->", arr);
  });
  //   console.log(arr);
});

// define routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Serbver started on port ${PORT}`));


