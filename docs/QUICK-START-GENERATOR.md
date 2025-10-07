# 🎯 Quick Start: Auto Route Generator

## Menambah Page Baru (3 Steps)

### 1️⃣ Buat Folder & Component

```powershell
# Buat folder (misalnya ReportsPage)
mkdir src/pages/admin/ReportsPage

# Buat file index.tsx
```

```tsx
// src/pages/admin/ReportsPage/index.tsx
const ReportsPage = () => {
  return <div>Reports Page</div>;
};

export default ReportsPage;
```

### 2️⃣ Generate Routes

```bash
npm run generate-routes
```

Output akan menampilkan route baru:

```
📊 Summary:
   Admin routes: 11
      - /reports → ReportsPage  ← Route baru!
```

### 3️⃣ (Opsional) Export di index.ts

```tsx
// src/pages/admin/index.ts
export { default as ReportsPage } from "./ReportsPage";
```

## ✅ Done!

Route `/admin/reports` langsung bisa diakses!

## 🔄 Development Mode

Gunakan watch mode agar auto-regenerate saat ada perubahan:

```bash
npm run watch-routes
```

Biarkan running di terminal terpisah saat development.

## 📚 Full Documentation

Lihat dokumentasi lengkap di: [`docs/AUTO-ROUTE-GENERATOR.md`](./AUTO-ROUTE-GENERATOR.md)
