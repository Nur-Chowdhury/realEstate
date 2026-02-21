# 🏡 NestFinder

NestFinder is a modern, full-stack real estate marketplace that connects
buyers, sellers, and renters. Built with the **MERN Stack (MongoDB,
Express, React, Node.js)**, this platform allows users to securely
manage accounts, create rich property listings with image uploads, and
search properties using advanced filtering and sorting mechanisms.

![NestFinder Preview](https://realestate-8xp3.onrender.com/)

------------------------------------------------------------------------

## 🚀 Features

### 🔐 Authentication & Security

-   Secure Email/Password registration & login
-   JWT stored in HTTP-only cookies
-   Google OAuth integration
-   Password hashing with bcryptjs

### 👤 Profile Management

-   Update username, email, and password
-   Upload and manage profile avatar

### 🏘️ Property Listings

-   Create, Read, Update, Delete (CRUD) listings
-   Upload up to 6 images per listing
-   Secure cloud storage with Supabase

### 🔎 Advanced Search & Filtering

-   Filter by:
    -   Type (Rent / Sale)
    -   Amenities (Parking, Furnished)
    -   Offers / Discounts
-   Sort by:
    -   Price (Low → High / High → Low)
    -   Latest / Oldest

### 🎨 UI/UX

-   Fully responsive design with Tailwind CSS
-   Light / Dark mode (Redux-managed)
-   Interactive carousels using Swiper & React-Slick
-   Toast notifications

------------------------------------------------------------------------

## 🛠️ Tech Stack

### 🖥️ Frontend

-   Framework: React 18 (Vite)
-   Styling: Tailwind CSS
-   State Management: Redux Toolkit & Redux Persist
-   Routing: React Router DOM
-   Cloud Storage: Supabase
-   Notifications: React Toastify
-   Icons & Sliders: React Icons, Swiper, React-Slick

### ⚙️ Backend

-   Runtime: Node.js
-   Framework: Express.js
-   Database: MongoDB & Mongoose
-   Authentication: JWT & bcryptjs
-   Routing: Express Router

------------------------------------------------------------------------

## ⚙️ Prerequisites

Make sure you have installed:

-   Node.js (v16 or higher)
-   MongoDB (Local or Atlas)
-   Supabase account (for image storage)

------------------------------------------------------------------------

## 💻 Installation & Setup

### 1️⃣ Clone the Repository

``` bash
git clone https://github.com/Nur-Chowdhury/realEstate.git
cd realEstate
```

### 2️⃣ Install Backend Dependencies

``` bash
npm install
```

### 3️⃣ Install Frontend Dependencies

``` bash
cd client
npm install
cd ..
```

### 4️⃣ Environment Variables Setup

Create a **single `.env` file in the root directory**.

Because Vite is configured with `envDir: '../'`, this file is shared
between backend and frontend.

Add the following:

``` env
# --------------------
# Backend Variables
# --------------------
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=5174
NODE_ENV=development

# --------------------
# Frontend Variables
# --------------------
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

### 5️⃣ Run the Application (Development Mode)

Run backend and frontend separately.

#### Terminal 1 (Backend)

``` bash
npm run dev
```

Backend runs at: http://localhost:5174

#### Terminal 2 (Frontend)

``` bash
cd client
npm run dev
```

Frontend runs at: http://localhost:5173

------------------------------------------------------------------------

## 📦 Build for Production

From the root directory:

``` bash
npm run build
```

This will: - Install dependencies - Build the Vite React app - Prepare
Express to serve static frontend files

Start production server:

``` bash
npm start
```

------------------------------------------------------------------------

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to open an issue or submit a pull request.

------------------------------------------------------------------------

## 📝 License

This project is open-source.

------------------------------------------------------------------------

## 👤 Author

**Nur**

GitHub: https://github.com/Nur-Chowdhury

------------------------------------------------------------------------

⭐ If you like this project, please consider giving it a star on GitHub!
