const User = require("../../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (user, error) => {
    if (user) {
      return res.status(400).json({
        message: "Admin Already Registered",
      });
    }
    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
      role:'admin'
    });
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: error,
        });
      }
      if (data) {
        return res.status(201).json({
          message: "Admin created successfully",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error)
      return res.status(400).json({ message: "Error in sign controller" });
    if (user) {
      const isPasswordCorrect = await user.authenticate(req.body.password);
      if (isPasswordCorrect) {
        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.cookie("token", token, { expiresIn: "1d" });
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      res.status(400).json(error);
    }
  });
};
exports.signout = (req,res) => {
    res.clearCookie('token')
    res.status(200).json({
      message:'Signout Successfully'
    })
  }