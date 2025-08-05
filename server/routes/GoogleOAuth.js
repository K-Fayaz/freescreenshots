const router     = require('express').Router();
const passport   = require('passport');
const controller = require("../controllers/GoogleOAuth");

router.get('/google/signin',
    passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false,
    prompt: 'select_account'
}));

router.get('/google/callback',passport.authenticate('google', { failureRedirect: '/login',session: false }),controller.callBack);

module.exports = router;