# TenzoAds - Modern IT Services & Digital Product Studio

TenzoAds is a full-stack, production-grade web platform for an IT services company building mobile apps, high-performance websites, and AI products. The monorepo consists of three decoupled components:
1. **/WEBSITE** - The public corporate website (React 18 + Vite, Tailwind CSS, Framer Motion)
2. **/ADMIN** - Complete administrative management portal (React 18 + Vite, Tailwind CSS, TipTap, Recharts, React Query)
3. **/BACKEND** - Shared Express API & MongoDB engine serving both public visitors and authenticated administrators.

---

## 📁 Monorepo Architecture

```text
/WEBSITE                # Public Client Website (Port: 5173)
  ├── public/           # Favicon, robots.txt, sitemap.xml
  ├── src/
  │   ├── components/   # UI components (mockups, cards, layout, common)
  │   ├── config/       # site.js (fallback defaults)
  │   ├── hooks/        # useSiteData.js (Dynamic React Query hooks)
  │   ├── pages/        # Home, About, Portfolio, Blogs, Contact, Legal
  │   └── services/     # api.js (Axios client for public API)
  ├── .env.example
  └── vite.config.js    # Configured on port 5173

/ADMIN                  # Administrative Control Center (Port: 5174)
  ├── src/
  │   ├── components/   # Sidebar, Layout, ProtectedRoute, RichTextEditor, ImageUpload, ConfirmModal
  │   ├── lib/          # api.js (Axios with auto-refresh), auth.jsx (AuthContext)
  │   ├── pages/        # Dashboard, Projects, Posts, Quotes, Subscribers, Services, FAQs, Tech, etc.
  │   └── App.jsx       # Protected route tree with role enforcement
  ├── .env.example
  └── vite.config.js    # Configured on port 5174

/BACKEND                # Shared Node + Express API (Port: 5000)
  ├── src/
  │   ├── config/       # db.js (MongoDB / in-memory auto-fallback), mailer.js
  │   ├── controllers/  # adminController, authController, publicController
  │   ├── middleware/   # auth (JWT), role (superadmin), rateLimiter, upload (Multer)
  │   ├── models/       # Admin, Project, Post, Service, Faq, Technology, ProcessStep, etc.
  │   ├── routes/       # adminRoutes, publicRoutes, contact, newsletter, health
  │   ├── scripts/      # seed.js (Full database seed with superadmin and test editor)
  │   └── utils/        # jwt.js, cache.js
  └── .env.example

package.json            # Root runner (concurrently scripts)
README.md               # Project guide & reference
```

---

## ⚙️ Quick Start

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v20/v24)
- **npm** v9+

### 2. Install All Dependencies
Run the root helper script to install dependencies across root, BACKEND, WEBSITE, and ADMIN:
```bash
npm run install:all
```

### 3. Environment Configuration

