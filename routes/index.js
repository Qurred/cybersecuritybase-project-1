var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var assert =require('assert');

var db = new sqlite3.Database('database');


router.get('/', function(req, res, next) {
    var users = [];
    db.each("SELECT id, name, password FROM user", function (err, row) {
        assert.equal(null,err);
        users.push({"id":  row.id, "name": row.name, "password": row.password});
    }, function () {
        res.render('index', {user: users});
    });
});

router.post('/get-user',function (req, res, next) {
    var id;
    db.each("SELECT id, name, password FROM user WHERE name = '" + req.body.username + "' and password = '" + req.body.pword+"';", function (err, row) {
        assert.equal(null,err);
        console.log(row);
        id = row.id;
    }, function () {
        if(id != undefined){
            res.redirect('users/'+id);
        }else{
            res.render("index", {error: "Not found user-password combination"});
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
