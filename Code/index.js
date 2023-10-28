import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getRows, verifyUser } from './database.js'

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
        res.send('y');
    }
    else{
        res.send('n');
    }
})

app.get('/OneTimeCheckIn', (req, res, next) => {
    res.render('OneTimeCheckIn.ejs');
    next();
});

app.listen(3000, () => {
    console.log('Server running on port 3000')
})