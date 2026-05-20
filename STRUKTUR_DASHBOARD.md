# Dashboard Penulis - Struktur Kode

## 📁 Struktur Folder

```
src/
├── views/
│   └── DashboardPenulis.vue          # Main dashboard page
├── components/
│   ├── Sidebar.vue                   # Navigation sidebar
│   ├── StatCard.vue                  # Reusable stat card component
│   ├── ProjectCard.vue               # Active project card component
│   └── ManuscriptRow.vue             # Table row for manuscripts
```

## 📄 File-File Utama

### DashboardPenulis.vue
- **Tujuan**: Halaman utama dashboard penulis
- **Struktur**:
  - Import semua komponen yang diperlukan
  - Layout dengan Sidebar dan Main Content
  - Top bar dengan greeting dan user info
  - 4 stat cards (Kata Ditulis, Hibah Disetujui, Total Manuskrip, CTA Button)
  - Active Projects section dengan 2 project cards
  - Recent Manuscripts table dengan 3 rows

### Sidebar.vue
- **Tujuan**: Sidebar navigasi
- **Fitur**:
  - Brand logo (Sistem PBL)
  - Navigation menu (8 items)
  - Bottom menu items (Support, Settings)
  - Logout button
  - Styling active menu state

### StatCard.vue (Reusable Component)
- **Props**:
  - `title` (String): Judul card
  - `value` (String): Nilai/angka utama
  - `badge` (String): Teks badge
  - `badgeBg` (Array): [bg color, text color]
  - `iconBg` (Array): [bg color, text color]
- **Slot**: Icon SVG

### ProjectCard.vue (Reusable Component)
- **Props**:
  - `title` (String): Nama proyek
  - `subtitle` (String): Subtitle/deskripsi
  - `progress` (Number): Persentase progress (0-100)
  - `collaborators` (String): Nama-nama kolaborator (comma-separated)
- **Fitur**: Progress bar, avatar kolaborator dengan warna berbeda

### ManuscriptRow.vue (Reusable Component)
- **Props**:
  - `title` (String): Judul manuskrip
  - `category` (String): Kategori
  - `status` (String): Status manuskrip
  - `statusBg` (Array): [bg color, text color]
  - `date` (String): Tanggal terakhir diubah
- **Slot**: Icon dokumen SVG

## 🎨 Tailwind Configuration

Warna custom yang digunakan:
- `pbl-beige`: #F2E8DF (sidebar background)
- `pbl-brown`: #5E4D44 (primary color)
- `pbl-cream`: #FFFFFF (white)
- `pbl-accent-green`: #D1F7C4 (accent)
- `pbl-text-dark`: #333333 (text color)

## 📱 Responsive Design

- Mobile-first approach
- Grid layouts responsif menggunakan Tailwind (grid-cols-1, md:grid-cols-2, md:grid-cols-4)
- Sidebar tetap fixed di samping
- Main content scrollable

## 🔄 Component Usage

### Menggunakan StatCard:
```vue
<StatCard 
  title="Kata Ditulis"
  value="84,200"
  badge="Target 80%"
  :badgeBg="['bg-[#D1F7C4]', 'text-[#1E5128]']"
  :iconBg="['bg-[#FBECE1]', 'text-orange-600']"
>
  <svg><!-- icon --></svg>
</StatCard>
```

### Menggunakan ProjectCard:
```vue
<ProjectCard 
  title="Jaringan Komputer Dasar"
  subtitle="Buku Ajar • Bab 12 dari 20"
  :progress="65"
  collaborators="ED,AL"
/>
```

### Menggunakan ManuscriptRow:
```vue
<ManuscriptRow 
  title="Pemrograman Berorientasi"
  category="Buku Ajar"
  status="Dalam Review"
  :statusBg="['bg-[#E9F3E4]', 'text-[#4A6D3A]']"
  date="24 Okt 2023"
/>
```

## ✨ Fitur-Fitur

- ✅ Modular dan reusable components
- ✅ Clean code structure
- ✅ Responsive design
- ✅ Custom scrollbar styling
- ✅ Smooth transitions dan hover effects
- ✅ Proper component composition
- ✅ Props-based configuration

## 🔧 Customization Tips

1. **Mengubah warna badge**: Ubah values pada `badgeBg` array
2. **Menambah project**: Copy-paste `<ProjectCard>` dan ubah props
3. **Menambah manuscript row**: Copy-paste `<ManuscriptRow>` dan ubah props
4. **Mengubah progress bar color**: Edit class pada ProjectCard.vue (`.bg-[#9B6A43]`)

---

Struktur kode sudah rapi, modular, dan mudah untuk dimaintain! 🚀
