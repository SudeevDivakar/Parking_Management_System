import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { insertParkingLot, verifyUser } from './database.js'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename) 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/css')));

app.get('/', (req, res) => {
    res.render("Login");
})

let admin_id; 
app.get('/verifyUser', async (req, res) => {
    const { id, pswd } = req.query;
    const credentials = await verifyUser(id, pswd);
    if( credentials[0] === id && credentials[1] === pswd ){
        admin_id = credentials[0];
        res.send('y');
    }
    else{
        res.send('n');
    }
})

// app.get('/insertParkingLot', async(req,res) => {
//     const { srn, name, regno, vehType } = req.query;
//     const result = 
// })

app.get('/continue', (req, res) => {
    res.render('Continue');
})

app.get('/OneTimeCheckIn', (req, res) => {
    res.render('OneTimeCheckIn');
});

app.get('/ReCheckIn', (req, res) => {
    res.render('ReCheckIn.ejs');
})

app.get('/CheckOut', (req, res) => {
    res.render('CheckOut.ejs');
})

app.get('/RegCheckIn', (req, res) => {
    res.render('RegistrantCheckIn.ejs');
})

app.get('/NewRegApplication', (req, res) => {
    res.render('NewRegistrant.ejs');
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})