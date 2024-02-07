const mongoose = require("mongoose");


const connectDb = () => {
    mongoose
        .connect(process.env.DATABASE_URL)
        .then(() => {
            console.log("Connected to database is successful");
        })
        .catch((error) => {
            console.error(error);
            console.log("Failed to connect to database");
            process.exit(1);
        });
};

module.exports = connectDb;
