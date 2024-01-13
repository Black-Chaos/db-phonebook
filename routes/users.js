const { Router } = require("express");

const {
  userRegisterSchema,
  userLoginSchema,
} = require("../schemas/userSchema");

const { validateBody, isAuth } = require("../middlewares");

const { usersControllers } = require("../controllers");

const router = Router();

router.get("/current");

router.post(
  "/signup",
  validateBody(userRegisterSchema),
  usersControllers.register
);

router.post("/login", validateBody(userLoginSchema), usersControllers.login);

router.post("/logout", isAuth);

module.exports = router;
