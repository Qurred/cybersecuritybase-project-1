var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('../../database');

db.serialize(function () {
    db.run('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL , password TEXT NOT NULL, admin int  DEFAULT 0 NOT NULL, creditcard int not null, CONSTRAINT name_unique UNIQUE (name))');
    var statement = db.prepare("INSERT INTO user ( name, password, creditcard, admin ) VALUES (?,?,?,?);");
    statement.run("admin", "admin",454545454,1);
    statement.run("test", "test",4135126,0);
    statement.run("test2", "pword",423554,0);
    statement.finalize();

    db.each("SELECT id, name, password FROM user", function (err, row) {
        console.log(row.id,row.name,row.password);
    });

    db.run("CREATE TABLE message (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, body TEXT NOT NULL)");
    var statement = db.prepare("INSERT INTO message ( title, body ) VALUES (?,?);");
    for(var i = 0; i < 25; i++)
    {
        statement.run("Test Message " + (i+i), "Hi! This is a test message from admin. I hope you all like this chatboard!");
    }
    statement.finalize();

});

db.close();
console.log("Database populated without errors")