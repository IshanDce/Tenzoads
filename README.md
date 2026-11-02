# TenzoAds - Modern IT Services & Digital Product Studio

TenzoAds is a full-stack, production-ready corporate website for an IT services company building mobile apps, high-performance websites, and AI products. Built to match Figma design specifications pixel-accurately across mobile, tablet, and desktop viewports.

---

## 🚀 Tech Stack

### Frontend (`/client`)
- **Core:** React 18 + Vite
- **Routing:** React Router v6 (lazy-loaded routes with Suspense)
- **Styling:** Tailwind CSS (custom design system tokens)
- **Motion:** Framer Motion (subtle, accessible animations respecting `prefers-reduced-motion`)
- **Forms & Validation:** React Hook Form + Zod
- **Icons:** Lucide React
- **SEO & Meta:** React Helmet Async + semantic Open Graph tags + `sitemap.xml` & `robots.txt`
- **HTTP Client:** Axios

### Backend (`/server`)
- **Runtime:** Node.js + Express (ES Modules)
- **Database:** MongoDB with Mongoose (includes automatic zero-config `mongodb-memory-server` fallback for local dev/testing without external MongoDB)
- **Security:** Helmet, CORS (restricted to client URL), express-rate-limit (IP-based limits for contact & newsletter)
- **Validation:** Express Validator + Honeypot anti-spam
- **Email:** Nodemailer (SMTP credentials from `.env` with safe dev logging fallback)

---

## 📁 Monorepo Structure

```text
/client                 # React 18 + Vite frontend
  ├── public/           # Static assets, favicon.svg, robots.txt, sitemap.xml
  ├── src/
  │   ├── components/
  │   │   ├── cards/    # ServiceCard, ProjectCard, PostCard
  │   │   ├── common/   # Logo, CtaBand, SectionHeading, FaqAccordion, FilterPills, etc.
  │   │   ├── layout/   # TopBar, Navbar, Footer
  │   │   └── mockups/  # PhoneMockup, BrowserMockup, DashboardMockup, BrandMockup, ChatMockup, etc.
  │   ├── config/       # site.js (single source of truth for phone, email, offices, links)
  │   ├── pages/        # Home, About, Portfolio, ProjectDetail, Blogs, BlogDetail, Contact, NotFound
  │   ├── services/     # api.js (Axios client)
  │   ├── App.jsx       # Route tree & global layout
  │   └── main.jsx
  ├── .env.example
  └── tailwind.config.js

/server                 # Express API
  ├── src/
  │   ├── config/       # db.js (MongoDB / in-memory fallback), mailer.js (Nodemailer)
  │   ├── middleware/   # errorHandler.js, rateLimiter.js
  │   ├── models/       # Contact, Subscriber, Project, Post
  │   ├── routes/       # contact, newsletter, projects, posts, health
  │   ├── scripts/      # seed.js (preloads 9 projects & 7 blog posts)
  │   └── index.js      # Server entry point
  └── .env.example

package.json            # Root workspace scripts (concurrently dev runner)
README.md               # Setup & deployment documentation
```

---

## ⚙️ Quick Start

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v20/v24)
- **npm** v9+

### 2. Install Dependencies
Run the root helper script to install all dependencies for root, server, and client:
```bash
npm run install:all
```
*(Or run `npm install` in the root, `/server`, and `/client` directories individually).*

### 3. Environment Variables

#### Server (`/server/.env`)
Copy the example file:
```bash
cp server/.env.example server/.env
```
Default configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tenzoads
CLIENT_URL=http://localhost:3000
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=
SMTP_PASS=
ADMIN_email=hello@yourdomain.com
```
> **Note:** If `MONGODB_URI` is not reachable locally, the server automatically starts an in-memory MongoDB instance (`mongodb-memory-server`) so you can run and test everything immediately without installing or starting MongoDB!

#### Client (`/client/.env`)
Copy the example file:
```bash
cp client/.env.example client/.env
```
Default configuration:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_MAPS_EMBED_URL=
```

### 4. Seed the Database
Pre-populate the database with the 9 projects and 7 blog posts:
```bash
npm run seed
```
*(Note: If the database is empty, the server also auto-seeds on initial boot).*

### 5. Start Development Servers
Start both the Express API and Vite React frontend concurrently with one command:
```bash
npm run dev
```
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **API Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🌐 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service status & database connection state |
| `GET` | `/api/projects` | Query projects (`?category=`, `?page=`, `?limit=`) |
| `GET` | `/api/projects/:slug` | Single project case study + related projects |
| `GET` | `/api/posts` | Query articles (`?category=`, `?page=`, `?limit=`) |
| `GET` | `/api/posts/featured` | Primary featured blog post |
| `GET` | `/api/posts/:slug` | Single blog article + related articles |
| `POST` | `/api/contact` | Submit quote request (rate-limited, validated with Zod & express-validator, triggers email) |
| `POST` | `/api/newsletter` | Subscribe to monthly newsletter (unique check & rate-limited) |

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

---

## 🛠️ Production Build

To build the client application for production:
```bash
npm run build
```
The optimized production output is generated in `/client/dist`.

To test the production build locally:
```bash
cd client && npm run preview
```
