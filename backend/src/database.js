import mysql from "mysql";

import dotenv from 'dotenv';
dotenv.config();

export const connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_LOGIN,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
});

connection.connect();
connection.query("CREATE TABLE IF NOT EXISTS `clients` (id INT PRIMARY KEY AUTO_INCREMENT, FCS VARCHAR(100), createDate VARCHAR(200), updateDate VARCHAR(200), contacts VARCHAR(255));", (err) => {
    if (err) throw err;
});


// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourRootPassword';