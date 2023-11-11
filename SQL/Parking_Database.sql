CREATE DATABASE parking;
USE parking;

/* The below mentioned queries are to create tables required for this project as well as insert values in the tables which are necessary for the project to function. */ 
CREATE TABLE ADMINISTRATOR (
    AdminID      VARCHAR(15) NOT NULL PRIMARY KEY,
    name        VARCHAR(35) NOT NULL,
    Password     VARCHAR(20) NOT NULL,
    MobileNumber VARCHAR(20) NOT NULL
);

-- This project requires atleast one admin to be present in the administrator table to login. 
-- Admin Details can be changed as required   
INSERT INTO ADMINISTRATOR VALUES ("12345" , "Admin1" , "Password1" , "1231231231");

CREATE TABLE SECURITY (
    Security_ID   VARCHAR(15) NOT NULL PRIMARY KEY,
    name          VARCHAR(35) NOT NULL,
    Mobile_Number VARCHAR(20) NOT NULL,
    Start_Time    TIME NOT NULL,
    End_Time      TIME NOT NULL
);

-- This project requires security guards to be on duty everytime the project is used
INSERT INTO SECURITY VALUES ("123" , "Security1" , "2312312312" , "12:00:00" , "18:00:00"),
							("456" , "Security2" , "3123123123" , "18:00:00" , "24:00:00"),
                            ("789" , "Security3" , "2342342342" , "00:00:00" , "06:00:00"),
                            ("102" , "Security4" , "3423423423" , "06:00:00" , "12:00:00");

CREATE TABLE monthlypass (
    SRN              CHAR(13) NOT NULL PRIMARY KEY,
    Vehicle_Type     VARCHAR(10) NOT NULL,
    Start_Time       DATE NOT NULL,
    Expiry_Date      DATE NOT NULL,
    Granter_Admin_ID VARCHAR(15) NOT NULL,
    Amount_paid INT,
    FOREIGN KEY (Granter_Admin_ID) REFERENCES ADMINISTRATOR(AdminID)
);

CREATE TABLE student (
    Reg_Number    CHAR(4) NOT NULL PRIMARY KEY,
    name          VARCHAR(35) NOT NULL,
    SRN           CHAR(13) NOT NULL,
    Mobile_number VARCHAR(20) NOT NULL,
    Vehicle_type  VARCHAR(5) NOT NULL,
    FOREIGN KEY (SRN) REFERENCES monthlypass(SRN) ON DELETE CASCADE
);

CREATE TABLE PARKINGLOT (
    SRN                 VARCHAR(13) NOT NULL PRIMARY KEY,
    name                VARCHAR(35) NOT NULL,
    Vehicle_Type        VARCHAR(5)  NOT NULL,
    Reg_Number          CHAR(4)     NOT NULL,
    Registrant_Admin_ID VARCHAR(15) NOT NULL,
    Security_ID         VARCHAR(15) NOT NULL,
    FOREIGN KEY (Registrant_Admin_ID) REFERENCES ADMINISTRATOR(AdminID),
    FOREIGN KEY (Security_ID) REFERENCES SECURITY(Security_ID)
);



/* The below mentioned queries are to create a procedure and event which remove all users from the parkinglot table at midnight */
SET GLOBAL event_scheduler = ON;

-- Creating a Procedure
DELIMITER //

CREATE PROCEDURE delete_records_at_midnight()
BEGIN
    DELETE FROM PARKINGLOT;
END //

DELIMITER ;

-- Creating an Event to Remove the records at midnight
CREATE EVENT delete_records_event
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURDATE() + INTERVAL 1 DAY, '00:00:00')
DO
CALL delete_records_at_midnight();



/* The below queries are to remove monthly passes once they have been expired */
SET GLOBAL event_scheduler = ON;

-- Creating an event to Remove expired monthly passes
CREATE EVENT delete_old_passes
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_DATE + INTERVAL 1 DAY
DO
DELETE FROM monthlypass WHERE Expiry_Date < CURDATE();



/* Trigger to set the Amount_paid column of the monthlypass table to its respective value */
DELIMITER //

CREATE TRIGGER set_amount_paid
BEFORE INSERT ON monthlypass
FOR EACH ROW
BEGIN
    DECLARE vehicle_type_value INT;

    CASE NEW.Vehicle_Type
        WHEN "bike" THEN SET vehicle_type_value = 150;
        WHEN "car" THEN SET vehicle_type_value = 250;
        WHEN "both" THEN SET vehicle_type_value = 400;
        ELSE SET vehicle_type_value = 0;  -- Handle other cases if needed
    END CASE;

    SET NEW.Amount_paid = vehicle_type_value;
END //

DELIMITER ;






