const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createContest,
  getContestById,
  getAllContests,
  updateContest,
} = require("../controllers/contest");
const { validateContest } = require("../validate");

router.use(protect);

router.route("/").post(validateContest, createContest);
router.route("/contests").get(getAllContests);
router.route("/:id").get(getContestById);
router.route("/:id").patch(validateContest, updateContest);

module.exports = router;
