const { Router } = require("express");
const { contactsControllers } = require("../controllers");

const router = Router();

router.get("/", contactsControllers.getAllContact);

router.post("/");

router.delete("/:contactId");

module.exports = router;
