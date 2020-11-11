var express = require("express");
var router = express.Router();
var connection = require("../config/db.config");
var bcrypt = require("bcrypt");

//Post request for login
router.post("/login", (req, res) => {
  var username = req.body.User_name;
  var password = req.body.Password;
  var query1 = `SELECT * from user`;
  connection.query(query1, (error, results) => {
        results.forEach(a => {
            if(a.User_name === username){
                bcrypt.compare(password, a.Password, (err, data) => {
                    //if error than throw error
                    if (err) throw err
            
                    //if both match than you can do anything
                    if (data) {
                        console.log("Login Success")
                        return res.json(data);
                    } else {
                        return res.status(401).json({ msg: "Invalid credencial" })
                    }
            
                })
              }
        });
   
  });
})
// Signup api 
router.post('/signup',(req,res)=>{
    var username = req.body.User_name;
    var password= req.body.Password;
  bcrypt.hash(password, 5, function (err, hash) {
    var query = `INSERT INTO user (User_name, Password) VALUES ?`;
    var values = [[username, hash]];
    connection.query(query, [values], (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        throw err;
      }
    });
  });
});

module.exports = router;
