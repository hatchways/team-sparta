// route dependencies
const express = require("express");
const router = express.Router();
const uploadMultiImage = require("../utils/uploadFiles");

// images upload route

router.post("/images-upload", (req, res) => {
  uploadMultiImage(req, res, (error) => {
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
          fileLocation = fileArray[i].location;
          multiImageLocationArray.push(fileLocation);
          console.log("URLS ", fileLocation);
        }
        // Here we could save the file name to the database
        res.json({
          filesArray: fileArray,
          locationArray: multiImageLocationArray,
        });
      }
    }
  });
});

module.exports = router;
