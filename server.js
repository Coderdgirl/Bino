const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const db = new sqlite3.Database('./bino.db', (err) => {
    if (err) console.error(err.message);
    console.log('Connected to SQLite database');
});

db.run(`CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    position TEXT NOT NULL,
    company TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    resume TEXT NOT NULL,
    coverLetter TEXT NOT NULL
)`);

app.post('/api/applications', (req, res) => {
    const { position, company, name, email, phone, resume, coverLetter } = req.body;
    
    db.run(
        `INSERT INTO applications (position, company, name, email, phone, resume, coverLetter) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [position, company, name, email, phone, resume, coverLetter],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, message: 'Application submitted successfully' });
        }
    );
});

app.get('/api/applications', (req, res) => {
    db.all('SELECT * FROM applications ORDER BY timestamp DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/api/applications/:id', (req, res) => {
    db.get('SELECT * FROM applications WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

app.delete('/api/applications/:id', (req, res) => {
    db.run('DELETE FROM applications WHERE id = ?', [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Application deleted', changes: this.changes });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
