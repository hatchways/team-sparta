const Contest = require("../models/Contest");
const asyncHandler = require("express-async-handler");
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

/**
 * Summary.
 * Authenticated User can update exisintg contests
 * Description.
 * We first check to see if we have a customer or token
 * if we have a customer that means they have their card information saved
 * and we can create a paymentIntent which must also be confirmed otherwise
 * we get a token which we use to make a charge to the users card
 * @param Customer? customer object (optional)
 * @param token string used to handle stripe charges to card
 * @param Number price
 * @returns response object
 *
 */
exports.createContestCharge = asyncHandler(async (req, res, next) => {
  let charge;
  const centsMultiplier = 100;
  if (req.body.customer) {
    const { customer, price } = req.body;
    const priceInCents = price * centsMultiplier;
    charge = await stripe.paymentIntents.create({
      amount: priceInCents,
      currency: "usd",
      description: "Contest create charge",
      customer: customer.customer_id,
      off_session: false,
      setup_future_usage: "off_session",
    });

    if (charge) {
      const paymentIntent = await stripe.paymentIntents.confirm(charge.id, {
        payment_method: "pm_card_visa",
      });
      // }
      if (paymentIntent) {
        res.status(201).json({
          success: {
            message: "Payment was successful",
          },
        });
      } else {
        res.status(500);
        throw new Error("Payment was unsuccessful, Please try again");
      }
    }
  } else {
    const { token, price } = req.body;
    const priceInCents = price * centsMultiplier;

    charge = await stripe.charges.create({
      amount: priceInCents,
      currency: "usd",
      description: "Contest create charge",
      source: token,
    });
    if (charge) {
      res.status(201).json({
        success: {
          message: "Payment was successful",
        },
      });
    } else {
      res.status(500);
      throw new Error("Payment was unsuccessful, Please try again");
    }
  }
});
