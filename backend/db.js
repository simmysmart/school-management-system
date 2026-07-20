require("dotenv").config();

const mysql = require("mysql2");

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test Database Connection
connection.getConnection((err, conn) => {

    if (err) {
        console.error("❌ Database connection failed:");
        console.error(err);
    } else {
        console.log("✅ Database connected successfully!");
        conn.release();
    }

});

module.exports = connection;