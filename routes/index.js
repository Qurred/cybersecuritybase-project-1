var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var assert =require('assert');

var db = new sqlite3.Database('database');


router.get('/', function(req, res, next) {
    var result = [];
    db.each("SELECT title, body FROM message ORDER BY id DESC LIMIT 20", function (err, row) {
        assert.equal(null,err);
        result.push({"title":  row.title, "body": row.body});
    }, function () {
        res.render('index', {messages: result});
    });
});


router.post('/get-user',function (req, res, next) {
    var id;
    console.log("SELECT id, name, password FROM user WHERE name = '" + req.body.username + "' and password = '" + req.body.pword+"';");
    db.each("SELECT id, name, password FROM user WHERE name = '" + req.body.username + "' and password = '" + req.body.pword+"';", function (err, row) {
        assert.equal(null,err);
        console.log(row);
        if(id == undefined) {
            id = row.id;
        }
    }, function () {
        if(id != undefined){
            res.redirect('users/'+id);
        }else{
            res.redirect("/");
        }

    });
});

router.post('/register',function (req, res, next) {
    db.run("INSERT INTO user(name, password) VALUES ('" + req.body.username + "' , '" + req.body.pword + "' );", function (err) {
        if(err){
        }
    });
    res.redirect("/");
});



module.exports = router;
