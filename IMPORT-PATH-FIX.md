# Import Path Rules - After Folder Restructure

## Fixed Import Path Issues

### ❌ **Problem:**
After moving components to new folder structure, import paths became incorrect:
```
src/components/layout/Header.tsx trying to import "../context/AuthContext"
```
This was looking for `src/components/context/AuthContext` (doesn't exist)

### ✅ **Solution:**
Updated import paths to match new folder structure:

## Import Path Reference

### From `src/pages/` folder:
```tsx
// ✅ Correct
import { useAuth } from "../context/AuthContext";
import type { User } from "../types/auth";
```

### From `src/components/layout/` folder:
```tsx
// ✅ Correct  
import { useAuth } from "../../context/AuthContext";
import type { User } from "../../types/auth";
```

### From `src/components/common/` folder:
```tsx
// ✅ Correct
import { useAuth } from "../../context/AuthContext";  
import type { User } from "../../types/auth";
```

### From `src/components/ui/` folder:
```tsx
// ✅ Correct (if needed)
import { useAuth } from "../../context/AuthContext";
import type { User } from "../../types/auth";
```

## Folder Depth Reference

```
src/
├── context/AuthContext.tsx          # Base level
├── types/auth.ts                    # Base level  
├── pages/                           # 1 level deep → "../"
│   └── *.tsx
├── components/
│   ├── layout/                      # 2 levels deep → "../../" 
│   │   └── *.tsx
│   ├── common/                      # 2 levels deep → "../../"
│   │   └── *.tsx  
│   └── ui/                          # 2 levels deep → "../../"
│       └── *.tsx
```

## Files Updated:

### ✅ Fixed Import Paths:
1. **Header.tsx**: `"../context/AuthContext"` → `"../../context/AuthContext"`
2. **AlertNotification.tsx**: `"../context/AuthContext"` → `"../../context/AuthContext"`
3. **Login.tsx**: Already correct (`"../context/AuthContext"`)

### ✅ Import Path Rules:
- **From pages/**: Use `../` (1 level up)
- **From components/layout/**: Use `../../` (2 levels up)
- **From components/common/**: Use `../../` (2 levels up)
- **From components/ui/**: Use `../../` (2 levels up)

## Alternative: Absolute Imports
For cleaner imports, consider using absolute imports with path mapping in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/context/*": ["src/context/*"],
      "@/types/*": ["src/types/*"],
      "@/pages/*": ["src/pages/*"],
      "@/components/*": ["src/components/*"]
    }
  }
}
```

Then imports become:
```tsx
import { useAuth } from "@/context/AuthContext";
import type { User } from "@/types/auth";
```

**All import paths are now fixed and application runs successfully!** ✅