import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

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

export async function removeParkingLot(srn, regno){
    const result = await pool.query(`DELETE FROM parkingLot where SRN = "${srn}" and Reg_Number = "${regno}";`);
    if(result[0].affectedRows !== 0){
        return 'y';
    }
    else{
        return 'n';
    }
}

export async function insertMonthlyPassBoth(srn, adminId, regnocar, regnobike, name, mobno){
    let check = 0;
    try{
        const resultPass = await pool.query(`INSERT INTO monthlypass VALUES (?, "both", CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 MONTH), ?);`, [srn, adminId]);
        check += 1;
    }
    catch{
        return 'n1';
    }
    try{
        const resultStudentCar = await pool.query(`INSERT INTO student VALUES (?, ?, ?, ?, "car");`, [regnocar, name, srn, mobno]);
        check += 1;
    }
    catch{
        return 'n2';
    }
    try{
        const resultStudentBike = await pool.query(`INSERT INTO student VALUES (?, ?, ?, ?, "bike");`, [regnobike, name, srn, mobno]);
        check += 1;
    }
    catch{
        return 'n3';
    }
    if(check === 3){
        return 'y';
    }
}

export async function insertMonthlyPassBike(srn, adminId, regnobike, name ,mobno){
    let check = 0;
    try{
        const resultPass = await pool.query(`INSERT INTO monthlypass VALUES (?, "bike", CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 MONTH), ?);`, [srn, adminId]);
        check += 1;
    }
    catch{
        return 'n1';
    }
    try{
        const resultStudent = await pool.query(`INSERT INTO student VALUES (?, ?, ?, ?, "bike");`, [regnobike, name, srn, mobno]);
        check += 1;
    }
    catch{
        return 'n3';
    }
    if(check === 2){
        return 'y';
    }
}

export async function insertMonthlyPassCar(srn, adminId, regnocar, name, mobno){
    let check = 0;
    try{
        const resultPass = await pool.query(`INSERT INTO monthlypass VALUES (?, "car", CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 MONTH), ?);`, [srn, adminId]);
        check += 1;
    }
    catch{
        return 'n1';
    }
    try{
        const resultStudent = await pool.query(`INSERT INTO student VALUES (?, ?, ?, ?, "car");`, [regnocar, name, srn, mobno]);
        check += 1;
    }
    catch{
        return 'n2';
    }
    if(check === 2){
        return 'y';
    }
}

export async function verifyMonthlyPass(srn, regno){
    const result = await pool.query(`SELECT * FROM STUDENT WHERE Reg_Number = "${regno}" and SRN = "${srn}";`);
    if(!(result[0][0])){
        return 'n1';
    }
    else{
        return { name : result[0][0].name, vehType : result[0][0].Vehicle_type };
    }
}