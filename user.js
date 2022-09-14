'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String,
        default: ''
    },
    ownIdData: {
        type: String,
        default: ''
    },


})
module.exports = mongoose.model("User", userSchema);