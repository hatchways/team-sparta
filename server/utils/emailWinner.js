const express = require("express");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.sendGridKey);

const emailWinner = (email, name) => {
  //we would send the messages to emails passed in but for
  //testing purposes will be using my own email address
  const msg = {
    to: "milad9890@gmail.com",
    from: "hatchwayssparta@gmail.com",
    subject: "Contest Winner",
    text: `Hello ${name} congratulations on winning the contst your prize money has been sent`,
  };

  sgMail.send(msg, function (err, info) {
    if (err) {
      console.log("email not sent");
    } else {
      console.log("email SENT!");
    }
  });
};

module.exports = emailWinner;
