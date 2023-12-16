const {ContactModel} = require('../models/contact-model');

const getContact = async () => await ContactModel.find();

module.exports = {
    getContact,
}