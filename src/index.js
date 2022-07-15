const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

const route = require("./route/route.js");
const app = express();

app.use(bodyParser.json()); // tells the system that you want json to be used
// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true })); 

// mongoDb connection
mongoose.connect("mongodb+srv://jay123:pqwoie123@cluster0.xlqz2mn.mongodb.net/jay-DB",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

// Initial route
app.use("/", route);

// port
app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
