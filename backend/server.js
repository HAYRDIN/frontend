const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from parent directory (frontend)
app.use(express.static(path.join(__dirname, '..')));

// --- ROUTES ---

// Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            res.json({
                success: true,
                user: {
                    username: row.username,
                    name: row.name,
                    role: row.role
                }
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });
});

// Get Forms
app.get('/api/forms', (req, res) => {
    const { type, role, username } = req.query;
    let query = "SELECT * FROM forms WHERE 1=1";
    const params = [];

    if (type) {
        query += " AND type = ?";
        params.push(type);
    }

    // Role based filtering
    // PRESENTERS see only their own forms
    if (role === 'PRESENTER' && username) {
        query += " AND created_by = ?";
        params.push(username);
    }
    // REVIEWERS, STORE_MAN, VIEWER, FINANCE, HR see ALL (default)

    query += " ORDER BY created_at DESC";

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Parse JSON data
        const forms = rows.map(r => ({
            ...r,
            data: JSON.parse(r.data)
        }));
        res.json(forms);
    });
});

// Get Single Form
app.get('/api/forms/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM forms WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            row.data = JSON.parse(row.data);
            res.json(row);
        } else {
            res.status(404).json({ error: 'Form not found' });
        }
    });
});

// Save/Update Form
app.post('/api/forms', (req, res) => {
    const { id, type, data, status, created_by, approved_by, approved_at } = req.body;

    // Check if exists
    db.get("SELECT id FROM forms WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        if (row) {
            // Update
            const stmt = db.prepare(`UPDATE forms SET 
                data = ?, status = ?, approved_by = ?, approved_at = ?
                WHERE id = ?`);
            stmt.run(JSON.stringify(data), status, approved_by, approved_at, id, function (err) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.json({ success: true, id });
                }
            });
        } else {
            // Insert
            const stmt = db.prepare(`INSERT INTO forms (id, type, data, status, created_by, approved_by, approved_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`);
            stmt.run(id, type, JSON.stringify(data), status, created_by, approved_by, approved_at, function (err) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.json({ success: true, id });
                }
            });
        }

    });
});

// --- HELPER FUNCTIONS ---

// --- HELPER FUNCTIONS ---


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
