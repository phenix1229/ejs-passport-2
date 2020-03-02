const movieInfo = require('../routes/models/mList');
const userInfo = require('../routes/models/uList');
// const passport = require('passport');
require('../lib/passport');

module.exports = {
    random:(req, res) => {
        if(req.isAuthenticated()){
            return res.render('main/random', {userInfo})
        }else {
            return res.render('main/fail');
        };
    },
    movies:(req, res) => {
        if(req.isAuthenticated()){
            return res.render('main/movies',{movieInfo});
        } else {
            return res.render('main/fail');
        };
    },
    options:(req, res) => {
        if(req.isAuthenticated()){
            return res.render('main/options')
        }else {
            return res.render('main/fail');
        };
    }
};