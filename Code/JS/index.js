const express = require('express');
const mysql = require('mysql');
const path = require('path')
const app = express();

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'very_strong_password',
    database : 'parking'
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(express.static("C:/Users/sudee/OneDrive/Desktop/DBMS_MiniProject/Code"));
app.use(express.static("C:/Users/sudee/OneDrive/Desktop/DBMS_MiniProject/Code/JS/views"));


app.get('/', (req, res) => {
    res.render("Login");
})

app.get('/OneTimeCheckIn', (req, res) => {
    const { uname , pswd } = req.query;
    connection.connect(function(err) {
        if(err){
            throw err;
        }
        connection.query("SELECT * FROM administrator", function (err, result, fields) {
            if(err){
                throw err;
            } 
            console.log(result);
        });
    });
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})