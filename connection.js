var mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
var connect = function () {
    return new Promise((resolve, reject) => {
            url =
                "mongodb+srv://manthan:manthan@cluster0.xgqwh.mongodb.net/OwnID?retryWrites=true&w=majority";
        mongoose.connect(
            url,
            (error, result) => {
                if (error) {
                    console.log(error,"error");
                    return reject(error);
                }
                return resolve("Db successfully connected!");
            }
        );
    });
};

autoIncrement.initialize(mongoose);
module.exports = {
    connect: connect,
};
