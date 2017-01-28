var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var assert =require('assert');
var db = new sqlite3.Database('database');

router.get('/:id', function(req, res, next) {
    var info = [];
    db.each("SELECT * FROM user WHERE id = " + req.params.id, function (err, row) {
        assert.equal(null,err);
        info.push({"id":  row.id, "name": row.name, "password": row.password, "admin":row.admin});
    }, function () {
        console.log(info);
        res.render('users', {info: info});
    });
});

module.exports = router;
