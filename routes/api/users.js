const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
//Load user module
const User = require('../../models/User');

// @route GET api/users/test
// @desc Test users route
// @acess Public
router.get('/test', (req, res) => {
    res.json({
        msg: 'Users Works'
    })
})

// @route GET api/users/register
// @desc Register users
// @acess Public
router.post('/register', (req, res) => {
User.findOne({ email: req.body.email})
    .then(user => {
        if(user) {
            return res.status(400).json({email: 'Email already exists-'});
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', //Size
                r: 'pg', //rating
                d: 'mm' //default
            })
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10, (error, salt)=> {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            })
        }
    });
});
module.exports = router;