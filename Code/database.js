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
    if(vType === '2'){
        vType = 'bike';
    }
    else if(vType === '4'){
        vType = 'car';
    }
    try{
        const result = await pool.query(`INSERT INTO parkingLot values (?, ?, ?, ?, ?, (SELECT Security_ID from security where curtime() between Start_Time and End_Time));`,[srn, name, vType, regNumber, adminId]);
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
        const resultPass = await pool.query(`INSERT INTO monthlypass (SRN, Vehicle_Type, Start_time, Expiry_date, Granter_Admin_ID) VALUES (?, "both", CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 MONTH), ?);`, [srn, adminId]);
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
        const resultPass = await pool.query(`INSERT INTO monthlypass (SRN, Vehicle_Type, Start_time, Expiry_date, Granter_Admin_ID) VALUES (?, "bike", CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 MONTH), ?);`, [srn, adminId]);
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
        const resultPass = await pool.query(`INSERT INTO monthlypass (SRN, Vehicle_Type, Start_time, Expiry_date, Granter_Admin_ID) VALUES (?, "car", CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 MONTH), ?);`, [srn, adminId]);
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

export async function insertAdmin(adminId, name, pswd, mobno, mainAdminId, mainAdminPswd){
    const result1 = await pool.query(`SELECT * FROM administrator WHERE AdminID = "${mainAdminId}" and Password = "${mainAdminPswd}";`);
    if(!(result1[0][0])){
        return 'n1';
    }
    else{
        try{
            const result2 = await pool.query(`INSERT INTO administrator VALUES (?, ?, ?, ?);`, [adminId, name, pswd, mobno]);
            return 'y';
        }
        catch{
            return 'n2';
        }
    }
}

export async function insertSecurity(securityId, name, mobno, stime, etime){
    try{
        const result = await pool.query(`INSERT INTO security VALUES (?, ?, ?, ?, ?);`, [securityId, name, mobno, stime, etime]);
        return 'y';
    }
    catch(err){
        if(err.code === 'ER_DUP_ENTRY'){
            return 'n1';
        }
        else if(err.code === 'ER_TRUNCATED_WRONG_VALUE'){
            return 'n2'
        }
    }
}


export async function updatePass(adminId, adminPswd, srn, regno){
    const result1 = await pool.query(`SELECT * FROM administrator WHERE AdminID = "${adminId}" and Password = "${adminPswd}";`);
    if(!(result1[0][0])){
        return 'n1';
    }
    else{
        let vehType;
        try{
            vehType = await pool.query(`SELECT Vehicle_Type FROM monthlypass WHERE SRN = "${srn}";`);
            vehType = vehType[0][0].Vehicle_Type;
        }
        catch{
            return 'n2';
        }
        const result2 = await pool.query(`UPDATE monthlypass SET Vehicle_Type = "both" WHERE SRN = "${srn}";`);
        if(result2[0].changedRows !== 1){
            const dummy = await pool.query(`UPDATE monthlypass SET Vehicle_Type = "${vehType}" WHERE SRN = "${srn}";`);
            return 'n3';
        }
        else{
            try{
                const result3 = await pool.query(`INSERT INTO student (Reg_Number, name, SRN, Mobile_number, Vehicle_type)
                SELECT
                    ?,
                    (SELECT name FROM student WHERE SRN = "${srn}"),
                    ?,
                    (SELECT Mobile_number FROM student WHERE SRN = "${srn}"),
                    CASE
                        WHEN (SELECT Vehicle_Type FROM student WHERE SRN = "${srn}") = 'car' THEN 'bike'
                        WHEN (SELECT Vehicle_Type FROM student WHERE SRN = "${srn}") = 'bike' THEN 'car'
                    END;`, [regno, srn]);
                return 'y';
            }
            catch(e){
                const dummy = await pool.query(`UPDATE monthlypass SET Vehicle_Type = "${vehType}" WHERE SRN = "${srn}";`);
                return 'n4';
            }
            
        }
    }
}