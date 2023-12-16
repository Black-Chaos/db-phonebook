const { Router } = require('express');
const { contactsController } = require('../controllers');

const router = Router();

router.get('/', contactsController.getAllContact)

router.post('/',)

router.delete('/:contactId',)

module.exports = router