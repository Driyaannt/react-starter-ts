# 🚀 Auto-Route & Template Generation System

Sistem otomatis yang menghasilkan routes dan template page secara real-time ketika Anda membuat folder baru.

## ✨ Fitur

### 1. **Auto-Route Generation**
- 🔄 Otomatis detect folder baru di `src/pages/admin/` dan `src/pages/user/`
- 📝 Generate route configuration di `src/routes/generated-routes.tsx`
- 🎯 Generate `GENERATED_PATHS` constants untuk type-safe routing
- 📦 Auto-generate barrel exports di `index.ts` files

### 2. **Auto-Template Creation**
- ✨ Otomatis create `index.tsx` dengan boilerplate code
- 🎨 Pre-configured dengan shadcn/ui components
- 🌓 Dark mode support built-in
- 📱 Responsive layout structure
- 💪 TypeScript typing included

### 3. **Real-Time Detection**
- 👀 File watcher monitoring perubahan
- 🔍 Polling fallback setiap 2 detik
- ⚡ Debounced regeneration (150ms)
- 🔥 Hot Module Replacement (HMR) integration

## 🎯 Cara Menggunakan

### Method 1: Buat Folder Baru (Recommended)

Cukup buat folder baru di dalam `src/pages/admin/` atau `src/pages/user/`:

```bash
# Via terminal
mkdir src/pages/admin/MyNewFeature

# Atau via VS Code File Explorer
# Right click > New Folder > "MyNewFeature"
```

**Kemudian restart dev server:**

```bash
npm run dev
```

Sistem akan otomatis:
1. ✅ Detect folder `MyNewFeature`
2. ✅ Create `index.tsx` dengan template lengkap
3. ✅ Generate route: `/admin/my-new-feature`
4. ✅ Add ke `GENERATED_PATHS.MY_NEW_FEATURE`
5. ✅ Export di `src/pages/admin/index.ts`

### Method 2: File Sudah Ada

Jika Anda sudah membuat `index.tsx` manual:

```bash
# Buat folder dan file
mkdir src/pages/admin/CustomPage
echo "" > src/pages/admin/CustomPage/index.tsx
```

Sistem akan detect dan auto-generate routes tanpa overwrite file Anda.

## 📁 Folder Naming Convention

Nama folder akan dikonversi ke route path dengan aturan:

| Folder Name | Route Path | Component Name | Constant Name |
|------------|------------|----------------|---------------|
| `Dashboard` | `dashboard` | `Dashboard` | `DASHBOARD` |
| `UserManagement` | `user-management` | `UserManagement` | `USER_MANAGEMENT` |
| `ProductsPage` | `products` | `ProductsPage` | `PRODUCTS_PAGE` |
| `OrderHistory` | `order-history` | `OrderHistory` | `ORDER_HISTORY` |

### Aturan Konversi:
1. **PascalCase → kebab-case**: `UserManagement` → `user-management`
2. **Remove suffix "Page"**: `ProductsPage` → `products`
3. **All lowercase**: `API` → `api`

## 🎨 Template Structure

Setiap page yang auto-generated memiliki struktur:

```tsx
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MyNewFeature: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header with title and action buttons */}
      <div className="flex justify-between">
        <h1>My New Feature</h1>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>

      {/* Main Content Card */}
      <Card>
        <CardHeader>
          <CardTitle>Content Area</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Your content here */}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyNewFeature;
```

## 🔧 Generated Files

### 1. `src/routes/generated-routes.tsx`

```tsx
// Auto-generated route configuration
export const adminRoutes: RouteConfig[] = [
  { path: "my-new-feature", element: <MyNewFeature /> }
];

export const GENERATED_PATHS = {
  MY_NEW_FEATURE: buildAdminPath("my-new-feature"),
  // ... other paths
} as const;
```

### 2. `src/pages/admin/index.ts`

```ts
// Auto-generated barrel exports
export { default as MyNewFeature } from "./MyNewFeature";
```

### 3. `src/pages/admin/MyNewFeature/index.tsx`

Full page component dengan boilerplate code.

## 🛠️ Configuration

Plugin configuration di `scripts/vite-plugin-auto-routes.js`:

```javascript
export default function autoRoutesPlugin() {
  return {
    name: 'vite-plugin-auto-routes',
    
    configResolved() {
      // Auto-scan on startup
      generateRoutes(true); // true = create templates
    },
    
    configureServer(server) {
      // Watch for changes
      server.watcher.on('addDir', ...);
      
      // Polling fallback every 2 seconds
      setInterval(checkForChanges, 2000);
    }
  };
}
```

### Customize Template

Edit fungsi `generatePageTemplate()` di plugin file:

```javascript
function generatePageTemplate(componentName, pageType) {
  return `
    // Your custom template here
  `;
}
```

## 📊 File Watching

