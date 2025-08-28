const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3333;

// Database connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'onboard_iq_demo',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(morgan('combined'));
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'onboard-iq-demo-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set to true in production with HTTPS
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Demo authentication middleware
const requireAuth = (req, res, next) => {
  // Simple demo auth - in real app this would check proper authentication
  if (!req.session.user && req.path !== '/login' && !req.path.startsWith('/api/auth')) {
    return res.redirect('/login');
  }
  next();
};

// API Routes

// Authentication endpoints
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Demo login - accept any username/password for portfolio demo
  if (username && password) {
    req.session.user = {
      id: 1,
      username: username,
      role: username === 'admin' ? 'admin' : 'user',
      name: username === 'admin' ? 'Admin User' : 'Demo User'
    };
    res.json({ success: true, user: req.session.user });
  } else {
    res.status(400).json({ success: false, message: 'Username and password required' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

app.get('/api/auth/user', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Contacts API endpoints
app.get('/api/contacts', async (req, res) => {
  try {
    const query = `
      SELECT 
        c.id,
        c.name,
        c.email,
        c.phone,
        c.active,
        c.roles,
        c.platform_vertical_market_ids,
        c.created_date,
        p.id as provider_id,
        p.name as provider_name,
        p.vertical as provider_vertical,
        p.active as provider_active
      FROM provider_contact c
      LEFT JOIN provider p ON c.provider_id = p.id
      ORDER BY c.name ASC
    `;
    
    const result = await pool.query(query);
    
    res.json({ contacts: result.rows });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/providers', async (req, res) => {
  try {
    const query = `
      SELECT id, name, vertical, active, created_date
      FROM provider
      WHERE active = true
      ORDER BY name ASC
    `;
    
    const result = await pool.query(query);
    res.json({ providers: result.rows });
  } catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Platform Features API endpoints
app.get('/api/platform-features', async (req, res) => {
  try {
    const query = `
      SELECT 
        id,
        name,
        description,
        category,
        feature_group,
        active,
        created_date
      FROM platform_feature
      WHERE active = true
      ORDER BY category ASC, name ASC
    `;
    
    const result = await pool.query(query);
    res.json({ features: result.rows });
  } catch (error) {
    console.error('Error fetching platform features:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/feature-matrix', async (req, res) => {
  try {
    const query = `
      SELECT 
        feature_id,
        provider_id,
        supported,
        notes,
        created_date
      FROM feature_provider
    `;
    
    const result = await pool.query(query);
    res.json({ matrix: result.rows });
  } catch (error) {
    console.error('Error fetching feature matrix:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Platform features management endpoints
app.post('/api/platform-features/relationship', async (req, res) => {
  try {
    const { featureId, providerId, supported, notes } = req.body;
    
    if (!req.session.user || req.session.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const query = `
      INSERT INTO feature_provider (feature_id, provider_id, supported, notes)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (feature_id, provider_id) 
      DO UPDATE SET 
        supported = EXCLUDED.supported,
        notes = EXCLUDED.notes,
        updated_date = CURRENT_TIMESTAMP
      RETURNING *
    `;
    
    const result = await pool.query(query, [featureId, providerId, supported, notes]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating feature-provider relationship:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve HTML pages
app.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/contacts', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contacts.html'));
});

app.get('/platform-features', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'platform-features.html'));
});

app.get('/', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`OnboardIQ Demo Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  pool.end(() => {
    process.exit(0);
  });
});

module.exports = app;