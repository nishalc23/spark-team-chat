console.log("🟢 Starting server...");

const express = require('express');
const cors = require('cors');
const db = require('./db.cjs');

const app = express();
const PORT = 3001; // Changed from 5000 to avoid conflict with AirPlay

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`📝 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use(cors());
app.use(express.json());

// Test DB connection
app.get('/test-db', async (req, res) => {
  console.log("🔍 /test-db route hit");
  
  try {
    console.log("🔄 Attempting database connection...");
    const result = await db.query('SELECT NOW()');
    console.log("✅ Database query successful");
    res.json({ message: 'Database connected!', time: result.rows[0].now });
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
});

app.get('/', (req, res) => {
  console.log("🏠 Home route hit");
  res.json({ message: 'Backend is running!', timestamp: new Date().toISOString() });
});

// Add error handling for port conflicts
app.listen(PORT, (err) => {
  if (err) {
    console.error(`❌ Failed to start server on port ${PORT}:`, err.message);
    process.exit(1);
  }
  console.log(`✅ Server is running at http://localhost:${PORT}`);
  console.log(`🌐 Also accessible at http://127.0.0.1:${PORT}`);
});