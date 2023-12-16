const mongoose = require('mongoose');

const { DB_PATH } = process.env;

exports.dbConnect = async () => {
    try {
        await mongoose.connect(DB_PATH)
        console.log('connected successfully');
    } catch (error) {
        console.log(error);
    }
}