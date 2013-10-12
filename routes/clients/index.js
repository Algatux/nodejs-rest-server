var sqlite3 = require('sqlite3');
var db = new sqlite3.Database("./storage/database.db");

module.exports = function(app) {

    app.get('/clients/getall',function(req,res){
        var result = Array();
        db.all("SELECT * FROM Clients", function(err, rows) {
            console.log("-> extracted "+rows.length+" rows from Clients");
            if(rows.length)
                for(var i = 0; i<rows.length; i++){
                    result.push(rows[i]);
                }
            res.json(result);
        });
    });

    app.get('/clients/get/:id',function(req,res){
        var id = req.params.id;
        db.get("SELECT * FROM Clients WHERE ID=?",{ 1:id }, function(err, row) {
            console.log("-> extracted row from Clients identified by id:"+id);
            if(typeof row !== 'undefined')
                res.json(Array(row));
            else
                res.json(Array());
        });
    });

    app.post('/clients/new',function(req,res){
        var name = req.body.name,
            surname = req.body.surname,
            phone = req.body.phone,
            mobile = req.body.mobile;
        var sql = "INSERT INTO Clients VALUES (null, ?, ?2 , ?3 ,?4)";
        db.run(sql,{1:name,2:surname,3:phone,4:mobile},function(err){
            if(err)
                console.log(err);
        })
          .get("SELECT * FROM Clients WHERE 1 ORDER BY ID DESC",function(err,row){
                console.log("<- new row inserted into Clients");
                if(typeof row !== 'undefined')
                    res.json(Array(row));
                else
                    res.json(Array());
            });
    });

    app.put('/clients/:id',function(req,res){
        var id = req.params.id;
        var name = req.body.name,
            surname = req.body.surname,
            phone = req.body.phone,
            mobile = req.body.mobile;
        var sql = "UPDATE Clients SET " +
                  "Name=? ,Surname=?2, PhoneNumber=?3, MobilePhoneNumber=?4 " +
                  "WHERE ID=?5";
        db.run(sql,{1:name,2:surname,3:phone,4:mobile,5:id},function(err){
            if(err)
                console.log(err);
        })
        .get("SELECT * FROM Clients WHERE ID=?",{1:id},function(err,row){
            console.log("<- updated row identified by id:"+id+" from Clients");
            if(typeof row !== 'undefined')
                res.json(Array(row));
            else
                res.json(Array());
        });
    });

    app.delete('/clients/:id',function(req,res){
        var id = req.params.id;
        var sql = "DELETE FROM Clients WHERE ID=?";
        db.run(sql,{1:id},function(err, lastID, changes){
            console.log("(x) deleted row identified by id:"+id+" from Clients");
            res.json(Array({changes: changes}));
        });
    });

};