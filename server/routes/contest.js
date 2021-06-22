const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createContest,
  getContestById,
  getAllContests,
  updateContest,
  createContestCharge,
  selectContestWinner,
} = require("../controllers/contest");
const { validateContest } = require("../validate");

router.route("/").post(protect, validateContest, createContest);
router.route("/contests").get(getAllContests);
router.route("/winner").get(selectContestWinner);
router.route("/charge").post(createContestCharge);

router.route("/:id").get(protect, getContestById);
router.route("/:id").patch(protect, validateContest, updateContest);


module.exports = router;
