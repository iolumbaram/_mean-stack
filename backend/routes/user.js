const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post("/signup", (req, res, next)=> {
    console.log('hello');
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: req.body.password
            });
            user.save().then(result => {
                res.status(201).json({
                    message: 'User is created',
                    result: result
                });
            })
            .catch(err=> {
                res.status(500).json({
                    error: err
                });
            })
        });
});

module.exports = router;
