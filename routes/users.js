const { Router } = require("express");

const {
  userRegisterSchema,
  userLoginSchema,
} = require("../schemas/userSchema");

const { validateBody, isAuth } = require("../middlewares");

const { usersControllers } = require("../controllers");
const upload = require("../middlewares/fileUpload");

const router = Router();

router.post(
  "/signup",
  validateBody(userRegisterSchema),
  usersControllers.register
);

router.post("/login", validateBody(userLoginSchema), usersControllers.login);

router.use(isAuth)
router.post("/logout", usersControllers.logout);
router.get("/current", usersControllers.current);
router.patch('/avatar', upload.single('avatar'), usersControllers.updateAvatars)

module.exports = router;
