const User = require("../models/User");
const Contest = require("../models/Contest");
const asyncHandler = require("express-async-handler");

// @route POST /users
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const searchString = req.query.search;

  let users;
  if (searchString) {
    users = await User.find({
      username: { $regex: searchString, $options: "i" },
    });
  }

  if (!users) {
    res.status(404);
    throw new Error("No users found in search");
  }
  console.log(users);
  res.status(200).json({ users: users });
});

exports.getContestsForUser = asyncHandler(async (req, res, next) => {
  let contests;
  contests = await Contest.find({
    creator: req.user.id,
  });

  if (!contests) {
    res.status(404);
    throw new Error("No contests found for this user");
  }

  res.status(200).json({ contests: contests });
});
