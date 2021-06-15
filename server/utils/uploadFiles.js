// dependencies
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
// to pull in our environment variables
require("dotenv").config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWSAccessKeyID,
  secretAccessKey: process.env.AWSSecretKey,
  Bucket: process.env.Bucket,
});
// To check filetype before approving upload

const checkFileType = (file, callback) => {
  // allowed filetypes
  const filetypes = /jpeg|jpg|png|gif/;
  //check extension name
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
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
    }
  }),
  limits: { fileSize: 2000000 },
  fileFilter: function (req, file, callback) {
    checkFileType(file, callback);
  },
}).array("multiImage", 10); //array is going to be referred to as multi image on front end when we do an axios.post. 10 images per upload is our limit (can change)

module.exports = uploadMultiImage;
