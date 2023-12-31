import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dataImported from './details.json' assert {type : 'json'};
import { insertMonthlyPassBike, insertMonthlyPassCar, insertAdmin, 
    insertMonthlyPassBoth, removeParkingLot, verifyMonthlyPass, insertSecurity, updatePass,
    reCheckUser, insertParkingLot, verifyUser } from './database.js'

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


app.get('/verifyUser', async (req, res) => {
    const { id, pswd } = req.query;
    const credentials = await verifyUser(id, pswd);
    if( credentials[0] === id && credentials[1] === pswd ){
        fs.readFile('./details.json', 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading JSON file:', err);
              return;
            }
            const jsonData = JSON.parse(data);
            jsonData.admin_id = credentials[0];
            const updatedJsonData = JSON.stringify(jsonData, null, 2);
            fs.writeFile('./details.json', updatedJsonData, 'utf8', (writeErr) => {
                if (writeErr) {
                  console.error('Error writing JSON file:', writeErr);
                  return;
                }
            })
        });
        res.send('y');
    }
    else{
        res.send('n');
    }
})

app.get('/insertParkingLot', async(req,res) => {
    const { srn, name, regno, vehType } = req.query;
    const result = await insertParkingLot(srn, name, vehType, regno, dataImported.admin_id);
    res.send(result);
})

app.get('/reCheckUser', async(req, res) => {
    const { srn, regno } = req.query;
    const result = await reCheckUser(srn, regno);
    res.send(result);
})

app.get('/removeParkingLot', async(req, res) => {
    const { srn, regno } = req.query;
    const result = await removeParkingLot(srn, regno);
    res.send(result);
})

app.get('/insertMonthlyPass', async(req, res) => {
    const { srn, name, mobno, regnobike, regnocar } = req.query;
    if(regnobike && regnocar){
        const result = await insertMonthlyPassBoth(srn, dataImported.admin_id, regnocar, regnobike, name, mobno);
        res.send(result);
    }
    else if(!(regnobike) && regnocar){
        const result = await insertMonthlyPassCar(srn, dataImported.admin_id, regnocar, name, mobno);
        res.send(result);
    }
    else if(regnobike && !(regnocar)){
        const result = await insertMonthlyPassBike(srn, dataImported.admin_id, regnobike, name, mobno);
        res.send(result);
    }
})

app.get('/admitMonthlyPass', async(req, res) => {
    const { srn, regno } = req.query;
    const result = await verifyMonthlyPass(srn,regno);
    if(result === 'n1'){
        res.send('n1');
    }
    else{
        const insertResult = await insertParkingLot(srn, result.name, result.vehType, regno, dataImported.admin_id);
        res.send(insertResult);
    }
})

app.get('/insertAdmin', async(req, res) => {
    const { adminId, name, pswd, mobno, adminPswd } = req.query;
    const result = await insertAdmin(adminId, name, pswd, mobno, dataImported.admin_id, adminPswd);
    res.send(result);
})

app.get('/insertSecurity', async(req, res) => {
    const { securityId, name, mobno, stime, etime } = req.query;
    const result = await insertSecurity(securityId, name, mobno, stime, etime);
    res.send(result);
})

app.get('/updatePass', async(req, res) => {
    const { srn, adminPswd, regno } = req.query;
    const result = await updatePass(dataImported.admin_id, adminPswd, srn, regno);
    res.send(result);
})

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

app.get('/ManageAdmin', (req, res) => {
    res.render('AddAdmin.ejs');
})

app.get('/AddSecurity', (req, res) => {
    res.render('AddSecurity.ejs');
})

app.get('/UpdateMonthlyPass', (req, res) => {
    res.render('UpdatePass.ejs');
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})