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
      console.log("email not sent");
    } else {
      console.log("email SENT!");
    }
  });
});

module.exports = router
