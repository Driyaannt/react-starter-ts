# 🧪 Test: Auto-Detection Rules

## ❓ **Pertanyaan:**
> "Apakah jika saya membuat folder dan file testing.tsx akan otomatis menambahkan routes?"

## ❌ **Jawaban: TIDAK**

---

## 📋 **Syarat Auto-Detection:**

### ✅ **Yang Akan Ter-Detect:**

```
src/pages/admin/
  └─ Testing/              ← Nama folder (bebas)
      └─ index.tsx         ← HARUS "index.tsx"
```

**Result:** ✅ Route otomatis dibuat: `/admin/testing`

---

### ❌ **Yang TIDAK Akan Ter-Detect:**

#### **1. File name bukan `index.tsx`**
```
src/pages/admin/
  └─ Testing/
      └─ testing.tsx       ← ❌ Tidak detect!
      └─ component.tsx     ← ❌ Tidak detect!
      └─ page.tsx          ← ❌ Tidak detect!
      └─ Testing.tsx       ← ❌ Tidak detect!
```

#### **2. File standalone (tidak di folder)**
```
src/pages/admin/
  └─ testing.tsx           ← ❌ Tidak detect!
```

#### **3. File di lokasi salah**
```
src/components/
  └─ Testing/
      └─ index.tsx         ← ❌ Tidak detect!

src/pages/
  └─ Testing/
      └─ index.tsx         ← ❌ Tidak detect! (harus di admin/ atau user/)
```

---

## 🔍 **Bukti dari Kode Plugin:**

```javascript
// scripts/vite-plugin-auto-routes.js (line 39)

const indexPath = path.join(folderPath, 'index.tsx');
if (fs.existsSync(indexPath)) {  
  // ↑ HANYA cek file bernama "index.tsx"
  // File lain tidak akan di-detect!
  
  const routePath = folderNameToPath(folder);
  imports.push(`import ${folder} from "@/pages/admin/${folder}";`);
  adminRoutes.push(`  { path: "${routePath}", element: <${folder} /> }`);
}
```

**Key Point:** Plugin **hanya** mencari file bernama `index.tsx`, tidak ada exception!

---

## 🧪 **Test Cases:**

### **Test 1: File Name Salah ❌**

**Structure:**
```
src/pages/admin/TestingWrong/
  └─ testing.tsx          ← ❌ Nama salah!
```

**Result:**
```bash
# Check generated-routes.tsx
# TestingWrong TIDAK ada dalam list!

adminRoutes = [
  // ... routes lain
  // ❌ TestingWrong tidak ada!
]
```

**Route:** ❌ `/admin/testing-wrong` → **404 Not Found**

---

### **Test 2: File Name Benar ✅**

**Structure:**
```
src/pages/admin/TestingCorrect/
  └─ index.tsx            ← ✅ Nama benar!
```

**Result:**
```bash
# Check generated-routes.tsx
# TestingCorrect ADA dalam list!

import TestingCorrect from "@/pages/admin/TestingCorrect";

adminRoutes = [
  // ... routes lain
  { path: "testing-correct", element: <TestingCorrect /> }  ← ✅ Ada!
]
```

**Route:** ✅ `/admin/testing-correct` → **Page muncul!**

---

## 📊 **Comparison Table:**

| Location | File Name | Detected? | Route |
|----------|-----------|-----------|-------|
| `admin/Testing/` | `index.tsx` | ✅ YES | `/admin/testing` |
| `admin/Testing/` | `testing.tsx` | ❌ NO | - |
| `admin/Testing/` | `component.tsx` | ❌ NO | - |
| `admin/Testing/` | `page.tsx` | ❌ NO | - |
| `admin/` | `testing.tsx` | ❌ NO | - |
| `user/Testing/` | `index.tsx` | ✅ YES | `/testing` |
| `components/Testing/` | `index.tsx` | ❌ NO | - |

---

## ✅ **Checklist Auto-Detection:**

Untuk page ter-detect otomatis, harus memenuhi **SEMUA** syarat ini:

- [ ] File name = `index.tsx` (case-sensitive!)
- [ ] File di dalam folder (bukan standalone)
- [ ] Folder di dalam `pages/admin/` ATAU `pages/user/`
- [ ] Component export default
- [ ] Dev server running (`npm run dev`)

**Jika salah satu tidak terpenuhi → ❌ TIDAK akan ter-detect!**

---

## 💡 **Best Practice:**

### **✅ Struktur yang Benar:**

```
src/pages/admin/
  ├─ Dashboard/
  │   └─ index.tsx                    ← Component
  │
  ├─ UserManagement/
  │   ├─ index.tsx                    ← Main component
  │   ├─ UserTable.tsx                ← Sub-component (opsional)
  │   ├─ UserForm.tsx                 ← Sub-component (opsional)
  │   └─ hooks/                       ← Folder tambahan (opsional)
  │       └─ useUsers.ts
  │
  └─ ProductsPage/
      ├─ index.tsx                    ← Main component
      ├─ ProductList.tsx              ← Sub-component
      └─ ProductCard.tsx              ← Sub-component
```

**Key Points:**
1. **HANYA** `index.tsx` yang akan di-scan untuk routing
2. File lain (`UserTable.tsx`, dll) boleh ada untuk sub-components
3. Nama folder = nama component (untuk consistency)

---

## 🎯 **Solusi Jika Ingin Custom File Name:**

Jika Anda **benar-benar** ingin gunakan nama file custom (bukan `index.tsx`), ada 2 opsi:

### **Option 1: Edit Plugin (Tidak Recommended)**

Edit `scripts/vite-plugin-auto-routes.js`:

```javascript
// Ubah dari:
const indexPath = path.join(folderPath, 'index.tsx');

// Menjadi (support multiple names):
const possibleNames = ['index.tsx', 'page.tsx', 'component.tsx'];
const indexPath = possibleNames
  .map(name => path.join(folderPath, name))
  .find(p => fs.existsSync(p));
```

### **Option 2: Tetap Gunakan `index.tsx` (Recommended!)**

Ini adalah **standard convention** di:
- Next.js → `pages/about/index.tsx`
- Remix → `routes/about/index.tsx`
- React Router → Best practice pattern

**Keuntungan:**
- ✅ Consistency dengan framework lain
- ✅ Mudah dipahami team
- ✅ Auto-import di IDE
- ✅ Clear main entry point

---

## 📝 **Summary:**

### **Jawaban untuk Pertanyaan Awal:**

**Q:** "Apakah file `testing.tsx` akan auto-detect?"

**A:** ❌ **TIDAK!** Harus `index.tsx`

**Correct Way:**
```bash
# 1. Buat folder
mkdir src/pages/admin/Testing

# 2. Buat file index.tsx (BUKAN testing.tsx!)
# File: src/pages/admin/Testing/index.tsx

const Testing = () => {
  return <div>Testing Page</div>;
};

export default Testing;

# 3. Export di index.ts
# File: src/pages/admin/index.ts
export { default as Testing } from "./Testing";

# 4. Route otomatis tersedia! ✅
# URL: /admin/testing
```

---

## 🎉 **Kesimpulan:**

**File name HARUS `index.tsx` - tidak ada exception!**

Ini adalah **design decision** untuk:
- ✅ Consistency
- ✅ Convention over configuration
- ✅ Easy to understand
- ✅ Following industry standards

**Jangan fight the framework - ikuti conventionnya! 🚀**
