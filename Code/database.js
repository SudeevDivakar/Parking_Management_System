import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();


async function getRows(uname,pswd){
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

export async function insertParkingLot(srn, name, vType, regNumber, adminId){
    const sec = await pool.query(`SELECT Security_ID from security where curtime() between Start_Time and End_Time;`);
    const securityId = sec[0][0].Security_ID;
    if(vType === '2'){
        vType = 'bike';
    }
    else if(vType === '4'){
        vType = 'car';
    }
    try{
        const result = await pool.query(`INSERT INTO parkingLot values (?, ?, ?, ?, ?, ?);`,[srn, name, vType, regNumber, adminId, securityId]);
        return 'y';
    }
    catch{
        return 'n';
    }
}

export async function reCheckUser(srn, regno){
    const result = await pool.query(`SELECT * FROM parkingLot where SRN = "${srn}" and Reg_Number = "${regno}";`);
    try{
        if(result[0][0].SRN === srn && result[0][0].Reg_Number === regno){
            return 'y';
        }
    }
    catch{
        return 'n';
    }
}