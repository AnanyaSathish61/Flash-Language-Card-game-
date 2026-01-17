const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // This allows your HTML file to talk to this server
app.use(express.json());

// This matches the connection you see in your VS Code Database tab
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: '',      // Usually empty for XAMPP/MAMP
    database: 'test_database'
});

// A "Route" to send the cards to your website
app.get('/get-cards', (req, res) => {
    const sql = "SELECT * FROM cards"; 
    db.query(sql, (err, results) => {
        if (err) return res.json(err);
        return res.json(results);
    });
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000... Your flashcards are ready to connect!");
});