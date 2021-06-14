const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const uploadMultiImage = require("../utils/uploadFiles");
const multer = require('multer');

const {
  createSubmission,
  getSubmissionById,
  getAllSubmissions,
} = require("../controllers/submission");
const { validateSubmission } = require("../validate");

router.use(protect);
//Calling AWS handler then forwarding updated parameters to createSubmission handler
router.route("/").post(function (req, res, next) {
   uploadMultiImage(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.send(err)
    } else if (err) {
      res.send(err)
    } else if (!req.files){
      res.send('Please select an image to upload');
    }
    createSubmission(req,res, next);
  });
});
//providing data back to the controller in the format of contest_id/ creator ID/
router.route("/submissions/:id/:creator/").get(getAllSubmissions);
router.route("/:id/:creator").get(getSubmissionById);

module.exports = router;
