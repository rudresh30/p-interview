const express = require('express');
const client = require('pg');
const insertinDB = require('../db/insertdb');
const verifyUserCredentials = require('../db/userverification');
const getAllUsers = require('../db/getallposts');
const getUserPosts = require('../db/getuserposts');

const router = express.Router();


//this middleware function will be called on all requests to localhost/users/id (GET, POST, PUT, DELETE...)
//this will verify the credentials of the user
//looks for id field in the Query of the url and password in authorization header
//returns a json message if auth fails 
router.use('/:id/', (req, res, next) => {
    console.log(req.headers);
    console.log(`body is`);
    console.log(req.body);
    console.log(`params is `);
    console.log(req.params);
    console.log(`req object is`);
    console.log(req);
    let userId = req.query.id || req.params.id;
    let userPassword = req.headers['authorization'];
    verifyUserCredentials(userId, userPassword, (err, response) => {
        if (err) {
            res.json({
                error: "something went wrong. please try again"
            });
        } else {

            if (response == 0) {
                res.json({
                    failure: "please provide valid credentials or please register"
                })
            } else {
                console.log(`auth successful - calling next method on this route`);
                next();
            }
        }
    });

});

//this will be called on all GET requests to localhost/users/id
router.get('/:id', (req, res) => {
    console.log(`data for one user`);
    //Get posts for a single user. Credentials already verified by the middleware verify credentials function
    getUserPosts(req.params.id, (err, response) => {

        if (err) {
            res.json({
                error: "could not get posts for this user. please try again"
            })
        } else {

            console.log(`response in getUserPosts`);
            console.log(response);
            res.send(response);

        }
    });

});


//this will be called on all GET requests on localhost/users
router.get('/', (req, res) => {
    //Verify if there is a filter in query, if there is then send posts only for that user or get all posts for all users. No credential verification will be done
    if (req.query.id) {
        console.log(`send post for given id only`);
        getUserPosts(req.query.id, (err, response) => {

            if (err) {
                res.json({
                    error: "could not get posts for this user. please try again"
                })
            } else {

                console.log(`response in getUserPosts`);
                console.log(response);
                res.send(response);

            }
        });
    } else {
        console.log(`sending all posts for all users`);
        getAllUsers((err, response) => {
            if (err) {
                res.json({
                    error: "Could not get all posts for users. please try again"
                })
            } else {

                console.log(response);
                res.send(response);

            }
        });
    }



});


//this will be called on all POST requests to localhost/users/id
router.post('/', (req, res) => {
    console.log(`POST on /user/`);

    insertinDB(req.body.id, req.body.post, (err, response) => {
        if (err) {
            res.json({
                error: "something went wrong"
            });
        } else {
            res.json({
                message: "success"
            });
        }
    });

});

module.exports = router;
