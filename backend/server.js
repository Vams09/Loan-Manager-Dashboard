const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app and database
const app = express();
const db = new sqlite3.Database('./loanManager.db');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create users table
const createUsersTable = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user'
    );
  `, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table created successfully.');
    }
  });
};

// Create loans table with user_id foreign key
const createLoansTable = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS loans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      loan_amount REAL NOT NULL,
      loan_tenure INTEGER NOT NULL,
      reason TEXT NOT NULL,
      employment_status TEXT NOT NULL,
      employment_address1 TEXT NOT NULL,
      employment_address2 TEXT NOT NULL,
      status TEXT DEFAULT 'pending'
    );
  `, (err) => {
    if (err) {
      console.error('Error creating loans table:', err.message);
    } else {
      console.log('Loans table created successfully.');
    }
  });
};

// Initialize tables
createUsersTable();
createLoansTable();

// API to get all loans
app.get('/loans', (req, res) => {
  db.all('SELECT * FROM loans', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// API to get loans by user ID
app.get('/loans/user/:userId', (req, res) => {
  const { userId } = req.params;
  db.all('SELECT * FROM loans WHERE user_id = ?', [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post('/loans', (req, res) => {
  const {
    full_name,
    loan_amount,
    loan_tenure,
    reason,
    employment_status,
    employment_address1,
    employment_address2
  } = req.body;

  const status = 'pending';
  const query = `
    INSERT INTO loans (
      full_name,
      loan_amount,
      loan_tenure,
      reason,
      employment_status,
      employment_address1,
      employment_address2,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(query, [
    full_name,
    loan_amount,
    loan_tenure,
    reason,
    employment_status,
    employment_address1,
    employment_address2,
    status
  ], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, message: 'Loan application submitted successfully!' });
  });
});


// API to update loan status
app.patch('/loans/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  const query = `UPDATE loans SET status = ? WHERE id = ?`;

  db.run(query, [status, id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to update status' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    res.json({ message: 'Status updated successfully' });
  });
});

// 404 handler
// app.use((req, res) => {
//   res.status(404).send('Route not found');
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
})

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
