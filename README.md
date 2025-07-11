  # HR Dashboard


<img width="1889" height="877" alt="Screenshot 2025-07-12 024847" src="https://github.com/user-attachments/assets/acae4a0d-ff13-4000-842f-c8eb2e0e594c" />


A mini HR performance dashboard built with **Next.js 14 App Router**, Tailwind CSS, Framer Motion, Chart.js and NextAuth .js.

> **Live demo:https://hr-dashboard-jet-tau.vercel.app/** <!-- replace with your Vercel URL, e.g. https://hr-dashboard.vercel.app -->

---

## ✨ Features Implemented

| Category | Details |
|----------|---------|
| Core UI | Employee cards, dynamic user details, responsive grid |
| Search & Filter | Text search + multi‑select department / rating filters |
| Bookmarks | Context store, promote & project‑assign modals |
| Pagination | 9 users / page with animated page switch |
| Dark / Light Mode | Toggle saved in `localStorage`, full Tailwind theming |
| Analytics | Bar, doughnut & line charts (Chart.js) with mock data |
| Animations | Framer Motion for grid, tabs, search bar, analytics |
| Authentication | NextAuth credentials login, middleware guards every route |
| Accessibility | Keyboard nav, focus‑visible rings, ARIA labels |
| Bonus | Feedback form, Create‑User modal (optional), loading skeletons |

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/<your‑username>/hr-dashboard.git
cd hr-dashboard

# Install deps
npm install

# Environment
echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)" > .env.local
# If deploying locally add:
# NEXTAUTH_URL=http://localhost:3000

# Run dev server
npm run dev   # http://localhost:3000
```

## Demo credentials

Email: admin@demo.com	
Password: password123

## Production build
```
npm run build && npm start
```

 Folder Structure
 ```
src/
  app/
    analytics/          # /analytics page
    bookmarks/          # /bookmarks page
    employee/[id]/      # dynamic profile
    login/              # custom sign‑in
    layout.js           # server layout
    page.js             # home
  components/
    Navbar.jsx
    UserCard.jsx
    SearchFilterBar.jsx
    UserMenu.jsx
    ProvidersClient.jsx
  context/
    UsersContext.js
    BookmarksContext.js
  hooks/
    useFetchUsers.js
    useDarkMode.js
  styles/
    globals.css
  api/
    auth/[...nextauth]/route.js  # NextAuth endpoint
middleware.js           # route guards

```
 ## Screenshots
 
Login Screen

<img width="1919" height="872" alt="image" src="https://github.com/user-attachments/assets/e5153ad4-e725-4f5c-8f9b-a8b5cabde559" />

Analytics Screen 
<img width="1886" height="862" alt="image" src="https://github.com/user-attachments/assets/c174cb3e-56f0-4435-ac8b-9df84e8c9b87" />

Feedback Screen 
<img width="1919" height="875" alt="image" src="https://github.com/user-attachments/assets/aa38055e-a217-4ecc-92d9-672838ddf7a6" />


 ## Scripts
 
Command	What it does
```
npm run dev: Start dev server (port 3000)
npm run build: Create production build
npm start: Serve production build
npm run lint: ESLint + Tailwind class sorting
```

## 📑 License

This project is licensed under the **MIT License**.


