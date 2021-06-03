// Dependencies for helper functions and AWS credentials. Couldn't get these working in external utils file. Will try to address later
const aws = require('aws-sdk')
const multerS3 = require("multer-s3")
const multer = require('multer')
const path= require('path')
require('dotenv').config

// route dependencies
const express = require("express");
const router = express.Router();

// declaring aws bucket credentials
const s3 = new aws.S3({
  accessKeyId: process.env.AWSAccessKeyID,
  secretAccessKey: process.env.AWSSecretKey,
  Bucket: process.env.Bucket,
});

//to check filetype before approving upload
const checkFileType = (file, callback) => {
  // allowed filetypes
  const filetypes = /jpeg|jpg|png|gif/;
  //check extension name
  const extname = filetypes.test(
    path,
    extname(file.originalname).toLowerCase()
  );
  // Check mimetype to identify file based on format
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return callback(null, true);
  } else {
    callback("You can only upload image files");
  }
};

// For uploading one or more of the approved image types (jpeg, jpg, png, gif)
// check multer s3 npm docs for more info
const uploadMultiImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.Bucket,
    // means anyone can see the file
    acl: "public-read",
    // filename
    key: function (req, file, callback) {
      callback(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 2000000 },
  fileFilter: function (req, file, callback) {
    checkFileType(file, callback);
  },
}).array("multiImage", 10); //array is going to be referred to as multi image on front end when we do an axios.post. 10 images per upload is our limit (can change)


// image upload route

router.post("/images-upload", (req, res) => {
  uploadMultiImage(req, res, (error) => {
    console.log("uploaded files", req.files);
    if (error) {
      console.log("errors", error);
      // we can use this to display error notifications
      res.json({ error: error });
    } else {
      //if files not found
      if (req.files === undefined) {
        console.log("ERROR: No file selected");
        res.json("Error: No file selected");
      } else {
        // if successful
        let fileArray = req.files,
          fileLocation;
        const multiImageLocationArray = [];
        for (let i = 0; i < fileArray.length; i++) {
          fileLocation = fileArray[i].fileLocation;
          console.log("FILE URL", fileLocation);
          multiImageLocationArray.push(fileLocation);
        }
        // Here we could save the file name to the database
        res.json({
          filesArray: filesArray,
          locationArray: multiImageLocationArray,
        });
      }
    }
  });
});

module.exports = router;
