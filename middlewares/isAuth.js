const User = require("../db/models/user-model");
const jsonwebtoken = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const isAuth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  console.log("authorization:", authorization)

  const [bearer, token] = authorization.split(" ");

  if (bearer != "Bearer") {
    res.status(401).json({ message: "No autorize1" });
    return;
  }

  try {
    const { id } = jsonwebtoken.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token || user.token != token) {
      res.status(401).json({ message: "No autorize2" });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "No autorize3" });
  }
};

module.exports = isAuth;
