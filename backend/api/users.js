const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/");

// // // @desc    Authenticate a user
// // // @access  Public

// router.post(
//   "/",
//   asyncHandler(async (req, res) => {
//     const { email, password } = req.body;

//     // Check for user email

//     const user = await User.aggregate([
//       {
//         $lookup: {
//           from: "recordings",
//           localField: "_id",
//           foreignField: "user",
//           as: "recordings",
//         },
//       },
//       {
//         $match: {
//           email,
//         },
//       },
//     ]);

//     if (user && (await bcrypt.compare(password, user[0].password))) {
//       res.json({
//         _id: user[0]._id,
//         name: user[0].name,
//         email: user[0].email,
//         recordings: user[0].recordings,
//         token: generateToken(user[0]._id),
//       });
//     } else {
//       res.status(400);
//       throw new Error("Invalid credentials");
//     }
//   })
// );

// // @desc    get Activity
// // @access  Public
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email

    const user = await User.aggregate([
      {
        $lookup: {
          from: "recordings",
          localField: "_id",
          foreignField: "user",
          as: "recordings",
        },
      },
      {
        $match: {
          email,
        },
      },
    ]);

    if (user && (await bcrypt.compare(password, user[0].password))) {
      res.json({
        _id: user[0]._id,
        name: user[0].name,
        email: user[0].email,
        recordings: user[0].recordings,
        token: generateToken(user[0]._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  })
);

// @desc    Register new user
// @route   POST /api/users
// @access  Public

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  })
);

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, "abc123", {
    expiresIn: "30d",
  });
};

module.exports = router;
