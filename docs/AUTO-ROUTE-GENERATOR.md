# 🚀 Auto Route Generator

Sistem routing otomatis yang men-scan folder `src/pages` dan otomatis membuat routes berdasarkan struktur folder. Mirip dengan file-based routing di Next.js!

## 📋 Cara Kerja

Generator ini akan:

1. Scan semua folder di `src/pages/admin/` dan `src/pages/user/`
2. Untuk setiap folder yang memiliki `index.tsx`, buat route entry
3. Convert nama folder dari PascalCase ke kebab-case untuk URL
4. Generate file `src/routes/generated-routes.tsx` yang berisi semua routes

## 🎯 Struktur Folder

```
src/pages/
├── admin/
│   ├── Dashboard/
│   │   └── index.tsx          → /admin/dashboard
│   ├── UserManagement/
│   │   └── index.tsx          → /admin/user-management
│   └── ProductsPage/
│       └── index.tsx          → /admin/products
└── user/
    ├── BookingPage/
    │   └── index.tsx          → /booking
    └── UserLandingPage/
        └── index.tsx          → /user-landing
```

## 🔧 Commands

### Generate Routes (Manual)

```bash
npm run generate-routes
```

Jalankan command ini setiap kali Anda menambah/menghapus page baru.

### Watch Mode (Development)

```bash
npm run watch-routes
```

Otomatis regenerate routes setiap ada perubahan di folder `src/pages`.
Jalankan ini di terminal terpisah saat development.

## ➕ Menambah Page Baru

### Cara Lama (Manual) ❌

```tsx
// 1. Buat file src/pages/admin/NewPage.tsx
// 2. Buka src/routes/AppRoutes.tsx
// 3. Import component:
import NewPage from "@/pages/admin/NewPage";
// 4. Tambah route:
<Route path="new-page" element={<NewPage />} />;
```

### Cara Baru (Otomatis) ✅

```bash
# 1. Buat folder dan file
mkdir src/pages/admin/NewPage
# Buat src/pages/admin/NewPage/index.tsx dengan content:
```

```tsx
import React from "react";

const NewPage = () => {
  return <div>New Page Content</div>;
};

export default NewPage;
```

```bash
# 2. Generate routes
npm run generate-routes

# 3. DONE! Route otomatis tersedia di /admin/new-page
```

## 📝 Contoh: Menambah "ReportsPage"

### Step 1: Buat Folder & File

```powershell
# PowerShell
mkdir src/pages/admin/ReportsPage
New-Item src/pages/admin/ReportsPage/index.tsx
```

### Step 2: Isi Component

```tsx
// src/pages/admin/ReportsPage/index.tsx
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const ReportsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {t("reports.title", "Reports")}
      </h1>
      <div className="bg-white rounded-lg shadow p-4">
        {/* Your reports content here */}
        <p>Reports data will appear here</p>
      </div>
    </div>
  );
};

export default ReportsPage;
```

### Step 3: Generate Routes

```bash
npm run generate-routes
```

Output:

```
🔍 Scanning pages directory...
📂 Found admin pages directory
   ✅ Generated 11 admin routes    # +1 route baru!

📊 Summary:
   Admin routes: 11
      - /reports → ReportsPage     # ← Route baru muncul!
      ...
```

### Step 4: Export di index.ts (Opsional)

```tsx
// src/pages/admin/index.ts
export { default as ReportsPage } from "./ReportsPage";
```

### Step 5: Test

```
✅ /admin/reports → Langsung bisa diakses!
```

## 🎨 Naming Convention

Generator otomatis convert nama folder ke URL:

| Nama Folder     | Route Path          | Component Name  |
| --------------- | ------------------- | --------------- |
| Dashboard       | `/dashboard`        | Dashboard       |
| UserManagement  | `/user-management`  | UserManagement  |
| ProductsPage    | `/products`         | ProductsPage    |
| ProfileSettings | `/profile-settings` | ProfileSettings |
| NewFeature      | `/new-feature`      | NewFeature      |

