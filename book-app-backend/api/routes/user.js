const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../../models/user');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {
    //check if email already exists
    console.log(req.body.email);
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Email already exists"
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        //Creating an instance of User Model
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body, email,
                            password: hash,
                            name: req.body.name,
                            user_type: 'user'
                        })
                        user.save()
                            .then(result => {
                                return res.status(201).json({
                                    message: "User Created Successfully"
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    message: "Failed creating user",
                                    error: err
                                });
                            });
                    }
                })
            }
        })
})

router.post('/admin-signup', (req, res, next) => {
    //check if email already exists
    console.log(req.body.email);
    User.find({ email: req.body.email })
        .exec().then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Admin Email already exists"
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        //Creating an instance of User Model
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body, email,
                            password: hash,
                            name: req.body.name,
                            user_type: 'admin'
                        })
                        user.save()
                            .then(result => {
                                return res.status(201).json({
                                    message: "Admin Created Successfully"
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    message: "Failed creating user",
                                    error: err
                                });
                            });
                    }
                })
            }
        })
})

router.post('/login', (req, res, next) => {
    console.log(req.body.email);
    console.log(req.body.password);
    User.find({ email: req.body.email })
        .exec().then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Authentication Failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    result.status(401).json({
                        message: "Entered password is incorrect for user"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                        'secret',
                        {
                            expiresIn: "1h"
                        }
                    )
                    return res.status(200).json({
                        message: "Authentication Succesful",
                        user_type: user[0].user_type,
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth Failure"
                });
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Failed creating user",
                error: err
            });
        });
})

module.exports = router;