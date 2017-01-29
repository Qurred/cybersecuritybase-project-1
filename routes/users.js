var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var assert =require('assert');
var db = new sqlite3.Database('public/database.db');

router.post('/send', function(req, res, next) {
    db.run("INSERT INTO message(title, body) VALUES ('" + req.body.title + "' , '" + req.body.message + "' );", function (err) {
        if(err){
        }
    });
    res.redirect("/users/"+req.body.id);
});

router.get('/:id', function(req, res, next) {
    var info = [];
    var result = [];

    db.each("SELECT title, body FROM message ORDER BY id DESC LIMIT 20", function (err, row) {
        assert.equal(null, err);
        result.push({"title": row.title, "body": row.body});
    });
    console.log("SELECT * FROM user WHERE id = " + req.params.id);
    db.each("SELECT * FROM user WHERE id = " + req.params.id, function (err, row) {
        assert.equal(null,err);
        info.push({"id":  row.id, "name": row.name, "password": row.password, "admin":row.admin, "creditcard":row.creditcard});
    }, function () {
        res.render('users', {info: info, messages: result});
    });
});

module.exports = router;
