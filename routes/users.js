const { Router } = require("express");
// const { contactsController } = require("../controllers");

const router = Router();

router.get("/current");

router.post("/signup");

router.post("/login");

router.post("/logout");

module.exports = router;
