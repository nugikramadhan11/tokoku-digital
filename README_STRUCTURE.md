# 🎯 Project Tokoku Digital - Quick Reference

## 📂 Struktur Folder Lengkap

```
tokoku_digital/
├── public/
├── src/
│   ├── components/              ← Siap untuk extract React components
│   │   ├── sections/           (Untuk setiap section: Header, Hero, etc)
│   │   ├── common/             (Komponen reusable: Button, Card, etc)
│   │   └── index.ts            (Central exports)
│   │
│   ├── data/                    ← 📊 Data & Constants
│   │   ├── testimonials.ts      (Data testimoni pelanggan)
│   │   ├── services.ts          (Daftar layanan & harga)
│   │   └── index.ts             (Central exports)
│   │
│   ├── hooks/                   ← 🎣 Custom React Hooks
│   │   ├── useScrollEffect.ts   (Sticky header scroll detection)
│   │   ├── useCalculator.ts     (Calculator harga logic)
│   │   ├── useTestimonial.ts    (Carousel testimonial)
│   │   ├── useWhatsApp.ts       (Generate WhatsApp links)
│   │   └── index.ts             (Central exports)
│   │
│   ├── styles/                  ← 🎨 CSS Files (future organization)
│   │
│   ├── App.tsx                  ← Main Component (terstruktur & clean)
│   ├── App.css                  ← Main Styles
│   ├── main.tsx                 ← Entry Point
│   ├── index.css                ← Global Styles
│   └── assets/                  ← Images & Icons
│
├── STRUCTURE.md                 ← Dokumentasi lengkap struktur
├── SETUP_COMPLETE.md           ← Checklist setup
├── package.json
├── vite.config.ts
└── [config files...]
```

## 🚀 Import Pattern (Best Practices)

### ✅ Import Data (Centralized)
```typescript
// Bisa import langsung dari folder
import { testimonials, calcServices } from './data';

// Atau specific import
import { testimonials } from './data/testimonials';
import type { Testimonial } from './data';
```

### ✅ Import Hooks (Centralized)
```typescript
// Bisa import langsung dari hooks folder
import { 
  useScrollEffect, 
  useCalculator, 
  useTestimonial, 
  useWhatsApp 
} from './hooks';

// Atau specific import
import { useCalculator } from './hooks/useCalculator';
```

## 📋 File Descriptions

### `data/testimonials.ts`
```
└── testimonials: Testimonial[]
    ├── name: string
    ├── business: string
    ├── avatar: string
    ├── text: string
    └── stars: number
```

### `data/services.ts`
```
└── calcServices: Service[]
    ├── id: string
    ├── name: string
    ├── price: number
    └── unit: 'sekali' | 'bulan'
```

### `hooks/useScrollEffect.ts`
Deteksi scroll position untuk sticky header effect
- Input: threshold (default: 20)
- Output: boolean (scrolled status)

### `hooks/useCalculator.ts`
Handle logic calculator harga dengan selections
- Input: services[], initialServices[]
- Output: selectedServices, toggleService, totalOnce, totalMonthly

### `hooks/useTestimonial.ts`
Manage carousel state untuk testimoni
- Input: totalItems (jumlah testimonial)
- Output: testiIndex, prev(), next()

### `hooks/useWhatsApp.ts`
Generate WhatsApp API links untuk CTA buttons
- Input: customText (optional)
- Output: getWaLink() function

## 🔧 Development Workflow

### Menambah Data Baru:
1. Create file di `src/data/example.ts`
2. Add export di `src/data/index.ts`
3. Import di App.tsx: `import { example } from './data'`

### Menambah Custom Hook:
1. Create file di `src/hooks/useExample.ts`
2. Add export di `src/hooks/index.ts`
3. Use di component: `const result = useExample()`

### Extract Component Dari App.tsx:
1. Create file di `src/components/sections/HeaderSection.tsx`
2. Move JSX code & required imports
3. Accept props untuk state management
4. Import di App.tsx: `import HeaderSection from './components/sections/HeaderSection'`
5. Replace JSX dengan: `<HeaderSection {...props} />`

## ✨ Keuntungan Struktur Ini:

✅ **Organized** - Folder terpisah per fungsi
✅ **Scalable** - Mudah add component baru
✅ **Maintainable** - Logic terpisah dari UI
✅ **Reusable** - Hooks & data bisa dipakai multiple components
✅ **Type-Safe** - TypeScript interfaces di semua data
✅ **Clean Imports** - Central exports di setiap folder

## 📚 Resources

- [STRUCTURE.md](./STRUCTURE.md) - Dokumentasi lengkap
- [SETUP_COMPLETE.md](./SETUP_COMPLETE.md) - Checklist & status
- [App.tsx](./src/App.tsx) - Main component

## 🎉 Status: READY FOR PRODUCTION!

Struktur sudah siap untuk development jangka panjang!
