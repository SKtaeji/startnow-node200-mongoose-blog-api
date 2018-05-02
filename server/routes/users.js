const Mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Blog = require("../models/Blog");

router.get("/", (req, res) => {
  User.find().then(users => {
    res.status(200).json(users);
  });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send("Invalid ID");
      }
    })
    .catch(err => res.status(500).send(err.message));
});

router.post("/", (req, res) => {
  const user = new User(req.body);
  user.save().then(user => {
    res.status(201).json(user);
  });
});

router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body).then(user => {
    res.status(204).json(user);
  });
});

router.delete("/:id", (req, res) => {
  if (req.params.id) {
    User.findByIdAndRemove(req.params.id)
      .then(user => {
        res.status(200);
      })
      .catch(err => res.status(400).send(err.message));
  } else {
    res.status(404).send("No ID sent as param");
  }
});

module.exports = router;
