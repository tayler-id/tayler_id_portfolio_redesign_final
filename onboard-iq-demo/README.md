# OnboardIQ Demo

A working demonstration of the OnboardIQ platform showcasing the complete UX→UI→Frontend→Backend development process. This demo features a contact management system and platform features matrix built with modern web technologies.

## 🚀 Features

- **Contact Management System**: Advanced filtering with real-time search and multi-dimensional filtering capabilities
- **Platform Features Matrix**: Comprehensive feature-provider compatibility matrix with spreadsheet-style interface
- **Performance Optimized**: 60fps animations with hardware acceleration and Set-based filtering (O(1) performance)
- **Enterprise Design System**: Complete CSS framework with responsive design and dark mode support
- **Authentication**: Demo login system with role-based access control

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **Styling**: Custom CSS framework with CSS variables and hardware-accelerated animations
- **Security**: Helmet, rate limiting, session management

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL 13+
- Modern web browser

## 🚀 Quick Start

1. **Clone and Install**
   ```bash
   cd onboard-iq-demo
   npm install
   ```

2. **Database Setup**
   ```bash
   # Create database
   createdb onboard_iq_demo
   
   # Initialize tables
   npm run init-db
   
   # Seed with demo data
   npm run seed-db
   ```

3. **Environment Configuration**
   Create `.env` file:
   ```env
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=onboard_iq_demo
   DB_PASSWORD=your_password
   DB_PORT=5432
   PORT=3333
   NODE_ENV=development
   SESSION_SECRET=your-session-secret
   ```

4. **Start Demo Server**
   ```bash
   npm start
   ```

5. **Access Demo**
   - Open http://localhost:3333
   - Login with any username/password
   - Use "admin" as username for admin features

## 📊 Demo Data

The demo includes:
- 10 lending providers (Synchrony, Bread, Acima, Affirm, Klarna, etc.)
- 33+ platform features across 4 categories
- 55+ feature-provider relationships
- 10 provider contacts with realistic data

## 🎯 Demo Features

### Contact Management
- **Multi-dimensional filtering**: Partner, Vertical, Status, Response
- **Real-time search**: Instant results across all contact fields
- **Contact cards**: Provider relationships and role tags
- **Performance optimized**: Set-based filtering for O(1) performance

### Platform Features Matrix
- **Spreadsheet-style matrix**: Providers × Features grid
- **Category filtering**: Filter by Application, Payment, eCommerce, Miscellaneous
- **Support indicators**: Visual status (✓/✗/?) with hover tooltips
- **Statistics dashboard**: Coverage metrics and counts
- **Admin editing**: Inline editing for admin users

### Performance Features
- **60fps animations**: Hardware-accelerated with transform/opacity
- **Efficient DOM manipulation**: Batch updates and virtual scrolling
- **Progressive loading**: Smart caching and debounced inputs
- **Responsive design**: Mobile-optimized with touch interactions

## 🎨 Design System

### CSS Architecture
- **CSS Variables**: Consistent design tokens
- **Component system**: Modular, reusable components
- **Animation framework**: Hardware-accelerated keyframes
- **Responsive grid**: CSS Grid with mobile-first approach
- **Dark mode support**: Automatic system preference detection

### Performance Optimizations
- **Hardware acceleration**: transform3d() and will-change
- **Set-based filtering**: O(1) lookup performance
- **Debounced inputs**: Reduced API calls and DOM updates
- **Intersection Observer**: Lazy loading and scroll animations

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Demo login (any username/password)
- `POST /api/auth/logout` - Logout and destroy session
- `GET /api/auth/user` - Get current user info

### Contacts
- `GET /api/contacts` - Get all provider contacts with filtering
- Supports real-time search and multi-dimensional filtering

### Platform Features
- `GET /api/platform-features` - Get all platform features
- `GET /api/providers` - Get all active providers
- `GET /api/feature-matrix` - Get feature-provider relationships
- `POST /api/platform-features/relationship` - Update feature support (admin)

## 📱 Browser Support

- Chrome 80+ (recommended)
- Firefox 75+
- Safari 13+
- Edge 80+

Modern browsers with CSS Grid, ES6+, and Intersection Observer support.

## 🔐 Security Features

- **Helmet.js**: Security headers and CSP
- **Rate limiting**: API protection (100 req/15min)
- **Session management**: Secure session handling
- **Input validation**: SQL injection prevention
- **CORS protection**: Cross-origin request security

## 📈 Performance Metrics

- **Animation target**: 60fps smooth animations
- **Filter performance**: O(1) Set-based lookups
- **Load time**: < 2s initial page load
- **Bundle size**: Optimized CSS/JS delivery
- **Database queries**: Optimized with proper indexes

## 🎯 Portfolio Showcase

This demo demonstrates:

1. **UX Research**: 15+ stakeholder interviews and user personas
2. **UI Design**: Enterprise design system and component library
3. **Frontend Engineering**: Performance-optimized JavaScript and CSS
4. **Backend Integration**: Node.js API with PostgreSQL database

Perfect for showcasing full-stack development capabilities in a portfolio context.

## 🚀 Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use environment variables for all config
3. Set up SSL/HTTPS
4. Configure proper database backups
5. Set up monitoring and logging

## 📞 Demo Access

- **URL**: http://localhost:3333
- **Username**: Any (try "admin" for admin features)
- **Password**: Any
- **Purpose**: Portfolio demonstration of technical capabilities

---

*This demo showcases the complete development process from UX research through production implementation, highlighting technical skills in full-stack development, performance optimization, and enterprise-grade system design.*