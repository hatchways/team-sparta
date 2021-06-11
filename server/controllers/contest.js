const Contest = require("../models/Contest");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Customer = require("../models/Customer");

const stripe = require("stripe")(process.env.StripeKeyBackend);

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

/**
 * Summary.
 * Authenticated User can update exisintg contests
 * Description.
 * We check to see if the contest exists and if the user is the owner of the contest
 * If the user and contest are valid then the user can update the following fields
 * @param String tite
 * @param String descriptoin
 * @param Number price
 * @param Date date
 * @param [String] images
 * @returns updatedObject
 *
 */
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

exports.addCustomer = asyncHandler(async (req, res, next) => {
  const { source, price, save } = req.body;

  const customer = await Customer.findOne({
    user_id: req.user.id,
  });

  const user = await User.findById(req.user.id);

  if (customer) {
    if (price > 0) {
      const paymentCreate = await stripe.charges.create({
        amount: 500,
        currency: "usd",
        // because we are in a test env source:"tok_visa" must be sent instead of customer_id
        source: "tok_visa",
      });

      res.status(201).json({
        success: {
          payment: paymentCreate,
          message: "Payment was successful",
        },
      });
    } else {
      res.status(400);
      throw new Error("Credit Card already exists.");
    }
  }

  const newCustomer = await stripe.customers.create({
    email: user.email,
    name: user.username,
  });

  if (save) {
    const createCustomer = await Customer.create({
      customer_id: newCustomer.id,
      payment_id: source.id,
      user_id: req.user.id,
    });

    res.status(201).json({
      success: {
        customer: createCustomer,
        message: "Credit Card information saved",
      },
    });
  } else {
    const paymentCreate = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      // because we are in a test env source:"tok_visa" must be sent instead of customer_id
      source: "tok_visa",
    });
    if (paymentCreate) {
      res.status(201).json({
        success: {
          payment: paymentCreate,
          message: "Payment was successful",
        },
      });
    } else {
      res.status(500);
      throw new Error(
        "Could not customer contest at this time, Please try again"
      );
    }
  }
});
