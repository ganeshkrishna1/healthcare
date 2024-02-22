// dbConfig.js
import mysql from "mysql";

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "Admin@123",
    database: "locateadoctor",
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
        return;
    }
    console.log("Connected to database successfully!");
});

export default db;
