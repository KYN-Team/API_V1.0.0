var exports = module.exports = {};

let config = require('../config/database'),
    jwt = require('jsonwebtoken'),
    bCrypt = require('bcrypt-nodejs');

// Exported models
let models = require("../models");

// Call User model
let User = models.users;

/**
 * Generate a hash from a string password
 * @param password: password string
 * @returns {*}: Hashed password that we store in database
 */
let generateHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

exports.signup = function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Please pass email and password.'});
    } else {

        User.findOne({
            where: {
                email: req.body.email
            }
        }).then((ifOldUser) => {
            if(ifOldUser) {
                res.json({success: false, msg: 'Email already exists.'});
            } else {
                User.create({
                    email: req.body.email,
                    password: generateHash(req.body.password)
                }).then(() => {
                    res.json({success: true, msg: 'Successful created new user.'});
                }).catch((err) => {
                    console.log(err);
                    return res.json({success: false, msg: 'Email already exists.'});
                });
            }
        });
    }
};