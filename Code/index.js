import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getRows } from './database.js'

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

app.get('/OneTimeCheckIn', async (req, res) => {
    const { uname , pswd } = req.query;
    const rows = await getRows(uname,pswd);
    res.send(rows);
});

app.listen(3000, () => {
    console.log('Server running on port 3000')
})