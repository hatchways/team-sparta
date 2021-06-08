const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const uploadMultiImage = require("../utils/uploadFiles");
const multer = require('multer');

const {
  createSubmission,
  getSubmissionById,
  getAllSubmissions,
  // updateSubmission,
} = require("../controllers/submission");
const { validateSubmission } = require("../validate");

router.use(protect);
/**
 * router that calls the AWS Middleware handler that uses multer to handle multiform data to allow req.body to be viewed with file being uploaded
 * Tests the file to check if it is empty, or correct file type. Then passes to createSubmissions handler
 */
router.route("/").post(function (req, res, next) {
   uploadMultiImage(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.send(err)
    } else if (err) {
      res.send(err)
    } else if (!req.files){
      res.send('Please select an image to upload');
    }
    createSubmission(req,res, next);
    // Everything went fine.
  });
});
//providing data back to the controller in the format of contest_id/ creator ID/
router.route("/submissions/:id/:creator/").get(getAllSubmissions);
router.route("/:id/:creator").get(getSubmissionById);
// router.route("/:id").patch(validateSubmission, updateSubmission);

module.exports = router;
