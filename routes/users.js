const { Router } = require("express");
// const { contactsController } = require("../controllers");
const {
  userRegisterSchema,
  userLoginSchema,
} = require("../schemas/userSchema");
const validateBody = require("../middlewares/valedateBody");

const { register, login } = require("../controllers/usersControllers");

const router = Router();

router.get("/current");

router.post("/signup", validateBody(userRegisterSchema), register);

router.post("/login", validateBody(userLoginSchema), login);

router.post("/logout");

module.exports = router;
