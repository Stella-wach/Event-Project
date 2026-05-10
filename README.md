# QuickEvents 

A full-stack event booking platform built with React, Node.js, and MongoDB. Users can browse events, book tickets, pay via M-Pesa, and manage their bookings — all in one place.

##  Live Demo

- **Frontend:** https://quickeventsfrontend.vercel.app
- **Backend:** https://event-project-esp3.onrender.com

---

##  Features

-  **Authentication** — Secure sign in/sign up via Clerk
-  **Browse Events** — Explore trending and featured events by category
-  **Ticket Booking** — Choose from Advance, VIP, and Student ticket types
-  **M-Pesa Payments** — Pay instantly via M-Pesa STK push or book now and pay later
-  **Favorites** — Save events you love for quick access
-  **My Bookings** — View and manage all your bookings
-  **Admin Dashboard** — Manage events, bookings, and listings
-  **Page Transitions** — Smooth animations powered by Framer Motion

---

##  Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React | UI framework |
| Vite | Build tool |
| Tailwind CSS | Styling |
| Framer Motion | Page transition animations |
| Clerk | Authentication |
| Axios | HTTP requests |
| React Router DOM | Client-side routing |
| React Hot Toast | Notifications |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | Server framework |
| MongoDB + Mongoose | Database |
| Clerk Express | Auth middleware |
| Inngest | Background jobs / event-driven functions |
| M-Pesa Daraja API | Payment processing |
| dotenv | Environment variables |
| CORS | Cross-origin resource sharing |
| Nodemon | Development server |

---

##  Project Structure

Event-Project/
├── client/                   # React frontend
│   ├── src/
│   │   ├── assets/           # Static assets
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── BlurCircle.jsx
│   │   │   ├── PageTransition.jsx
│   │   │   └── ...
│   │   ├── context/          # App-wide state (appContext)
│   │   ├── library/          # Utility/helper functions
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── EventDetails.jsx
│   │   │   ├── EventCheckout.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   ├── Favorite.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLayout.jsx
│   │   │       ├── Dashboard.jsx
│   │   │       ├── AddEvents.jsx
│   │   │       ├── ListEvents.jsx
│   │   │       └── ListBookings.jsx
│   │   └── App.jsx
│   └── .env
│
└── server/                   # Express backend
├── config/
│   └── db.js             # MongoDB connection
├── routes/
│   ├── eventRoutes.js
│   ├── bookingRoutes.js
│   ├── adminRoutes.js
│   ├── userRoutes.js
│   └── mpesaRoutes.js
├── inngest/
│   └── index.js          # Inngest functions
├── server.js
└── .env

---

##  Getting Started

### Prerequisites

- Node.js v18+
- MongoDB database (Atlas or local)
- Clerk account
- M-Pesa Daraja API credentials
- Inngest account

### 1. Clone the repository

```bash
git clone https://github.com/Stella-wach/Event-Project.git
cd Event-Project
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLIENT_URL=http://localhost:5173

# M-Pesa
CONSUMER_KEY=your_mpesa_consumer_key
CONSUMER_SECRET=your_mpesa_consumer_secret
BUSINESS_SHORT_CODE=174379
PASSKEY=your_mpesa_passkey
CALLBACK_URL=your_callback_url
```

Start the backend:

```bash
npm run server
```

### 3. Setup the Frontend

```bash
cd client
npm install
```

Create a `.env` file in the client directory:

```env
VITE_BASE_URL=http://localhost:3000
VITE_CURRENCY=KSh
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Start the frontend:

```bash
npm run dev
```

### 4. Open in 
---

##  Environment Variables

### Backend (`server/.env`)

| Variable | Description |
|---|---|
| `PORT` | Server port (default: 3000) |
| `MONGODB_URI` | MongoDB connection string |
| `CLERK_SECRET_KEY` | Clerk backend secret key |
| `CLIENT_URL` | Frontend URL for CORS |
| `CONSUMER_KEY` | M-Pesa Daraja consumer key |
| `CONSUMER_SECRET` | M-Pesa Daraja consumer secret |
| `BUSINESS_SHORT_CODE` | M-Pesa business short code |
| `PASSKEY` | M-Pesa passkey |
| `CALLBACK_URL` | M-Pesa payment callback URL |

### Frontend (`client/.env`)

| Variable | Description |
|---|---|
| `VITE_BASE_URL` | Backend API base URL |
| `VITE_CURRENCY` | Currency symbol displayed in UI |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk frontend publishable key |

---

##  M-Pesa Integration

This project uses the **Safaricom Daraja API** for payments.

- Users can pay instantly via **STK Push** (a prompt is sent to their phone)
- Alternatively, users can **Book Now, Pay Later**
- Payment status is polled every 3 seconds for up to 2 minutes after STK push

> **Note:** The app currently uses the M-Pesa **sandbox** environment. Switch to production credentials for live payments.

---

##  Admin Access

The admin dashboard is protected and only accessible to authorized emails. To access:

1. Log in with an authorized account
2. Navigate to `/admin`
3. From the dashboard you can add events, view all bookings, and manage listings

---

##  Deployment

### Frontend — Vercel
1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy

### Backend — Render
1. Push to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set environment variables in Render dashboard
4. Set build command: `npm install`
5. Set start command: `npm run server`

> **Note:** The free Render tier spins down after inactivity, which can cause a delay of 50+ seconds on the first request. Consider upgrading for production use.

---



##  Author

**Stella Wambui**
- GitHub: [@Stella-wach](https://github.com/Stella-wach)

---

