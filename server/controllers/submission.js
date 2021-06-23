const Submission = require("../models/Submission");
const Contest = require("../models/Contest");
const asyncHandler = require("express-async-handler");
const uploadMultiImage = require("../utils/uploadFiles");
const { updateContest } = require("./contest");

exports.createSubmission = asyncHandler(async (req, res, next) => {
  const { contest, user, file } = req.body;

  let contestFound = await Contest.findById(contest._id);

  if (contestFound) {
    const createdSubmission = await Submission.create({
      creator: user.id,
      contest_id: contestFound._id,
      files: file,
    });

    if (createdSubmission) {
      let submissionArray = contestFound.submissions;
      submissionArray.push(createdSubmission._id);
      const updatedContest = await Contest.findByIdAndUpdate(
        contest._id,
        {
          submissions: submissionArray,
        },
        { new: true }
      );

      if (updatedContest) {
        res.status(201).json({
          success: {
            contest: updatedContest,
          },
        });
      }
    } else {
      res.status(500);
      throw new Error(
        "Could not create submission at this time, Please try again"
      );
    }
  } else {
    res.status(500);
    throw new Error("Could not find contest at this time, Please try again");
  }
});

exports.getAllSubmissions = asyncHandler(async (req, res, next) => {
  const contest_id = req.params.id;
  const Creator = req.params.creator;

  if (!contest_id) {
    res.status(404);
    throw new Error("No contest id given");
  } else if (!Creator) {
    res.status(404);
    throw new Error("No creator id given");
  } else {
    const contest = await Contest.findById(contest_id);

    if (!contest) {
      res.status(404);
      throw new Error("No contest found for given id");
    }

    if (contest.creator.toString() === Creator.toString()) {
      const submissions = await Submission.find({ contest_id: contest_id });
      res.status(200).json({ submissions: submissions });
    } else {
      const submissions = await Submission.find({ creator: Creator });
      res.status(200).json({ submissions: submissions });
    }
  }
});

exports.getSubmissionsForUser = asyncHandler(async (req, res, next) => {
  const submissions = await Submission.find({
    creator: req.user.id,
  }).populate("contest_id");

  if (submissions) {
    const data = submissions.map((s) => {
      return {
        _id: s.contest_id._id,
        title: s.contest_id.title,
        description: s.contest_id.description,
        images: s.files,
        date: s.date_created,
        price: s.contest_id.price,
      };
    });

    res.status(201).json({
      success: data,
    });
  } else {
    res.status(404);
    throw new Error("No submissions found for given id");
  }
});

exports.getSubmissionById = asyncHandler(async (req, res, next) => {
  const submissionId = req.params.id;
  const creator = req.params.creator;

  const submission = await Submission.findById(submissionId);

  if (!submission) {
    res.status(404);
    throw new Error("No submission found for given id");
  } else {
    const contest = await Contest.findById(submission.contest_id);
    if (creator.toString() === contest.creator.toString()) {
      res.status(200).json({ submission: submission });
    } else if (creator.toString() === submission.creator.toString()) {
      res.status(200).json({ submission: submission });
    } else {
      res.status(401);
      throw new Error("You do not have permission to view this submission");
    }
  }
});
