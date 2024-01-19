const { Router } = require("express");
const { contactsControllers } = require("../controllers");
const { validateBody, isAuth } = require('../middlewares');


const router = Router();

router.use(isAuth)

router.get("/", contactsControllers.getAllContact);

router.post("/", contactsControllers.addContact);

router.delete("/:contactId", contactsControllers.deleteContact);

module.exports = router;
