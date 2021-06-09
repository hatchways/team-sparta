const { check, validationResult } = require("express-validator");

exports.validateRegister = [
  check("username", "Please enter a username").not().isEmpty(),
  check("email", "Please enter a valid email address").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({
    min: 6
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }
];

exports.validateLogin = [
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateMessage = [
  check("body", "Please enter a message").notEmpty(),
  (req, res, next) =>{
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateContest = [
  check("title", "Please enter a title for contest").trim().notEmpty(),
  check("description", "Please enter a description for contest")
    .trim()
    .isLength({ min: 5 }),
  check("price", "Please enter a valid price").isFloat({ min: 1 }),
  check("end_date")
    .isDate()
    .custom((endDate) => {
      if (new Date(endDate) <= new Date()) {
        throw new Error(
          "End date of contest must be valid and after current date"
        );
  }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
