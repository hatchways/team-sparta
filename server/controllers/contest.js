const Contest = require("../models/Contest");
const asyncHandler = require("express-async-handler");

exports.getContestById = asyncHandler(async (req, res, next) => {
  const contestId = req.params.id;

  let contest = await Contest.findById(contestId);

  if (!contest) {
    res.status(404);
    throw new Error("No contest found for given id");
  }

  res.status(200).json({ contest: contest });
});

exports.getAllContests = asyncHandler(async (req, res, next) => {
  let contests = await Contest.find().where("end_date").gte(new Date());

  if (!contests) {
    res.status(404);
    throw new Error("No contest found for given id");
  }

  res.status(200).json({ contests: contests });
});

exports.createContest = asyncHandler(async (req, res, next) => {
  const { title, description, price, end_date, images } = req.body;

  const createdContest = await Contest.create({
    title,
    description,
    price,
    end_date,
    images: images,
    creator: req.user.id,
  });

  if (createdContest) {
    res.status(201).json({
      success: {
        contest: createdContest,
      },
    });
  } else {
    res.status(500);
    throw new Error("Could not create contest at this time, Please try again");
  }
});

exports.updateContest = asyncHandler(async (req, res, next) => {
  const { title, description, price, end_date, images } = req.body;

  const contestId = req.params.id;

  let contest = await Contest.findById(contestId);

  if (!contest) {
    res.status(404);
    throw new Error("No contest found for given id");
  }

  if (contest.creator.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You are not allowed to edit this contest.");
  }

  let createdContest = await Contest.findByIdAndUpdate(
    contestId,
    {
      title,
      description,
      price,
      end_date,
      images: images ? images : contest.images,
      creator: req.user.id,
    },
    { new: true }
  );

  if (createdContest) {
    res.status(201).json({
      success: {
        contest: createdContest,
      },
    });
  } else {
    res.status(500);
    throw new Error("Could not update contest at this time, Please try again");
  }
});
