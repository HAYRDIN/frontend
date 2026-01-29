const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initDatabase();
    }
});

function initDatabase() {
    db.serialize(() => {
        // Users Table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            username TEXT PRIMARY KEY,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            role TEXT NOT NULL
        )`);

        // Forms Table
        db.run(`CREATE TABLE IF NOT EXISTS forms (
            id TEXT PRIMARY KEY,
            type TEXT NOT NULL,
            data JSON NOT NULL,
            status TEXT DEFAULT 'PENDING',
            created_by TEXT NOT NULL,
            approved_by TEXT,
            approved_at TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Seed Users (if empty)
        db.get("SELECT count(*) as count FROM users", [], (err, row) => {
            if (row && row.count === 0) {
                console.log("Seeding users...");
                const users = [
                    { username: 'presenter1', name: 'Presenter One', role: 'PRESENTER', password: 'presenter123' },
                    { username: 'presenter2', name: 'Presenter Two', role: 'PRESENTER', password: 'presenter123' },
                    { username: 'reviewer', name: 'Senior Reviewer', role: 'REVIEWER', password: 'reviewer123' },
                    { username: 'viewer', name: 'Observer', role: 'VIEWER', password: 'viewer123' },
                    { username: 'storeman', name: 'Store Keeper', role: 'STORE_MAN', password: 'store123' },
                    { username: 'finance', name: 'Finance Officer', role: 'FINANCE', password: 'finance123' },
                    { username: 'hr', name: 'Human Resources', role: 'HR', password: 'hr123' }
                ];

                const stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?, ?)");
                users.forEach(u => {
                    stmt.run(u.username, u.password, u.name, u.role);
                });
                stmt.finalize();
            }
        });
    });
}

module.exports = db;
