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

/**
 * Verify that the entered password is correct!
 * @param userpass: password string
 * @param password: password string
 * @returns {*}: true or false
 */
let isValidPassword = function(userpass, password) {
    return bCrypt.compareSync(password, userpass);
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

exports.signin = function(req, res) {

    if (!req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Please pass email and password.'});

    } else {
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then((user) => {

            if (!user) {
                res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                // check if password matches
                if (!isValidPassword(user.password, req.body.password)) {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                } else {

                    let payload = {id: user.id};
                    // if user is found and password is right create a token
                    let token = jwt.sign(payload, config.secret);

                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                }
            }

        }).catch((err) => {
            throw new Error(err);
        });
    }
};