const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.sendGridKey);

//dummy message for now. we can think about templates etc once we have models, controller set up 
const msg = {
  to: "vicscherman@gmail.com",
  from: "hatchwayssparta@gmail.com",
  subject: "With love from TattooArt!",
  text: "This is a test email sent from our back end server",
};

router.post("/sendemail", (req, res) => {
  sgMail.send(msg, function (err, info) {
    if (err) {
      res.status(404).json('Email not sent :(')
      console.log("email not sent");
    } else {
      res.status(201).json('Email sent successfully!')
      console.log("email SENT!");
    }
  });
});

module.exports = router
