# 🎨 G-Scores Web Application (`apps/web`)

Modern, ultra-responsive React 19 single-page web application (SPA) for high school examination result lookup, interactive score distribution charts, and university entrance rankings.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: TypeScript v5.7
- **Styling**: Tailwind CSS v4 + Shadcn UI
- **Typography**: Google Font `Rubik`
- **Charts**: Recharts v3 (Responsive Donut Charts)
- **Data Fetching**: TanStack Query v5 + Axios
- **Routing**: React Router v7 SPA

---

## 📌 Features & Pages

### 1. 🔍 Tra Cứu Điểm SBD (`/lookup`)
- 8-digit numeric input validation (`/^[0-9]{8}$/`).
- Color-coded score cards for 10 subjects (Excellent: Emerald, Average: Amber, Poor: Red).
- Graceful 404 / Error handling cards.

### 2. 📊 Thống Kê Phổ Điểm (`/statistics`)
- Interactive Recharts Donut Charts for score distribution across 4 levels (**Giỏi ≥8.0**, **Khá 6-8**, **TB 4-6**, **Yếu <4**).
- Subject filter dropdown (Math, Lit, Eng, Phys, Chem, Bio, Hist, Geo, Civic Ed).

### 3. 🏆 Bảng Xếp Hạng Top 10 (`/ranking`)
- Selector tabs for 5 major entrance groups (**Khối A**, **A1**, **B**, **C**, **D**).
- Distinct rank badges (`#1`, `#2`, `#3`) aligned vertically in responsive data tables.

---

## 🚀 Quick Start (Local Web Server)

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Environment Variables**:
   Create `.env` (or copy `.env.example`):
   ```env
   VITE_API_BASE_URL="http://localhost:3000"
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.
