# La Maison - Restaurant Management System

A full-stack restaurant management system built with React and Node.js/Express. Started as a learning project to explore REST API design, OpenAPI spec, and connecting a frontend to a real backend.

---

## What it does

- Customer-facing website with Home, Menu, and Book a Table pages
- Staff dashboard to manage and update reservations
- REST API backend with full CRUD for bookings and menu items
- Floating chatbot assistant (Maison) that answers common restaurant queries
- Interactive API docs via Swagger UI at `/api/docs`

---

## Tech Stack

**Frontend**
- React 18 + Vite
- React Router v6
- Custom CSS (no UI library — all built from scratch)

**Backend**
- Node.js + Express
- swagger-ui-express + js-yaml for API docs
- In-memory data store for now (ready to swap with MySQL or MongoDB)

**API Spec**
- OpenAPI 3.0.3 (`la-maison-openapi.yaml`)

---

## Project Structure

```
LA-MAISON/
├── client/                  # React frontend
│   └── src/
│       ├── api/
│       │   └── bookings.js         # all API calls in one place
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── CalendarPicker.jsx  # custom date picker
│       │   └── ChatBot.jsx         # floating chat assistant
│       └── pages/
│           ├── Home.jsx
│           ├── MenuPage.jsx
│           ├── BookingPage.jsx
│           └── Dashboard.jsx
│
├── backend/                # Express API
│   ├── controllers/
│   │   ├── bookings.js
│   │   ├── menu.js
│   │   └── chat.js
│   ├── routes/
│   │   ├── bookings.js
│   │   ├── menu.js
│   │   └── chat.js
│   ├── app.js
│   └── la-maison-openapi.yaml
│
└── docs/
    └── la-maison-docs.docx  # full project documentation
```

---

## Running locally

You need two terminals open at the same time.

**Terminal 1 — Backend**

```bash
cd backend
npm install
node app.js
```

Runs on `http://localhost:8000`

> Note: Port 5000 is taken by macOS Control Center. Backend uses 8000.

**Terminal 2 — Frontend**

```bash
cd resto
npm install
npm run dev
```

Opens at `http://localhost:5173`

---

## API Endpoints

Base URL: `http://localhost:8000/api`

Interactive docs: `http://localhost:8000/api/docs`

### Bookings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/bookings` | Get all bookings. Filter by `?status=` or `?date=` |
| POST | `/bookings` | Create a new booking |
| GET | `/bookings/:id` | Get a single booking |
| PUT | `/bookings/:id` | Full update |
| PATCH | `/bookings/:id` | Partial update (e.g. change status) |
| DELETE | `/bookings/:id` | Delete a booking |

### Menu

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/menu` | Get all items. Filter by `?category=` |
| POST | `/menu` | Add a new item |
| GET | `/menu/:id` | Get single item |
| PUT | `/menu/:id` | Full update |
| PATCH | `/menu/:id` | Partial update (e.g. toggle available) |
| DELETE | `/menu/:id` | Delete an item |

### Other

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/chat` | Send a message, get a bot reply |
| GET | `/health` | Check if the server is alive |

---

## Validation (Booking Form)

- **Phone**: 7 to 10 digits only, optional `+` prefix — regex `/^\+?[0-9]{7,10}$/`
- **Email**: Only `@gmail.com`, `@yahoo.com`, `@hotmail.com` accepted
- **Date**: Past dates are blocked in both the UI and the validation function
- Errors show inline under each field on every keystroke and on submit

---

## Chatbot

The Maison assistant lives in the bottom-right corner of every page. It uses keyword pattern matching on the backend to answer questions about:

- Opening hours
- Menu and prices
- How to book a table
- Location
- Contact details
- Cancellations, parking, dietary requirements, special occasions

To swap the keyword matcher with an actual AI API later, just update `controllers/chat.js`.

---

## Connecting to a real backend

All API calls in the frontend go through `src/api/bookings.js`. When your backend URL changes (e.g. deploying to production), change one line:

```js
const BASE = 'http://localhost:8000/api'
```

That's it. Nothing else needs to change.

---

## What's next

- [ ] Replace in-memory arrays with MySQL or MongoDB
- [ ] Add auth so only staff can access the Dashboard
- [ ] Send confirmation emails on booking (EmailJS or Nodemailer)
- [ ] Swap chatbot keyword matcher with Gemini or OpenAI API
- [ ] Deploy frontend to Vercel, backend to Railway or Render

---

## Documentation

Full technical documentation is in `docs/la-maison-docs.docx`. Covers project overview, tech stack, all pages and features, API reference, validation rules, and setup instructions.
