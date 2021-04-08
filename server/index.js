const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const fs = require("fs");
const axios = require("axios");

const User = require("./schemas/User");
const verifyUser = require("./modules/authentication");

require("dotenv").config();
const app = express();

const dbUri =
  "your mongo connect url";

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));

//Add user api
app.post("/adduser", async (req, res) => {
  const registerInfo = req.body;
  registerInfo.password = await bcrypt.hash(registerInfo.password, 10);

  try {
    await User.create(registerInfo);
    res.send("success");
  } catch (error) {
    if (error.code === 11000) {
      res.send("unameerror");
    }
    throw error;
  }
});

//Login authentication api
app.post("/loginAuth", async (req, res) => {
  const LoginInfo = req.body;
  console.log(LoginInfo);
  try {
    const user = await User.findOne({ username: LoginInfo.username }).lean();
    if (!user) {
      return res.json({
        status: "error",
        message: "*username not found ",
      });
    }

    if (await bcrypt.compare(LoginInfo.password, user.password)) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET
      );
      return res.json({
        status: "ok",
        message: "Login Successful",
        token: token,
      });
    } else {
      return res.json({
        status: "error",
        message: "*password did not match ",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//Get user info api
app.post("/getuser", verifyUser, (req, res) => {
  const { username } = req.body;
  User.find({ username: username })
    .then((result) => {
      res.send(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
    });
});

//File upload
app.post("/uploadProfilePic", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const username = req.body.username;

  try {
    const user = User.findOne({ username: username }).lean();
    if (!user) {
      console.log(err);
    }
    const file = req.files.file;
    file.mv(
      `${__dirname}/hackapp/public/profileUploads/${file.name}`,
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        // User.
        res.json({ filePath: `/uploads/${file.name}` });
      }
    );

    var profilePath = "/profileUploads/" + file.name;

    User.findOneAndUpdate(
      { username: username },
      { profilePic: profilePath },
      (err, data) => {
        if (err) {
          console.log(err);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

//update user info
app.post("/updateUser", (req, res) => {
  if (req.body === null) {
    return res.status(400).json({ msg: "No value changed" });
  }

  const { username, address, state, zip } = req.body;
  try {
    const user = User.findOne({ username: username }).lean();
    if (!user) {
      return res.json({ msg: "No user found" });
    }

    User.findOneAndUpdate(
      { username: username },
      { address: address, state: state, zip: zip },
      (err, data) => {
        if (err) {
          console.log(err);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

//delete user
app.post("/deleteUser", (req, res) => {
  const { username } = req.body;
  User.deleteOne({ username: username }, (err, response) => {
    if (err) {
      console.log(err);
    }
  });
});

//find vaccines
app.post("/vaccines", (req, res) => {
  const { zip, radius } = req.body;
  axios
    .get(
      `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.LOCATION_API}=${zip}`
    )
    .then((response) => {
      var lat = response.data.results[0].locations[0].latLng.lat;
      var lng = response.data.results[0].locations[0].latLng.lng;

      axios
        .get(
          `https://api.us.castlighthealth.com/vaccine-finder/v1/provider-locations/search?medicationGuids=779bfe52-0dd8-4023-a183-457eb100fccc,a84fb9ed-deb4-461c-b785-e17c782ef88b,784db609-dc1f-45a5-bad6-8db02e79d44f&lat=${lat}&long=${lng}&radius=${radius}`
        )
        .then((vacc) => {
          res.send(vacc.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Server
app.listen(3001, () => {
  console.log("server running");
});
