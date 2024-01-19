const {ContactModel} = require('../models/contact-model');

exports.getContact =  (owner) => ContactModel.find({owner});

exports.addContact = (body, owner) => ContactModel.create({ ...body, owner })

exports.deleteContact = (id, owner) => ContactModel.findOneAndDelete({_id: id, owner})