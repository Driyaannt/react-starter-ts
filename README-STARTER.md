# React TypeScript Starter Code

Starter code React TypeScript dengan fitur lengkap termasuk sistem login, sidebar, header, dan footer.

## 🚀 Fitur

- ✅ **Authentication System** - Sistem login dengan context API
- ✅ **Responsive Layout** - Header, Sidebar yang dapat dikecilkan, dan Footer
- ✅ **Dashboard** - Halaman dashboard dengan statistik dan aktivitas terbaru
- ✅ **Modern UI** - Design yang clean dan responsive
- ✅ **TypeScript** - Full TypeScript support untuk type safety
- ✅ **Vite** - Fast development server dan build tool

## 📁 Struktur Project

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Halaman dashboard utama
│   ├── Header.tsx       # Header dengan user info dan logout
│   ├── Sidebar.tsx      # Sidebar menu navigasi
│   ├── Footer.tsx       # Footer dengan informasi tambahan
│   ├── Layout.tsx       # Layout wrapper untuk authenticated pages
│   └── Login.tsx        # Halaman login
├── context/            # React context untuk state management
│   └── AuthContext.tsx  # Authentication context
├── types/              # TypeScript type definitions
│   └── auth.ts         # Authentication related types
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## 🛠️ Instalasi dan Menjalankan

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Jalankan development server:**
   ```bash
   npm run dev
   ```

3. **Build untuk production:**
   ```bash
   npm run build
   ```

## 🔐 Demo Login

Untuk testing, gunakan kredensial berikut:
- **Username:** `admin`
- **Password:** `password`

## 💡 Cara Penggunaan

### Authentication
- Aplikasi menggunakan React Context untuk mengelola state authentication
- User login akan disimpan di localStorage untuk persist session
- Logout akan menghapus session dan redirect ke halaman login

### Layout System
- **Header:** Menampilkan logo aplikasi, user info, dan tombol logout
- **Sidebar:** Menu navigasi yang bisa dikecilkan/diperbesar
- **Main Content:** Area konten utama dengan dashboard
- **Footer:** Informasi tambahan dan quick links

### Customization

#### Menambah Menu Sidebar
Edit file `src/components/Sidebar.tsx` dan tambahkan item baru ke array `menuItems`:

```typescript
const menuItems: MenuItem[] = [
  // ... existing items
  { id: 'new-menu', label: 'New Menu', icon: '🆕', path: '/new-menu' },
];
```

#### Mengubah Theme Colors
Edit file CSS yang sesuai untuk mengubah warna tema:
- Primary color: `#667eea`
- Secondary color: `#764ba2`
- Dark color: `#2c3e50`

#### Menambah Halaman Baru
1. Buat component baru di folder `src/components/`
2. Import dan gunakan di `App.tsx` atau buat routing system

#### Menggunakan Simple Routing
Untuk menggunakan routing sederhana yang sudah disediakan:

```typescript
// Ganti Layout dengan LayoutWithRouting di App.tsx
import LayoutWithRouting from './components/LayoutWithRouting';

return (
  <LayoutWithRouting />
);
```

## 🎨 Komponen Utama

### AuthProvider
Context provider yang mengelola authentication state dan menyediakan:
- `user`: Object user yang sedang login
- `isAuthenticated`: Boolean status login
- `login()`: Function untuk login
- `logout()`: Function untuk logout
- `loading`: Boolean loading state

### Layout
Wrapper component yang menyediakan struktur halaman lengkap dengan header, sidebar, dan footer.

### Dashboard
Halaman utama setelah login yang menampilkan:
- Statistics cards
- Recent activities
- Quick action buttons

## 🔧 Teknologi yang Digunakan

- **React 18** - UI Library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool dan dev server
- **CSS3** - Styling dengan Flexbox dan Grid
- **ESLint** - Code linting

## 📱 Responsive Design

Aplikasi sudah dioptimalkan untuk berbagai ukuran layar:
- **Desktop:** Full layout dengan sidebar expanded
- **Tablet:** Sidebar otomatis collapsed
- **Mobile:** Layout yang disesuaikan untuk layar kecil

## 🚀 Development Tips

1. **Hot Module Replacement (HMR):** Vite menyediakan HMR untuk development yang lebih cepat
2. **TypeScript:** Pastikan menggunakan types yang proper untuk better development experience
3. **Component Structure:** Pisahkan logic dan styling untuk maintainability yang lebih baik
4. **State Management:** Gunakan React Context untuk global state, useState untuk local state

## 📄 License

MIT License - feel free to use this starter code for your projects!