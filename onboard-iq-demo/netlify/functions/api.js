const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock data for demo
const mockContacts = [
  { id: 1, name: "Ashley Furniture", status: "active", type: "Enterprise", revenue: "$2.1M" },
  { id: 2, name: "Aspen Dental", status: "pending", type: "Healthcare", revenue: "$890K" },
  { id: 3, name: "Dell Technologies", status: "active", type: "Technology", revenue: "$1.5M" },
  { id: 4, name: "Helzberg Diamonds", status: "completed", type: "Retail", revenue: "$720K" },
  { id: 5, name: "iFit Health", status: "active", type: "Health & Wellness", revenue: "$650K" },
  { id: 6, name: "Wells Fargo Partner", status: "active", type: "Financial", revenue: "$3.2M" },
  { id: 7, name: "Synchrony Bank Client", status: "pending", type: "Financial", revenue: "$1.8M" },
  { id: 8, name: "Regional Medical Center", status: "completed", type: "Healthcare", revenue: "$420K" },
  { id: 9, name: "Tech Startup Co", status: "active", type: "Technology", revenue: "$180K" },
  { id: 10, name: "Luxury Retailer", status: "pending", type: "Retail", revenue: "$340K" }
];

const mockPlatformFeatures = [
  { 
    category: "Payment Processing", 
    count: 12, 
    status: "Complete",
    features: ["Credit Card Processing", "ACH Payments", "Buy Now Pay Later", "Financing Options"]
  },
  { 
    category: "User Management", 
    count: 8, 
    status: "In Progress",
    features: ["Role-based Access", "Multi-tenant Support", "SSO Integration", "Audit Logging"]
  },
  { 
    category: "Analytics & Reporting", 
    count: 6, 
    status: "Complete",
    features: ["Revenue Analytics", "Process Metrics", "Custom Reports", "Real-time Dashboards"]
  },
  { 
    category: "Integrations", 
    count: 7, 
    status: "Active",
    features: ["Wells Fargo API", "Synchrony Bank API", "CRM Integration", "Waterfall Processing"]
  }
];

const mockDashboardStats = {
  totalRevenue: "$12.4M",
  activeClients: 156,
  processingTime: "2.3 months",
  completionRate: "94%",
  recentActivity: [
    { action: "New client onboarded", client: "Ashley Furniture", time: "2 hours ago" },
    { action: "Financing approved", client: "Dell Technologies", time: "4 hours ago" },
    { action: "Process completed", client: "Helzberg Diamonds", time: "1 day ago" },
    { action: "Integration deployed", client: "Wells Fargo", time: "2 days ago" }
  ]
};

// Routes
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'OnboardIQ Demo Server Running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/contacts', (req, res) => {
  const { filter, search } = req.query;
  let results = [...mockContacts];
  
  if (filter && filter !== 'all') {
    results = results.filter(contact => 
      contact.type.toLowerCase().includes(filter.toLowerCase()) ||
      contact.status.toLowerCase().includes(filter.toLowerCase())
    );
  }
  
  if (search) {
    results = results.filter(contact =>
      contact.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.json({ contacts: results, total: results.length });
});

app.get('/platform-features', (req, res) => {
  res.json({ 
    features: mockPlatformFeatures,
    totalFeatures: mockPlatformFeatures.reduce((sum, cat) => sum + cat.count, 0)
  });
});

app.get('/dashboard', (req, res) => {
  res.json(mockDashboardStats);
});

// Handle both /login and /auth/login routes
app.post('/login', handleLogin);
app.post('/auth/login', handleLogin);

function handleLogin(req, res) {
  const { username, password } = req.body;
  
  // Demo login - accept any credentials
  if (username && password) {
    res.json({ 
      success: true, 
      user: { 
        id: 1, 
        username, 
        role: 'demo_user',
        fullName: 'Demo User',
        email: `${username}@demo.onboardiq.com`
      },
      message: 'Demo login successful',
      token: 'demo_token_' + Date.now()
    });
  } else {
    res.status(400).json({ 
      success: false, 
      message: 'Username and password required' 
    });
  }
}

app.get('/api/health', (req, res) => res.redirect('/health'));
app.get('/api/contacts', (req, res) => res.redirect('/contacts'));
app.get('/api/platform-features', (req, res) => res.redirect('/platform-features'));
app.get('/api/dashboard', (req, res) => res.redirect('/dashboard'));
app.post('/api/login', (req, res) => res.redirect('/login'));

// Export for Netlify Functions
module.exports.handler = serverless(app);