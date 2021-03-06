const User = require('../routes/models/Users');
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('../lib/passport');
// require('./authController');


module.exports = {
    //register with passport
    register:(req, res) => {
        if(!req.body.name || !req.body.email || !req.body.password){
            return res.status(403).json({message:'All fields must be filled'});
        };
        //check if user exists
        User.findOne({email: req.body.email})
        .then(user => {
            if(user){
            return res.status(400).json({message:'User already exists'});
            };
            const newUser = new User();
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = hash;
            newUser.save()
            .then(user => {
            return req.login(user, (err) => {
                if(err){
                return res.status(500).json({message:'Server error', err});
                } else {
                console.log('register ', req.session);
                res.redirect('/auth/options');
                }
            });
            })
            .catch(err => res.status(400).json({message:'User not saved', err}))
        })
        .catch(err => res.status(500).json({message:'Server error', err}));
        },

    //render register page
    registerPage:(req, res) => {
    return res.render('main/register');
    },

    //login with passport
    login:
    //authenticate using local login from passport file
    passport.authenticate('local-login', {
        successRedirect:'/auth/options',
        failureRedirect:'main/fail',
        failureFlash: true
    }),

    //render options page
    // options:(req, res) => {
    //     if(req.isAuthenticated()){
    //         return res.render('main/options');
    //     };
    // },

    //render login page
    loginPage:(req, res) => {
    res.render('main/login');
    },

    //render success page
    successPage:(req, res) => {
    if(req.isAuthenticated()){
        return res.render('options');
    } else {
        res.send('Unauthorized');
    }
    },

    failPage:(req, res) => {
    return res.render('main/fail');
    },

    //logout user
    logout:(req, res) => {
    req.session.destroy();
    console.log('logout ', req.session)
    req.logout();
    return res.redirect('/');
    },

    //render landing page
    home:(req, res) => {
        return res.render('main/index')
    }
};