**Rules:**

- PascalCase → kebab-case
- Suffix "Page" dihapus otomatis
- Trailing dash dihapus

## 🔄 Integration dengan App

Routes digunakan di `src/routes/AppRoutes.tsx`:

```tsx
import { adminRoutes } from "./generated-routes";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />

      {/* Auto-generated routes */}
      {adminRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
```

## 🚨 Special Cases

### Login Page

Login page punya handling khusus karena routenya harus relatif:

- Folder: `Login/`
- Route di generated: `login` (bukan `/admin/login`)
- Actual URL: `/admin/login`

### 404 Page

404 page tetap manual di `AppRoutes.tsx` karena perlu catch-all route (`*`).

## 📁 File yang Di-generate

### generated-routes.tsx

```tsx
// Auto-generated file
import Dashboard from "@/pages/admin/Dashboard";
import UserManagement from "@/pages/admin/UserManagement";
// ... all imports

export const adminRoutes: RouteConfig[] = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "user-management", element: <UserManagement /> },
  // ... all routes
];

export const userRoutes: RouteConfig[] = [
  { path: "booking", element: <BookingPage /> },
  // ... user routes
];
```

**⚠️ JANGAN edit file ini manual!** File ini akan di-overwrite setiap kali generate.

## 🎯 Best Practices

### ✅ DO:

- Gunakan PascalCase untuk nama folder (`UserManagement`, `ProductsPage`)
- Selalu buat `index.tsx` di dalam folder
- Jalankan `npm run generate-routes` setelah add/remove pages
- Gunakan `watch-routes` saat development
- Export component sebagai default: `export default ComponentName`

### ❌ DON'T:

- Jangan edit `generated-routes.tsx` manual
- Jangan buat file `.tsx` langsung di `pages/admin/` atau `pages/user/` (harus di dalam folder)
- Jangan lupa jalankan generator setelah tambah page baru
- Jangan gunakan nama folder dengan karakter special atau spasi

## 🔍 Troubleshooting

### Route tidak muncul setelah add page baru?

```bash
# Pastikan struktur folder benar:
src/pages/admin/NewPage/index.tsx  # ✅ Correct
src/pages/admin/NewPage.tsx        # ❌ Wrong (tidak akan ke-detect)

# Re-generate routes:
npm run generate-routes
```

### Import error di generated-routes.tsx?

```bash
# Pastikan component di-export sebagai default:
export default ComponentName;  # ✅ Correct
export const ComponentName;    # ❌ Wrong
```

### Watch mode tidak trigger regenerate?

```bash
# Restart watch mode:
# Press Ctrl+C to stop
npm run watch-routes
```

## 🎉 Keuntungan

1. **⚡ Faster Development**: Tidak perlu edit routing manual
2. **🎯 Consistent**: Semua routes mengikuti pattern yang sama
3. **🔒 Type Safe**: Generated TypeScript dengan proper types
4. **📝 Self-Documenting**: Struktur folder = struktur routes
5. **🚀 Scalable**: Mudah tambah puluhan pages tanpa touch routing code

## 🔮 Future Enhancements

Fitur yang bisa ditambahkan:

- [ ] Support untuk nested routes (folders dalam folders)
- [ ] Support untuk dynamic routes (`[id]` convention)
- [ ] Auto-generate navigation menu dari routes
- [ ] Auto-generate breadcrumbs
- [ ] Support untuk route metadata (title, description, auth required, etc.)
- [ ] Auto-generate sitemap

## 📚 Learn More

Konsep ini terinspirasi dari:

- **Next.js App Router**: File-based routing
- **Remix**: Route conventions
- **SvelteKit**: Filesystem routing

---

**Happy Coding! 🚀**

Setiap kali add page baru, cukup:

```bash
npm run generate-routes
```

Dan route langsung tersedia! ✨
