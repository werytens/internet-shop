import mysql from "mysql";

export const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "internet_shop_lipatov",
});

connection.connect();
connection.query("CREATE TABLE IF NOT EXISTS `clients` (id INT PRIMARY KEY AUTO_INCREMENT, FCS VARCHAR(100), createDate VARCHAR(200), updateDate VARCHAR(200), contacts VARCHAR(255));", (err) => {
    if (err) throw err;
});


// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourRootPassword';