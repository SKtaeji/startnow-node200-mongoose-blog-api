const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

var dbUser;

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/featured', (req, res) => {
    Blog
        .find()
        .where('featured', true)
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => {
            if (blog) {
            res.status(200).json(blog)
        } else {
            res.status(404).send("Invalid ID");
        }
        })
        .catch(err => res.status(500).send(err.message));
});

router.post('/', (req, res) => {
    User
        .findById(req.body.author) //Find User
        .then(user => {
            if(!user) {
                return res.status(404).send('Not Found')
            }
            dbUser = user; 
            var blog = new Blog(req.body); //Create new Blog based on found User
            blog.author = user._id;
            return blog.save(); //Then save blog
        })
        .then(blog => {
            if (!blog) return
            dbUser.blogs.push(blog); //Push saved blog
            dbUser.save().then(() => res.status(201).json(blog));
        });
});

router.put('/:id', (req, res) => {
    Blog
        .findByIdAndUpdate(req.params.id, req.body)
        .then(blog => {
            res.status(204).json(blog);
        });
});

router.delete('/:id', (req, res) => {
    Blog
        .findByIdAndRemove(req.params.id)
        .then(blog => {
            res.status(200);
        })
        .catch(err => res.status(404).send(err.message));
});

module.exports = router;