# 💸 Tranzakt

> Peer‑to‑peer money transfer app built with the MERN stack. Fast, minimal, and focused on real‑world payment flows.

---

## 🚀 What’s Live Today (MVP)

| Feature | Details |
|---------|---------|
| **JWT Auth** | Signup / login, token refresh, logout |
| **User Search** | Live search by username |
| **Send Money** | Secure transfer between users (MongoDB transaction) |
| **Friends** | Instantly add or remove friends and pay and receive Money |
| **Dashboard** | Current balance + quick actions |
| **Toast Alerts** | Instant feedback for success / failure |
| **Tranzaktions** | Transaction history in-sync with the Database|

---

## 🧠 Real‑Worthy Roadmap

> Sorted by impact — knock out the 🔥 items first, then sprinkle on the 💎 polish. Will get added ASAIW ( as soon as i want )

### 🔥 Features to look forward

1. **Wallet / Balance System**  
   - Real‑time balance updates  
   - Safe add / deduct logic

2. **Recipient Auto‑Suggest**  
   - Text‑index search with avatar / email preview

3. **Robust Error Handling**  
   - Toasts for insufficient funds, invalid user, API lag

4. **Protected Routes + Auto‑Logout**  
   - Route guard for all private pages  
   - Expire sessions on JWT tampering / timeout

### 💎 Upcoming

| Feature | Why It Pops |
|---------|-------------|
| Bitcoin(TZTs) | Web3 must have things |
| PDF receipt download | Shows doc‑gen skills (`pdf-lib` / `jspdf`) |
| Dark mode toggle ( already made in darkmode) | Modern UX; Tailwind + localStorage |
| Admin panel | View users / transactions, ban accounts |
| QR / UPI mock | Cool demo, QR generation & scan |
| Email notifications | Nodemailer + Mailtrap for signup / receipts |

---

## ⚙️ Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT 
-  Zod

### Frontend
- React
- Tailwind CSS
- Axios
- Toast

---

## 📂 Project Layout

tranzakt/  
├── backend/  
│ ├── routes/ # Express route handlers  
│ ├── zodschema/ # Zod input validation schemas  
│ ├── config.js # App config  
│ ├── db.js # MongoDB connection logic  
│ ├── index.js # Server entry point  
│ ├── middlewares.js # Custom middlewares (auth, etc.)  
│ ├── package.json  
│ └── .gitignore  
│  
├── frontend/  
│ ├── public/ # Static files (index.html, favicon, etc.)  
│ ├── src/  
│ │ ├── assets/ # Images, icons, and other media  
│ │ ├── components/ # Reusable React components  
│ │ ├── pages/ # Page-level components (Dashboard, Send, etc.)  
│ │ ├── App.jsx # App wrapper with routing  
│ │ ├── App.css # App-level styles  
│ │ ├── index.css # Global Tailwind styles  
│ │ └── main.jsx # Entry point (ReactDOM.render)  
│ ├── package.json  
│ └── .gitignore  
│  
├── package-lock.json  
└── .eslintrc.cjs # Linting rules

---

## 🛠️ Run Locally

```bash
# Backend
cd backend && npm i && node index.js

# Frontend (new terminal)
cd frontend && npm i && npm run dev
```
## 🤝 Contributing

  

Pull up and contribute if you're not scared of `git merge conflicts`.

  

- Fork the repo

- Create a new branch (`git checkout -b feature-yourFeature`)

- Make your changes

- Push to your fork

- Open a pull request

  

We don’t bite — but bad code might get roasted in the PR review 🔥

  

---

  

## 📄 License

  

MIT — free to use, remix, or clone.

Just don’t ship this as “Paytm™ Next Gen” and try to raise funding, you absolute menace 😎

No warranties. If it breaks, it’s all yours.

  

## 🧑‍💻 Author

  

Built by **Anubhav Dixit**

GitHub: [@ynubhav](https://github.com/ynubhav)