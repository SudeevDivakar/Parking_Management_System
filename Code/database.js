import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();


export async function getRows(uname,pswd){
    console.log('hello');
    const result = await pool.query(`SELECT AdminID, Password FROM administrator where AdminID = "${uname}" and Password = "${pswd}";`)
    return result;
}

export async function verifyUser(id, pswd){
    const result = await pool.query(`SELECT AdminID, Password FROM administrator where AdminID = "${id}" and Password = "${pswd}";`);
    try{
        const facultyId = result[0][0].AdminID;
        const password = result[0][0].Password;
        return [facultyId,password];
    }
    catch{
        return ['no','no'];
    }
    
}