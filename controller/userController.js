const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

//create user
const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 11);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const result = await user.save();
    res.send({
      success: true,
      message: "User create successfull",
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        //prepare the user object to generate token
        const userObject = {
          username: user.name,
          email: user.email,
        };

        //generate token
        const token = jwt.sign(userObject, process.env.JWT_SECTET, {
          expiresIn: "1h",
        });

        //set cookie
        res.cookie("megamart", token, {
          maxAge: 86800,
          httpOnly: true,
          signed: true,
        });

        res.send({
          success: true,
          message: "User Login successfull",
        });
      } else {
        res.send({
          status: false,
          message: "something worng ",
        });
      }
    } else {
      res.send({
        status: false,
        message: "something worng ",
      });
    }
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  userSignup,
  userLogin,
};
