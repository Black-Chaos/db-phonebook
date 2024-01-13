const User = require("../db/models/user-model");
const jsonwebtoken = require("jsonwebtoken");
const gravatar = require("gravatar");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.find({ email });

  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }

  const avatar = gravatar.url(email);

  const newUser = new User({ name, email, avatar, password });

  await newUser.hashPassword();

  await newUser.save();

  const payload = { id: newUser._id };

  const token = jsonwebtoken.sign(payload, SECRET_KEY);

  await User.findByIdAndUpdate(newUser._id, { token });
};

module.exports = { register };
