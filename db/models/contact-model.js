const { Schema, model, Types } = require('mongoose')

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        owner: {
            type: Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

exports.ContactModel = model('contact', contactSchema)