import db from "../dbConfig.js";

const Controllers = {
    getUsers: (req, res) => {
        const userquery = "SELECT * FROM User";
        db.query(userquery, (err, data) => {
            if (err) {
                console.error("Error fetching users:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.json(data);
        });
    },

    addUser: (req, res) => {
        const { Username, Password, Email, UserType ,FullName} = req.body;
        
        const checkUserQuery = "SELECT * FROM User WHERE Username = ?";
        db.query(checkUserQuery, [Username], (err, existingUser) => {
            if (err) {
                console.error("Error checking existing user:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            
            if (existingUser.length > 0) {
                return res.status(400).json({ error: "Username already exists" });
            }
            
            const userquery = "INSERT INTO User (`Username`, `Password`, `Email`, `UserType`,`FullName`) VALUES (?, ?, ?, ?, ?)";
            const values = [Username, Password, Email, UserType,FullName];
            db.query(userquery, values, (err, data) => {
                if (err) {
                    console.error("Error adding user:", err);
                    return res.status(500).json({ error: "Internal server error" });
                }
                return res.json({ message: "User added successfully", userId: data.insertId });
            });
        });
    },
    

    Updateuser: (req, res) => {
        const { UserID, Username, Password, Email, UserType, FullName } = req.body;
        const userquery = "UPDATE User SET `Username` = ?, `Password` = ?, `Email` = ?, `UserType` = ?, `FullName` = ? WHERE UserID = ?";
        const values = [Username, Password, Email, UserType, FullName, UserID];
        db.query(userquery, values, (err, data) => {
            if (err) {
                return res.send(err);
            }
            return res.json(data);
        });
    },
    

    deleteUser : (req, res) => {
        const UserID = req.body.UserID;
        console.log('usid',UserID);
        const userquery = "DELETE FROM User WHERE UserID = ? ";
        db.query(userquery, UserID, (err, data) => {
            if (err) {
                return res.send({err,UserID})
            };
            return res.json({data,UserID});
          });
    },

    loginUser: (req, res) => {
        const { Username, Password } = req.body;
        console.log(Username, Password);
        const loginQuery = "SELECT * FROM User WHERE Username = ? AND Password = ?";
        db.query(loginQuery, [Username, Password], (err, user) => {
            if (err) {
                console.error("Error logging in user:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            
            if (user.length === 0) {
                return res.status(401).json({ error: "Invalid username or password" });
            }
            
            res.json({ message: 'Login successful', UserDetails: user[0] });

        });
    },
    getdoctors: (req, res) => {
        const userquery = "SELECT distinct(specialization) FROM Doctors";
        db.query(userquery, (err, data) => {
            if (err) {
                console.error("Error fetching users:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.json(data);
        });
    },
    getSpecializationDoctors: (req, res) => {
        const selectedSpecialization = req.body.selectedSpecialization;
        console.log("Selected specialization:", selectedSpecialization);
    
        const userquery = "SELECT * FROM Doctors WHERE specialization = ?";
        const queryWithValues = db.format(userquery, [selectedSpecialization]);
        console.log("Full query:", queryWithValues);
    
        db.query(userquery, [selectedSpecialization], (err, users) => {
            if (err) {
                console.error("Error fetching doctors:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
    
            if (users.length === 0) {
                return res.status(404).json({ error: "No doctors found for the specified specialization" });
            }
    
            res.json({ message: 'Doctors fetched successfully', doctors: users });
        });
    }
    
    
};

export default Controllers;
