const User = require("../models/User");
const Contest = require("../models/Contest");
const asyncHandler = require("express-async-handler");
const Customer = require("../models/Customer");
const stripe = require("stripe")(process.env.StripeKeyBackend);

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

exports.searchUserPayment = asyncHandler(async (req, res, next) => {
  let customer;
  customer = await Customer.findOne({
    user_id: req.user.id,
  });

  if (!customer) {
    res.status(404);
    throw new Error("No payment information found for user");
  }

  res.status(200).json({ customer: customer });
});

exports.addCustomer = asyncHandler(async (req, res, next) => {
  const source = req.body;

  const customer = await Customer.findOne({
    user_id: req.user.id,
  });

  const user = await User.findById(req.user.id);

  if (customer) {
    res.status(400);
    throw new Error("Credit Card already exists.");
    // if (price > 0) {
    //   const paymentCreate = await stripe.charges.create({
    //     amount: 500,
    //     currency: "usd",
    //     // because we are in a test env source:"tok_visa" must be sent instead of customer_id
    //     source: "tok_visa",
    //   });

    //   res.status(201).json({
    //     success: {
    //       payment: paymentCreate,
    //       message: "Payment was successful",
    //     },
    //   });
    // } else {
    //   res.status(400);
    //   throw new Error("Credit Card already exists.");
    // }
  }

  const newCustomer = await stripe.customers.create({
    email: user.email,
    name: user.username,
  });

  const createCustomer = await Customer.create({
    customer_id: newCustomer.id,
    payment_id: source.id,
    user_id: req.user.id,
  });

  if (createCustomer) {
    res.status(201).json({
      success: {
        customer: createCustomer,
        message: "Credit Card information saved",
      },
    });
  } else {
    res.status(500);
    throw new Error(
      "Could not customer contest at this time, Please try again"
    );
  }

  // if (save) {
  //   const createCustomer = await Customer.create({
  //     customer_id: newCustomer.id,
  //     payment_id: source.id,
  //     user_id: req.user.id,
  //   });

  //   res.status(201).json({
  //     success: {
  //       customer: createCustomer,
  //       message: "Credit Card information saved",
  //     },
  //   });
  // } else {
  //   const paymentCreate = await stripe.charges.create({
  //     amount: 500,
  //     currency: "usd",
  //     // because we are in a test env source:"tok_visa" must be sent instead of customer_id
  //     source: "tok_visa",
  //   });
  //   if (paymentCreate) {
  //     res.status(201).json({
  //       success: {
  //         payment: paymentCreate,
  //         message: "Payment was successful",
  //       },
  //     });
  //   } else {
  //     res.status(500);
  //     throw new Error(
  //       "Could not customer contest at this time, Please try again"
  //     );
  //   }
  // }
});

exports.removeCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findOne({
    user_id: req.user.id,
  });

  if (customer) {
    const deletedCustomer = await Customer.deleteOne({
      user_id: customer.user_id,
    });
    if (deletedCustomer) {
      res.status(200).json({ message: "Credit Card Information Deleted" });
    } else {
      res.status(500).json({ message: "Error,Please try again" });
    }
  } else {
    res.status(404).json({
      message: "Could not find credit cardinformation for specified user ",
    });
  }
});