#### Backend (`/BACKEND/.env`)
```bash
cp BACKEND/.env.example BACKEND/.env
```
Default parameters:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tenzoads
WEBSITE_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
JWT_SECRET=tenzoads_super_secret_jwt_access_key_2026_xyz
JWT_REFRESH_SECRET=tenzoads_super_secret_jwt_refresh_key_2026_abc
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=
SMTP_PASS=
ADMIN_EMAIL=hello@yourdomain.com
UPLOAD_DIR=uploads
SEED_ADMIN_EMAIL=admin@tenzoads.com
SEED_ADMIN_PASSWORD=Admin@123456
```
> **Note on Database:** If `MONGODB_URI` cannot connect to a local MongoDB daemon, the server starts an automated zero-config in-memory MongoDB instance (`mongodb-memory-server`) so you can test everything out-of-the-box immediately without installing MongoDB!

#### Website (`/WEBSITE/.env`)
```bash
cp WEBSITE/.env.example WEBSITE/.env
```
```env
VITE_API_URL=http://localhost:5000/api
```

#### Admin (`/ADMIN/.env`)
```bash
cp ADMIN/.env.example ADMIN/.env
```
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed Database
Pre-populate the database with the default Superadmin account, test Editor, site settings, services, technologies, process steps, why-us items, FAQs, page copy, 9 projects, and 7 blog posts:
```bash
npm run seed
```

### 5. Run All Services
Start Backend API, Public Website, and Admin Portal concurrently:
```bash
npm run dev
```

Or run any service individually:
- `npm run dev:backend` → Express API on [http://localhost:5000](http://localhost:5000)
- `npm run dev:website` → Public Website on [http://localhost:5173](http://localhost:5173)
- `npm run dev:admin` → Admin Portal on [http://localhost:5174](http://localhost:5174)

---

## 🔐 Admin Authentication & Credentials

Pre-seeded administrator accounts:

| Role | Email | Password | Permissions |
|---|---|---|---|
| **Super Admin** | `admin@tenzoads.com` | `Admin@123456` | Full access: content, settings, users, media |
| **Editor** | `editor@tenzoads.com` | `Editor@123456` | Content management (projects, posts, quotes, subscribers, services, faqs) |

### Security Model:
- **Access Token:** Short-lived JWT (15 min) passed in Authorization header.
- **Refresh Token:** Stored in an `httpOnly`, `sameSite`, secure cookie (7 days) with automated silent refresh interceptor.
- **Rate Limiting:** Login endpoint limited to 5 attempts per 15 minutes per IP.
- **Role Enforcement:** Route-level middleware prevents non-superadmins from accessing settings or admin user management.

---

## 🌐 API Reference

### Public Endpoints (`/api/*` - Cached 30s-60s)
- `GET /api/settings` - Global site contact details, office addresses, and social links
- `GET /api/page-content/:key` - Dynamic headlines & copy for home, about, portfolio, blogs, contact, cta
- `GET /api/services` - Active service offerings
- `GET /api/technologies` - Active technology chip tags
- `GET /api/process-steps` - "How we work" process milestones
- `GET /api/why-us` - Value proposition cards
- `GET /api/faqs?page=home|contact` - Active FAQ questions and answers
- `GET /api/projects` - Published portfolio items (search, category, pagination)
- `GET /api/projects/:slug` - Single project detail
- `GET /api/posts` - Published blog posts
- `GET /api/posts/featured` - Main featured blog hero
- `GET /api/posts/:slug` - Single article detail
- `POST /api/contact` - Submit quote request (rate-limited, spam protected)
- `POST /api/newsletter` - Subscribe to newsletter
- `GET /api/health` - API & DB health check

### Admin Endpoints (`/api/admin/*` - Protected by JWT)
- `POST /api/admin/auth/login` - Authenticate admin & issue cookies
- `POST /api/admin/auth/refresh` - Refresh access token via cookie
- `POST /api/admin/auth/logout` - Clear refresh cookies
- `GET /api/admin/auth/me` - Current admin session
- `PUT /api/admin/auth/change-password` - Update password
- `GET /api/admin/dashboard` - Stats, 6-month inquiry trend, recent submissions
- `GET, POST, PUT, DELETE /api/admin/projects` - Portfolio CRUD
- `GET, POST, PUT, DELETE /api/admin/posts` - Blog articles CRUD with TipTap HTML
- `GET, POST, PUT, DELETE /api/admin/services` - Services CRUD
- `GET, POST, PUT, DELETE /api/admin/faqs` - FAQs CRUD
- `GET, POST, PUT, DELETE /api/admin/technologies` - Tech pills CRUD
- `GET, POST, PUT, DELETE /api/admin/process-steps` - Process steps CRUD
- `GET, POST, PUT, DELETE /api/admin/why-us` - Why-Us pillars CRUD
- `GET, PUT /api/admin/page-content/:key` - Page copy JSON key-value CRUD
- `GET, PUT, DELETE /api/admin/quote-requests` - Leads management & status workflow
- `GET /api/admin/quote-requests/export-csv` - Export quote requests to CSV
- `GET, PUT, DELETE /api/admin/subscribers` - Newsletter subscriber toggle & delete
- `GET /api/admin/subscribers/export-csv` - Export subscribers to CSV
- `POST /api/admin/media` - Upload image asset (JPG, PNG, WEBP, SVG max 5MB)
- `GET, DELETE /api/admin/media` - Media library management
- `GET, PUT /api/admin/settings` - Superadmin site settings
- `GET, POST, PUT, DELETE /api/admin/users` - Superadmin user management

---

## 🎨 Design System Tokens

- **Primary Amber:** `#F5A93B` (Hover: `#E8962A`)
- **Ink / Black:** `#0D0D0D`
- **Cream (Hero):** `#FDF6E4`
- **Light Cream (Cards / Alt):** `#FBF7EE`
- **White:** `#FFFFFF`
- **Muted Text:** `#5F5F5F`
- **Light Border:** `#EFE7D6`
- **Typography:** *Plus Jakarta Sans* (Weights: 400 to 800)
