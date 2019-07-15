require("dotenv").config();
const mongoose = require('mongoose');
// const config = require('config');
const db = process.env.MY_MONGO_URI;


const connectDB = async () => {
    try {
        await mongoose
        .connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('MongoDB Connected...')
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }     
};

// const connectDB = () => {
//     //if don't clearify these might get warning in console
//     mongoose.connect(db, {
//             useNewUrlParser: true,
//             useCreateIndex: true,
//             useFindAndModify: false
//         })
//         .then(() => console.log('MongoDB connected'))
//         .catch(err => {
//             console.error(err.message);
//             process.exit(1);
//         });
// }

module.exports = connectDB;