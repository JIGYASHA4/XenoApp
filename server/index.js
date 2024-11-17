const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const XenoModel = require("./models/Xeno");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/xeno", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  XenoModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("The password is incorrect");
        }
      } else {
        res.json("No record existed");
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error" });
    });
});

app.post("/create", (req, res) => {
  XenoModel.create(req.body)
    .then((customer) => res.json(customer))
    .catch((err) => {
      res.status(500).json({ error: "Failed to create record", details: err });
    });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
