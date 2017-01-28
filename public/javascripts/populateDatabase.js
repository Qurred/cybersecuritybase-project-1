var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('../../database');

db.serialize(function () {
    db.run('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL , password TEXT NOT NULL, admin int  DEFAULT 0 NOT NULL, CONSTRAINT name_unique UNIQUE (name))');
    var statement = db.prepare("INSERT INTO user ( name, password, admin ) VALUES (?,?,?);");
    statement.run("admin", "admin",1);
    statement.run("test", "test",0);
    statement.run("test2", "pword",0);
    statement.finalize();

    db.each("SELECT id, name, password FROM user", function (err, row) {
        console.log(row.id,row.name,row.password);
    });

});

db.close();
console.log("Database populated without errors")