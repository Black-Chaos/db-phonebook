const User = require("../db/models/user-model");
const jsonwebtoken = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require('path');
const { SECRET_KEY } = process.env;
const fs = require('fs/promises');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({ message: "Email in use" });
    return;
  }

  const avatar = gravatar.url(email);

  const newUser = new User({ name, email, avatar, password });

  await newUser.hashPassword();

  await newUser.save();

  const payload = { id: newUser._id };

  const token = jsonwebtoken.sign(payload, SECRET_KEY);

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    user: {
      name,
      email,
      avatar,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({
      message: "Login and password is not correct",
    });
    return;
  }

  const isEqual = user.comparePasswords(password);

  if (!isEqual) {
    res.status(401).json({
      message: "Login and password is not correct",
    });
    return;
  }

  const payload = { id: user._id };

  const token = jsonwebtoken.sign(payload, SECRET_KEY);

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      name: user.name,
      email,
      avatar: user.avatar,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' })
  res.sendStatus(204);
};

const current = (req, res) => {
  const { name, email, avatar } = req.user;

   res.json({
      name,
      email,
      avatar,
  });
}

const updateAvatars = async (req, res, next) => {
  const { _id } = req.user;
    const avatarsDir = path.resolve('public', 'avatars');
  if (!req.file) {
      res.status(400).json({message: 'No file attached'})
    }
    const { path: tempUpload, originalname } = req.file;

  const newFileName = `${_id}-${originalname}`
    const resultUpload = path.join(avatarsDir, newFileName);
    await fs.rename(tempUpload, resultUpload);

    const coverPath = path.join('avatars', newFileName);

    await User.findByIdAndUpdate(_id, { avatarURL: coverPath });
    res.status(200).json({ avatarURL: coverPath });
};

module.exports = { register, login, logout, current, updateAvatars };