Sistem menggunakan 3 layer detection:

1. **Vite Watcher** - Real-time file system events
2. **Debouncing** - Batch multiple changes (150ms delay)
3. **Polling Fallback** - Check every 2 seconds for missed changes

### Supported Events:
- ✅ `addDir` - New folder created
- ✅ `add` - New file added
- ✅ `unlink` - File deleted
- ✅ `unlinkDir` - Folder deleted
- ✅ `change` - File content updated

## 🎯 Use Generated Routes

### In Constants

```typescript
// src/constants/routes.ts
import { GENERATED_PATHS } from "@/routes/generated-routes";

export const ROUTES = {
  MY_FEATURE: GENERATED_PATHS.MY_NEW_FEATURE,
  // Always in sync with generated routes!
};
```

### In Components

```tsx
import { GENERATED_PATHS } from "@/routes/generated-routes";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <Link to={GENERATED_PATHS.MY_NEW_FEATURE}>
      Go to My Feature
    </Link>
  );
}
```

### In Router

```tsx
import { adminRoutes, userRoutes } from "@/routes/generated-routes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        {adminRoutes.map(route => (
          <Route key={route.path} {...route} />
        ))}
      </Route>
    </Routes>
  );
}
```

## 🔥 Hot Tips

### 1. Restart Untuk Trigger Template
Jika folder baru tidak auto-detect template:
```bash
# Restart dev server
Ctrl+C
npm run dev
```

### 2. Type-Safe Routing
Gunakan `GENERATED_PATHS` untuk type safety:
```typescript
// ❌ Bad - hardcoded string
navigate("/admin/my-feature");

// ✅ Good - type-safe constant
navigate(GENERATED_PATHS.MY_FEATURE);
```

### 3. Organize by Feature
```
src/pages/admin/
  ├── UserManagement/     # user-management route
  ├── ProductCatalog/     # product-catalog route
  └── OrderTracking/      # order-tracking route
```

### 4. Clean Up Empty Folders
Delete folder → route auto-removed on next regeneration.

## ⚠️ Important Notes

1. **Don't Edit Generated Files**
   - `src/routes/generated-routes.tsx` - ⚠️ AUTO-GENERATED
   - `src/pages/admin/index.ts` - ⚠️ AUTO-GENERATED
   - `src/pages/user/index.ts` - ⚠️ AUTO-GENERATED

2. **Page Components Are Safe**
   - `src/pages/admin/MyFeature/index.tsx` - ✅ Edit freely
   - Template only created if file doesn't exist

3. **Restart When Needed**
   - File watcher may miss some events
   - Restart dev server to force regeneration

4. **Folder Structure Matters**
   - Must be direct child of `admin/` or `user/`
   - Nested folders not auto-detected

## 🐛 Troubleshooting

### Template Not Created?

**Solution:** Restart dev server
```bash
npm run dev
```

### Route Not Showing?

**Check:**
1. ✅ Folder has `index.tsx` file
2. ✅ Component is exported as default
3. ✅ Folder is in `pages/admin/` or `pages/user/`
4. ✅ Dev server restarted

### Generated Paths Not Updated?

**Check:**
1. ✅ Look at console for "Routes regenerated" message
2. ✅ Check `generated-routes.tsx` has your path
3. ✅ Restart TypeScript server in VS Code

## 📈 Performance

- **Initial Scan:** ~50-100ms
- **Template Creation:** ~10ms per file
- **Route Generation:** ~20-30ms
- **Debounce Delay:** 150ms
- **Polling Interval:** 2 seconds

## 🎉 Examples

### Example 1: Create Blog Feature

```bash
# Create folder
mkdir src/pages/admin/BlogManagement

# Restart server
npm run dev

# Result:
# ✅ File created: BlogManagement/index.tsx
# ✅ Route: /admin/blog-management
# ✅ Constant: GENERATED_PATHS.BLOG_MANAGEMENT
```

### Example 2: Create Settings Pages

```bash
# Create multiple folders
mkdir src/pages/admin/GeneralSettings
mkdir src/pages/admin/SecuritySettings
mkdir src/pages/admin/NotificationSettings

# Restart server
npm run dev

# Result: 3 pages auto-created with templates!
```

### Example 3: User Area Pages

```bash
# Create user pages
mkdir src/pages/user/ProfilePage
mkdir src/pages/user/OrderHistory

# Restart server
npm run dev

# Result:
# ✅ Route: /profile
# ✅ Route: /order-history
```

## 🚀 Next Steps

1. **Customize Templates** - Edit `generatePageTemplate()` function
2. **Add More Paths** - Create folders for new features
3. **Use Generated Routes** - Import from `generated-routes.tsx`
4. **Build Your Features** - Edit generated templates

---

**Happy Coding! 🎉**

*Sistem ini menghemat waktu development dengan automasi routing dan template creation.*
