const contactServices = require("../db/services/contactServices")

exports.getAllContact = async (req, res) => {
    const contacts = await contactServices.getContact(req.user._id);
    res.json(contacts)
}

exports.addContact = async (req, res) => {
    const contact = await contactServices.addContact(req.body, req.user._id)
    res.json(contact)
}

exports.deleteContact = async (req, res) => {
    await contactServices.deleteContact(req.params.contactId, req.user._id);
    res.sendStatus(204)
}