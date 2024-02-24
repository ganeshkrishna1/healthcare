import express from "express";
import mysql from "mysql";
import cors from "cors";
import controllers from "./Controllers/Controllers.js";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Admin@123",
    database: "locateadoctor",
});

app.listen(8800, () => {
    console.log('connected');
});

app.get("/", (req, res) => {
    res.json("hello");
});

app.get("/getusers", controllers.getUsers);

app.post("/adduser", controllers.addUser);

app.put("/UpdateUser", controllers.Updateuser);

app.delete("/deleteUser", controllers.deleteUser);

app.post("/login", controllers.loginUser);

