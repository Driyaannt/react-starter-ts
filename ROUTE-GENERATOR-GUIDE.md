# 🚀 Auto Route Generator - Panduan Lengkap

## 📖 Cara Kerja

Generator ini akan **otomatis membuat routes** berdasarkan struktur folder di `src/pages/`.

### Contoh:

```
src/pages/admin/
  ├── Dashboard/
  │   └── index.tsx        → Route: /admin/dashboard
  ├── Users/
  │   └── index.tsx        → Route: /admin/users
  └── ReportsPage/
      └── index.tsx        → Route: /admin/reports-page
```

---

## 🎯 Langkah-langkah Menambah Page Baru

### **Step 1: Buat Folder & File Baru**

```bash
# Contoh: Tambah page "Invoices"
mkdir src/pages/admin/Invoices
```

Buat file `src/pages/admin/Invoices/index.tsx`:

```tsx
import React from "react";

const Invoices = () => {
  return (
    <div>
      <h1>Invoices Page</h1>
      <p>This is the invoices page</p>
    </div>
  );
};

export default Invoices;
```

### **Step 2: Export di `src/pages/admin/index.ts`**

Tambahkan export:

```typescript
export { default as Invoices } from './Invoices';
```

### **Step 3: Generate Routes**

Jalankan command:

```bash
npm run generate-routes
```

**Output:**
```
✅ Generated routes for 11 admin pages
✅ Generated routes for 2 user pages
✅ Routes saved to: src/routes/generated-routes.ts
```

### **Step 4: Routes Otomatis Tersedia!**

Route `/admin/invoices` sekarang sudah tersedia dan bisa diakses!

---

## 🔥 Auto-Watch Mode (Opsional)

Untuk development, aktifkan watch mode agar routes auto-generate setiap ada perubahan:

```bash
npm run generate-routes:watch
```

Sekarang setiap kali Anda:
- Tambah folder baru
- Tambah file index.tsx
- Hapus folder

Routes akan **otomatis ter-update**! ✨

---

## 📁 Struktur File yang Dihasilkan

File `src/routes/generated-routes.ts` berisi:

```typescript
// 🤖 AUTO-GENERATED - DO NOT EDIT MANUALLY
import { lazy } from 'react';

// Admin Page Imports
export const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));
export const Users = lazy(() => import('@/pages/admin/Users'));
export const Invoices = lazy(() => import('@/pages/admin/Invoices'));
// ... dll

// Route Configuration
export const adminRoutes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'users', component: Users },
  { path: 'invoices', component: Invoices },
  // ... dll
];
```

---

## 🎨 Cara Kerja di AppRoutes.tsx

File `AppRoutes.tsx` menggunakan routes yang di-generate:

```tsx
import { adminRoutes } from './generated-routes';

// Routes otomatis ter-mapping
adminRoutes.map(({ path, component: Component }) => (
  <Route 
    key={path} 
    path={path} 
    element={<Component />} 
  />
))
```

---

## ✅ Keuntungan Sistem Ini

1. **Zero Configuration** - Tidak perlu edit AppRoutes.tsx manual
2. **Type Safe** - Full TypeScript support
3. **Lazy Loading** - Automatic code splitting
4. **Convention over Configuration** - Nama folder = nama route
5. **Scalable** - Mudah tambah ratusan pages tanpa edit routing

---

## 🔧 Troubleshooting

### Route tidak muncul?

1. Pastikan folder sudah ada di `src/pages/admin/` atau `src/pages/user/`
2. Pastikan ada file `index.tsx` di dalam folder
3. Jalankan `npm run generate-routes` lagi
4. Restart dev server: `npm run dev`

### Route name salah?

Generator menggunakan **kebab-case** dari nama folder:
- `Dashboard` → `dashboard`
- `UserManagement` → `user-management`
- `ReportsPage` → `reports-page`

---

## 📝 Contoh Lengkap

### Sebelum (Manual):

```tsx
// AppRoutes.tsx - harus edit manual setiap tambah page
<Route path="dashboard" element={<Dashboard />} />
<Route path="users" element={<Users />} />
<Route path="products" element={<Products />} />
<Route path="orders" element={<Orders />} />
// ... tambah 100 lines lagi? 😰
```

### Sesudah (Auto-Generated):

```tsx
// AppRoutes.tsx - sekali setup, forever automated!
{adminRoutes.map(({ path, component: Component }) => (
  <Route key={path} path={path} element={<Component />} />
))}
```

**Tambah page baru?** 
1. Buat folder
2. Run `npm run generate-routes`
3. Done! ✨

---

## 🚀 Quick Start Commands

```bash
# Generate routes sekali
npm run generate-routes

# Generate routes + watch for changes
npm run generate-routes:watch

# Run dev server
npm run dev
```

Selamat coding! 🎉
