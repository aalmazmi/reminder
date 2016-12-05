var config = require('config.json');
var express = require('express');
var request = require('request');
var router = express.Router();
 var userService = require('services/todos.service');

// use session auth to secure the angular app files
router.use('/', function (req, res, next) {
    if (req.path !== '/login' && !req.session.token) {
        return res.redirect('/login?returnUrl=' + encodeURIComponent('/app' + req.path));
    }
 
    next();
});

 router.post('/', function (req, res) {
    // register using api to maintain clean separation between layers
    request.post({
        url: config.apiUrl + '/todos/register',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('get', { error: 'An error occurred' });
        }
 
        if (response.statusCode !== 200) {
            return res.render('register', {
                error: response.body,
                Description: req.body.description,
                daytime: req.body.daytime,
                daytimeremind: req.body.daytimeremind
            });
        }
 
        // return to login page with success message
        req.session.success = 'Operation successful';
        var returnUrl = req.query.returnUrl && decodeURIComponent(req.query.returnUrl) || '/';
        res.redirect(returnUrl);
    });
});
// make JWT token available to angular app
router.get('/token', function (req, res) {
    res.send(req.session.token);
});
 
// serve angular app files from the '/app' route
router.use('/', express.static('app'));
 
module.exports = router;
