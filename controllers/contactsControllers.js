const { getContact } = require("../db/services/contactServices")

const getAllContact = async (req, res) => {
    const contacts = await getContact();
    res.json(contacts)
}

module.exports = {
    getAllContact,
}