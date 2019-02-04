const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middleware/check-auth');
const Book = require('../../models/book');

router.get("all-books", checkAuth, (req, res, next) => {
    Book.find()
        .exec()
        .then(docs => {
            const response = {
                books: docs.map(doc => {
                    return {
                        title: doc.title,
                        author: doc.author,
                        _id: doc._id,
                        isbn: doc.isbn,
                        price: doc.price,
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/book-details/:bookId", checkAuth, (req, res, next) => {
    const id = req.params.bookId;
    Book.find({ _id: id })
        .exec()
        .then(docs => {
            const response = {
                books: docs.map(doc => {
                    return {
                        title: doc.title,
                        author: doc.author,
                        _id: doc._id,
                        isbn: doc.isbn,
                        price: doc.price,
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/add-book", checkAuth, (req, res, next) => {
    const book = new book({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        price: req.body.price,
    });
    book
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Book successfully added"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.put("/update-book/:bookId", checkAuth, (req, res, next) => {
    const id = req.params.bookId;
    const updateOps = {};
    console.log(req.body);

    Book.update({ _id: id }, { $set: req.body })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Book Updated"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete("/delete-book/:bookId", checkAuth, (req, res, next) => {
    const id = req.params.bookId;
    console.log(id);
    Book.remove({ _id: _id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Book Deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;