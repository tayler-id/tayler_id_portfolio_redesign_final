# OnboardIQ Demo - Deployment Guide

## 🚀 Quick Deploy to Netlify

### Option 1: Drag & Drop (Fastest - 2 minutes)

1. **Prepare Files:**
   ```bash
   cd onboard-iq-demo
   npm install
   npm run build
   ```

2. **Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with GitHub
   - Drag the entire `onboard-iq-demo` folder to Netlify
   - Wait for deployment (1-2 minutes)

3. **Configure Custom Domain:**
   - Go to Site Settings → Domain Management  
   - Add custom domain: `onboard-iq-demo.netlify.app`
   - Update DNS settings if needed

### Option 2: Netlify CLI (Automated)

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login and Deploy:**
   ```bash
   cd onboard-iq-demo
   netlify login
   netlify init
   netlify deploy --prod
   ```

3. **Set Custom Domain:**
   ```bash
   netlify sites:update --name onboard-iq-demo
   ```

### Option 3: GitHub Integration (Best for Updates)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial OnboardIQ demo"
   git remote add origin https://github.com/yourusername/onboard-iq-demo.git
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to Netlify → New site from Git
   - Connect GitHub repository
   - Build settings are auto-detected from `netlify.toml`

## ✅ What's Deployed

### **Frontend (Static Files):**
- Modern responsive landing page
- Login, Dashboard, Contacts, Platform Features pages
- CSS animations and styling system
- Real-time API integration

### **Backend (Netlify Functions):**
- Express.js API running on serverless functions
- Mock data for 10+ contacts with filtering
- Platform features with 33+ items across 4 categories
- Health check endpoint
- Demo authentication (accepts any username/password)

### **API Endpoints:**
- `GET /health` - Server status
- `GET /contacts` - Contact management with filtering
- `GET /platform-features` - Feature matrix
- `GET /dashboard` - Dashboard metrics
- `POST /login` - Demo authentication

## 🔧 Configuration

### **Environment Variables (Optional):**
If you want to add real database later:
```
DB_HOST=your-database-host
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=onboard_iq_demo
```

### **Custom Domain Setup:**
1. Deploy to Netlify
2. Go to Site Settings → Domain Management
3. Add custom domain: `onboard-iq-demo.netlify.app`
4. Netlify will provide HTTPS automatically

## 📱 Demo Features

### **Live Demo Includes:**
- ✅ Beautiful landing page with metrics
- ✅ Working contact filtering (10+ demo contacts)
- ✅ Platform features matrix (33+ features)
- ✅ Mock authentication system
- ✅ Responsive design for all devices
- ✅ Real API calls to Netlify functions
- ✅ Professional UI matching portfolio design

### **Demo Data:**
- **Contacts:** Ashley Furniture, Dell Technologies, Wells Fargo, Synchrony Bank, etc.
- **Revenue Impact:** $12.4M total across all clients
- **Features:** Payment Processing, User Management, Analytics, Integrations
- **Metrics:** 156 active clients, 94% completion rate, 2.3 month processing time

## 🎯 Next Steps After Deployment

1. **Get the Live URL** (e.g., `https://onboard-iq-demo.netlify.app`)
2. **Update your portfolio** to use the live URL instead of localhost
3. **Test all demo features** to ensure everything works
4. **Share the live demo** with potential employers/clients

## 🐛 Troubleshooting

### **Build Fails:**
```bash
cd onboard-iq-demo
rm -rf node_modules
npm install
npm run build
```

### **Functions Don't Work:**
- Check `netlify.toml` is in the root
- Verify `netlify/functions/api.js` exists
- Check Netlify function logs in dashboard

### **API Calls Fail:**
- Functions may take 10-15 seconds to cold start
- Check Network tab in browser dev tools
- Verify `_redirects` file exists in `public/`

## 🚀 Ready to Deploy!

Your OnboardIQ demo is now ready for production deployment. The demo will showcase:
- Your full-stack development skills
- UX/UI design capabilities  
- Real working functionality
- Professional presentation

**Total setup time: 5-10 minutes**