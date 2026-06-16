import { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Globe, 
  Palette, 
  TrendingUp, 
  Check, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  MessageCircle, 
  HelpCircle, 
  Menu, 
  Clock, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';
import './App.css';
import tokokuLogo from './assets/tokoku-logo.png';
import indonesiaFlag from './assets/indonesia-flag.svg';

// Testimonials data
const testimonials = [
  {
    name: 'Ibu Murni',
    business: 'Pemilik Warung Ayam Goreng Murni',
    avatar: 'M',
    text: '“Dulu jualan cuma nunggu orang lewat depan warung. Setelah dibikinin website statis dan Instagram bisnis sama Tokoku Digital, sekarang pesanan katering kantor masuk terus lewat WhatsApp!”',
    stars: 5,
  },
  {
    name: 'Mas Nugie',
    business: 'Owner Barbershop Nugie Cuts',
    avatar: 'N',
    text: '“Paket Branding dari Tokoku Digital juara banget. Logo baru dan feed Instagram rapi bikin anak muda di daerah saya pada berdatangan. Toko kelihatan jauh lebih profesional dan modern.”',
    stars: 5,
  },
  {
    name: 'Teh Amelia',
    business: 'Fashion & Hijab Reseller',
    avatar: 'A',
    text: '“Pilih website CMS biar bisa update stok produk sendiri. Ternyata gampang banget dipelajari, diajarin pelan-pelan sampai bisa. Sangat recommended buat UMKM kecil seperti saya.”',
    stars: 5,
  }
];

// Interactive Calculator Services
const calcServices = [
  { id: 'sosial-media', name: '📱 Sosial Media (Setup & Feed)', price: 30000, unit: 'sekali' },
  { id: 'branding', name: '🎨 Branding (Logo & Katalog)', price: 75000, unit: 'sekali' },
  { id: 'website-statis', name: '🌐 Website Statis (Cepat & Ringan)', price: 100000, unit: 'sekali' },
  { id: 'website-cms', name: '⚙️ Website CMS (Bisa Edit Sendiri)', price: 150000, unit: 'sekali' },
  { id: 'management', name: '🚀 Management Konten Bulanan', price: 50000, unit: 'bulan' }
];

function App() {
  // Navbar scroll state
  const [scrolled, setScrolled] = useState(false);
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // Website diagnosis quiz states
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  // Live calculator states
  const [selectedServices, setSelectedServices] = useState<string[]>(['website-statis', 'branding']);
  // Before-After slider position
  const [sliderPos, setSliderPos] = useState(50);
  // Testimonial carousel active index
  const [testiIndex, setTestiIndex] = useState(0);
  // WhatsApp dynamic message template
  const [waMessage, setWaMessage] = useState('Halo Tokoku Digital, saya ingin konsultasi gratis untuk digitalisasi UMKM saya!');

  // Handle header background transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate live estimator total
  const calculateTotal = () => {
    let totalOnce = 0;
    let totalMonthly = 0;
    
    selectedServices.forEach(serviceId => {
      const service = calcServices.find(s => s.id === serviceId);
      if (service) {
        if (service.unit === 'bulan') {
          totalMonthly += service.price;
        } else {
          totalOnce += service.price;
        }
      }
    });

    return { totalOnce, totalMonthly };
  };

  const { totalOnce, totalMonthly } = calculateTotal();

  // Toggle calculator services selection
  const toggleService = (id: string) => {
    // If selecting website-statis, unselect website-cms (mutually exclusive helper)
    if (id === 'website-statis' && !selectedServices.includes(id)) {
      setSelectedServices(prev => [...prev.filter(item => item !== 'website-cms'), 'website-statis']);
    } else if (id === 'website-cms' && !selectedServices.includes(id)) {
      setSelectedServices(prev => [...prev.filter(item => item !== 'website-statis'), 'website-cms']);
    } else {
      if (selectedServices.includes(id)) {
        setSelectedServices(prev => prev.filter(item => item !== id));
      } else {
        setSelectedServices(prev => [...prev, id]);
      }
    }
  };

  // Carousel controls
  const prevTesti = () => {
    setTestiIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  const nextTesti = () => {
    setTestiIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Direct dummy WhatsApp chat link
  const getWaLink = (customText?: string) => {
    const phoneNumber = '6285706485815'; 
    const text = customText || waMessage;
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      {/* HEADER & NAVIGATION */}
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="container navbar">
          <a href="#" className="logo-area">
            <img 
              src={tokokuLogo}
              alt="Tokoku Digital" 
              style={{ width: '50px', height: '50px', objectFit: 'contain' }}
            />
            <span>Tokoku<span className="logo-dot">.</span>Digital</span>
          </a>

          {/* Desktop Menu - Grouped with Dropdowns */}
          <ul className="nav-menu">
            {/* Tentang Kami Dropdown */}
            <li className="nav-item-group">
              <button 
                className="nav-link nav-dropdown-toggle"
                onMouseEnter={() => setOpenDropdown('tentang')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                Tentang Kami
              </button>
              <div 
                className={`nav-dropdown ${openDropdown === 'tentang' ? 'active' : ''}`}
                onMouseEnter={() => setOpenDropdown('tentang')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a href="#masalah" className="nav-dropdown-link">Masalah UMKM</a>
                <a href="#keunggulan" className="nav-dropdown-link">Keunggulan Kami</a>
              </div>
            </li>

            {/* Layanan Dropdown */}
            <li className="nav-item-group">
              <button 
                className="nav-link nav-dropdown-toggle"
                onMouseEnter={() => setOpenDropdown('layanan')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                Layanan
              </button>
              <div 
                className={`nav-dropdown ${openDropdown === 'layanan' ? 'active' : ''}`}
                onMouseEnter={() => setOpenDropdown('layanan')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a href="#solusi" className="nav-dropdown-link">Solusi Kami</a>
                <a href="#edukasi" className="nav-dropdown-link">Statis vs CMS</a>
              </div>
            </li>

            {/* Portfolio & Testimoni Dropdown */}
            <li className="nav-item-group">
              <button 
                className="nav-link nav-dropdown-toggle"
                onMouseEnter={() => setOpenDropdown('portfolio')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                Portfolio
              </button>
              <div 
                className={`nav-dropdown ${openDropdown === 'portfolio' ? 'active' : ''}`}
                onMouseEnter={() => setOpenDropdown('portfolio')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a href="#portfolio" className="nav-dropdown-link">Hasil Nyata</a>
                <a href="#testimoni" className="nav-dropdown-link">Testimoni</a>
              </div>
            </li>

            {/* Paket Harga */}
            <li><a href="#harga" className="nav-link">Paket Harga</a></li>
          </ul>

          <div className="nav-actions">
            <a href="#kontak" className="btn btn-primary btn-sm">Konsultasi Gratis</a>
            <button 
              className="mobile-toggle" 
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Buka menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAV DRAWER OVERLAY */}
      <div 
        className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* MOBILE DRAWER */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <span className="logo-area" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img 
              src={tokokuLogo}
              alt="Tokoku Digital" 
              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
            />
            <span>Tokoku<span className="logo-dot">.</span>Digital</span>
          </span>
          <button 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--navy-dark)' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={28} />
          </button>
        </div>

        <ul className="mobile-menu-links">
          <li>
            <strong>Tentang</strong>
            <a href="#masalah" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Masalah UMKM</a>
            <a href="#keunggulan" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Keunggulan Kami</a>
          </li>
          <li>
            <strong>Layanan</strong>
            <a href="#solusi" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Solusi Kami</a>
            <a href="#edukasi" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Statis vs CMS</a>
          </li>
          <li>
            <strong>Portfolio</strong>
            <a href="#portfolio" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Hasil Nyata</a>
            <a href="#testimoni" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Testimoni</a>
          </li>
          <li>
            <a href="#harga" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Paket Harga</a>
          </li>
        </ul>

        <a 
          href="#kontak" 
          className="btn btn-primary" 
          style={{ marginTop: 'auto', width: '100%' }}
          onClick={() => setMobileMenuOpen(false)}
        >
          Konsultasi Gratis
        </a>
      </div>


      {/* SECTION 1: HERO */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <span style={{ 
              backgroundColor: 'var(--yellow-light)', 
              color: 'var(--yellow-gold)', 
              fontWeight: 700, 
              fontSize: '0.85rem', 
              padding: '6px 16px', 
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
              border: '1px solid var(--yellow-accent)'
            }}>
              <span>Solusi Digitalisasi UMKM Indonesia</span>
              <img src={indonesiaFlag} alt="Indonesia" style={{ width: '20px', height: '14px' }} />
            </span>
            <h1>“Biar tokomu makin dikenal di era digital 🚀”</h1>
            <p>Kami bantu UMKM tampil lebih modern lewat website premium, branding keren, dan pengelolaan sosial media yang tepat sasaran.</p>
            
            <div className="hero-ctas">
              <a href="#kontak" className="btn btn-accent animate-glow">Konsultasi Sekarang</a>
              <a href="#solusi" className="btn btn-outline">Lihat Layanan</a>
            </div>
          </div>

          {/* Interactive Multi-Layered Premium Visual Widget */}
          <div className="hero-visual">
            {/* Simulated Desktop Laptop Screen */}
            <div className="laptop-frame animate-float">
              <div className="laptop-screen">
                <div className="screen-header">
                  <div className="dot-btn"></div>
                  <div className="dot-btn"></div>
                  <div className="dot-btn"></div>
                  <div className="screen-address-bar">tokomu-modern.com</div>
                </div>
                <div className="screen-body">
                  <div className="screen-hero-sim">
                    <span className="sim-logo">☕ Kopi Kita</span>
                    <div className="sim-text-line"></div>
                    <div className="sim-text-line short"></div>
                    <div className="sim-text-line accent"></div>
                    <div className="sim-btn-group">
                      <div className="sim-btn"></div>
                      <div className="sim-btn yellow"></div>
                    </div>
                  </div>
                  <div className="screen-side-sim">
                    <div className="sim-img-box">✨</div>
                    <div className="sim-product-card">
                      <div className="sim-text-line" style={{ width: '90%' }}></div>
                      <div className="phone-img-placeholder" style={{ height: '8px' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="laptop-base animate-float"></div>

            {/* Simulated Mobile Phone Screen */}
            <div className="phone-frame animate-float-delayed">
              <div className="phone-screen">
                <div className="phone-notch"></div>
                <div className="phone-body">
                  <div className="phone-header">
                    <span className="phone-shop-logo">☕ Kopi Kita</span>
                    <div style={{ width: '10px', height: '6px', backgroundColor: 'var(--navy-medium)', borderRadius: '1px' }}></div>
                  </div>
                  <div className="phone-hero">
                    <div className="sim-text-line" style={{ backgroundColor: 'white', width: '70%', height: '5px' }}></div>
                    <div className="sim-text-line" style={{ backgroundColor: 'var(--yellow-light)', width: '40%', height: '4px' }}></div>
                  </div>
                  <div className="phone-grid-products">
                    <div className="phone-product">
                      <div className="phone-img-placeholder"></div>
                      <div className="sim-text-line" style={{ height: '3px', width: '80%' }}></div>
                    </div>
                    <div className="phone-product">
                      <div className="phone-img-placeholder" style={{ backgroundColor: 'var(--navy-light)' }}></div>
                      <div className="sim-text-line" style={{ height: '3px', width: '80%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Instagram Feed Popout */}
            <div className="instagram-widget animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="insta-header">
                <div className="insta-avatar">
                  <div className="insta-avatar-inner"></div>
                </div>
                <span className="insta-username">kopikita.id</span>
              </div>
              <div className="insta-feed-grid">
                <div className="insta-post">🔥<span className="insta-post-tag">Feed</span></div>
                <div className="insta-post">☕<span className="insta-post-tag">Feed</span></div>
                <div className="insta-post">✨<span className="insta-post-tag">Feed</span></div>
                <div className="insta-post">🌿<span className="insta-post-tag">Feed</span></div>
                <div className="insta-post">❤️<span className="insta-post-tag">Feed</span></div>
                <div className="insta-post">💬<span className="insta-post-tag">Feed</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 2: MASALAH UMKM */}
      <section id="masalah" className="section-padding problem-section">
        <div className="container">
          <div className="problem-header">
            <span style={{ 
              color: 'var(--danger)', 
              fontWeight: 700, 
              fontSize: '0.9rem', 
              letterSpacing: '1px', 
              textTransform: 'uppercase', 
              marginBottom: '10px', 
              display: 'block' 
            }}>Realita Lapangan</span>
            <h2>“Masih jualan offline aja?”</h2>
            <p>Banyak usaha luar biasa yang terhambat pertumbuhannya karena belum memanfaatkan kekuatan media digital.</p>
          </div>

          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon-wrapper">
                <X size={24} />
              </div>
              <h3>Belum Punya Instagram Bisnis</h3>
              <p>Orang lain tidak bisa melihat katalog produk, testimoni, atau profil tokomu secara online.</p>
            </div>

            <div className="problem-card">
              <div className="problem-icon-wrapper">
                <X size={24} />
              </div>
              <h3>Belum Punya Website</h3>
              <p>Toko tidak memiliki rumah digital resmi, membuat kredibilitas usahamu terlihat kurang profesional.</p>
            </div>

            <div className="problem-card">
              <div className="problem-icon-wrapper">
                <X size={24} />
              </div>
              <h3>Promosi Mulut ke Mulut</h3>
              <p>Jangkauan pelanggan sangat terbatas hanya pada tetangga sekitar atau kerabat terdekat saja.</p>
            </div>

            <div className="problem-card">
              <div className="problem-icon-wrapper">
                <X size={24} />
              </div>
              <h3>Customer Susah Cari Tokomu</h3>
              <p>Saat pelanggan mencari produkmu di Google, toko kompetitormu yang muncul karena lokasimu belum terdaftar digital.</p>
            </div>
          </div>

          <div className="problem-footer">
            <p className="problem-footer-text">
              Padahal sekarang orang cari toko lewat internet👀
            </p>
          </div>
        </div>
      </section>


      {/* SECTION 3: SOLUSI KAMI */}
      <section id="solusi" className="section-padding">
        <div className="container">
          <div className="solution-header">
            <span style={{ 
              color: 'var(--navy-medium)', 
              fontWeight: 700, 
              fontSize: '0.9rem', 
              letterSpacing: '1px', 
              textTransform: 'uppercase', 
              marginBottom: '10px', 
              display: 'block' 
            }}>Solusi Tokoku Digital</span>
            <h2>Tokoku Digital siap bantu UMKM go digital</h2>
            <p>Kami hadir menyediakan layanan terintegrasi yang murah, ramah, dan disesuaikan khusus untuk UMKM Indonesia Tradisional.</p>
          </div>

          <div className="solution-grid">
            {/* Card 1 */}
            <div className="solution-card">
              <div className="solution-icon-wrapper">
                <Smartphone />
              </div>
              <h3>Sosial Media</h3>
              <p>Layanan optimasi dan penataan sosial media bisnis untuk menarik calon pelanggan milenial.</p>
              <ul className="solution-list">
                <li><Check className="solution-list-icon" size={16} /> Setup Instagram bisnis lengkap</li>
                <li><Check className="solution-list-icon" size={16} /> Desain feed rapi & profesional</li>
                <li><Check className="solution-list-icon" size={16} /> Pembuatan link bio WhatsApp</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="solution-card">
              <div className="solution-icon-wrapper">
                <Globe />
              </div>
              <h3>Website UMKM</h3>
              <p>Pembuatan website premium, cepat diakses, responsif di HP, dan ramah kantong pemilik usaha kecil.</p>
              <ul className="solution-list">
                <li><Check className="solution-list-icon" size={16} /> Pilihan Website Statis atau CMS</li>
                <li><Check className="solution-list-icon" size={16} /> Integrasi langsung ke WhatsApp</li>
                <li><Check className="solution-list-icon" size={16} /> SEO dasar agar muncul di Google</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="solution-card">
              <div className="solution-icon-wrapper">
                <Palette />
              </div>
              <h3>Branding</h3>
              <p>Membangun identitas visual tokomu agar diingat pelanggan dan memiliki keunikan dibanding kompetitor.</p>
              <ul className="solution-list">
                <li><Check className="solution-list-icon" size={16} /> Desain logo UMKM modern</li>
                <li><Check className="solution-list-icon" size={16} /> Katalog produk digital</li>
                <li><Check className="solution-list-icon" size={16} /> Template pamflet promosi harian</li>
              </ul>
            </div>

            {/* Card 4 */}
            <div className="solution-card">
              <div className="solution-icon-wrapper">
                <TrendingUp />
              </div>
              <h3>Management</h3>
              <p>Layanan asisten digital untuk mengurus konten harian tokomu agar kamu bisa fokus melayani pembeli.</p>
              <ul className="solution-list">
                <li><Check className="solution-list-icon" size={16} /> Pengelolaan konten media sosial</li>
                <li><Check className="solution-list-icon" size={16} /> Copywriting promo menarik</li>
                <li><Check className="solution-list-icon" size={16} /> Laporan perkembangan bulanan</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 4: KEUNGGULAN */}
      <section id="keunggulan" className="section-padding value-section">
        <div className="container">
          <div className="value-header">
            <span style={{ 
              color: 'var(--yellow-gold)', 
              fontWeight: 700, 
              fontSize: '0.9rem', 
              letterSpacing: '1px', 
              textTransform: 'uppercase', 
              marginBottom: '10px', 
              display: 'block' 
            }}>Kenapa Kami?</span>
            <h2>Kenapa pilih Tokoku Digital?</h2>
          </div>

          <div className="value-grid">
            <div className="value-card">
              <div className="value-icon">✅</div>
              <h3 style={{ fontSize: '1.15rem' }}>Harga Ramah UMKM</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mulai dari puluhan ribu rupiah. Budget minim bukan lagi halangan buat digitalisasi.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">✅</div>
              <h3 style={{ fontSize: '1.15rem' }}>Fleksibel Sesuai Kebutuhan</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pilih layanan yang benar-benar kamu perlukan saja tanpa paksaan paket mahal.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">✅</div>
              <h3 style={{ fontSize: '1.15rem' }}>Bisa Custom Layanan</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ada kebutuhan khusus? Konsultasikan, kami sesuaikan fitur dengan tokomu.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">✅</div>
              <h3 style={{ fontSize: '1.15rem' }}>Cocok untuk UMKM Mikro</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Proses tidak ribet, bahasa penjelasan kami mudah dipahami tanpa istilah teknik rumit.</p>
            </div>

            <div className="value-card">
              <div className="value-icon">✅</div>
              <h3 style={{ fontSize: '1.15rem' }}>Pendampingan Digital</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tidak kami lepas begitu saja. Kami ajari cara operasional dasarnya sampai mahir.</p>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 5: WEBSITE STATIS vs CMS (EDUCATIONAL + INTERACTIVE DIAGNOSTIC WIZARD) */}
      <section id="edukasi" className="section-padding">
        <div className="container">
          <div className="compare-header">
            <span style={{ 
              color: 'var(--navy-medium)', 
              fontWeight: 700, 
              fontSize: '0.9rem', 
              letterSpacing: '1px', 
              textTransform: 'uppercase', 
              marginBottom: '10px', 
              display: 'block' 
            }}>Edukasi Penting 😭🔥</span>
            <h2>Pilih website sesuai kebutuhanmu</h2>
          </div>

          <div className="compare-grid">
            {/* Website Statis */}
            <div className="compare-card">
              <h3>Website Statis</h3>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '-10px', display: 'block' }}>Rekomendasi Tercepat & Termurah</span>
              <ul className="compare-features">
                <li><Check className="compare-icon-check" /> <strong>Simple:</strong> Berisi informasi profil toko, menu, & alamat.</li>
                <li><Check className="compare-icon-check" /> <strong>Cepat:</strong> Halaman loading instan dan sangat hemat kuota pembeli.</li>
                <li><Check className="compare-icon-check" /> <strong>Langsung ke WhatsApp:</strong> Pelanggan klik tombol langsung diarahkan chat ke admin toko.</li>
                <li><Check className="compare-icon-check" /> <strong>Cocok UMKM Kecil:</strong> Untuk usaha kuliner, jasa laundry, bengkel, atau portofolio personal.</li>
              </ul>
            </div>

            {/* Website CMS */}
            <div className="compare-card recommended">
              <div className="compare-badge">Paling Populer</div>
              <h3>Website CMS</h3>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '-10px', display: 'block' }}>Bisa Kelola Mandiri</span>
              <ul className="compare-features">
                <li><Check className="compare-icon-check" /> <strong>Bisa Edit Sendiri:</strong> Disediakan halaman khusus admin untuk mengubah info tokomu.</li>
                <li><Check className="compare-icon-check" /> <strong>Upload Produk Sendiri:</strong> Tambah foto produk baru, harga, dan diskon kapan saja tanpa bantuan kami.</li>
                <li><Check className="compare-icon-check" /> <strong>Cocok Bisnis Berkembang:</strong> Untuk toko online baju, toko kelontong modern dengan ratusan produk.</li>
                <li><Check className="compare-icon-check" /> <strong>Skalabilitas Tinggi:</strong> Fitur bisa terus ditambah seiring berkembangnya tokomu.</li>
              </ul>
            </div>
          </div>

          {/* INTERACTIVE COMPONENT: EDUCATIONAL QUIZ DIAGNOSTIC */}
          <div className="diagnose-box">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
              <HelpCircle color="var(--navy-medium)" size={24} />
              <h4 className="diagnose-title" style={{ margin: 0 }}>Bingung pilih yang mana? Jawab 1 pertanyaan ini:</h4>
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Apakah Anda ingin/punya waktu untuk meng-upload dan merubah sendiri isi produk di website setiap hari?</p>
            
            <div className="diagnose-options">
              <button 
                className={`diagnose-btn ${quizAnswer === 'no' ? 'active' : ''}`}
                onClick={() => setQuizAnswer('no')}
              >
                ❌ Tidak, saya ingin praktis langsung terima jadi saja
              </button>
              <button 
                className={`diagnose-btn ${quizAnswer === 'yes' ? 'active' : ''}`}
                onClick={() => setQuizAnswer('yes')}
              >
                ✏️ Ya, saya ingin bisa gonta-ganti produk sendiri kapan saja
              </button>
            </div>

            {quizAnswer && (
              <div className="diagnose-result">
                {quizAnswer === 'no' ? (
                  <>
                    <h5 style={{ fontSize: '1.1rem', color: 'var(--navy-medium)', marginBottom: '6px' }}>
                      Rekomendasi: <strong>Website Statis UMKM</strong>
                    </h5>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      Pilihan terbaik untuk Anda! Lebih hemat biaya, tidak repot belajar cara kelola website, loading sangat cepat, dan semua calon pembeli Anda akan langsung terhubung ke WhatsApp Anda untuk melakukan pemesanan. Kami yang urus pembuatannya sampai online!
                    </p>
                  </>
                ) : (
                  <>
                    <h5 style={{ fontSize: '1.1rem', color: 'var(--navy-medium)', marginBottom: '6px' }}>
                      Rekomendasi: <strong>Website CMS UMKM</strong>
                    </h5>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      Sangat cocok untuk Anda! Kami akan membuatkan panel admin khusus yang sangat mudah digunakan (bahkan lewat HP). Anda bisa bebas mengupload foto produk, merubah harga coret promosi, dan mengelola tokomu sendiri tanpa ketergantungan jasa orang lain.
                    </p>
                  </>
                )}
                <a 
                  href={getWaLink(quizAnswer === 'no' ? 'Halo Tokoku Digital, hasil rekomendasi kuis saya adalah Website Statis. Saya mau konsultasi lebih lanjut!' : 'Halo Tokoku Digital, hasil rekomendasi kuis saya adalah Website CMS. Saya mau konsultasi lebih lanjut!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent btn-sm"
                  style={{ marginTop: '16px' }}
                >
                  Konsultasikan Hasil Kuis Ini
                </a>
              </div>
            )}

            <div className="compare-footer" style={{ marginTop: '40px' }}>
              <a href="#kontak" className="btn btn-primary">Konsultasi Dulu</a>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 6: PAKET HARGA & DYNAMIC PRICING ESTIMATOR */}
      <section id="harga" className="section-padding pricing-section bg-gradient-soft">
        <div className="container">
          <div className="pricing-header">
            <span style={{ 
              color: 'var(--navy-medium)', 
              fontWeight: 700, 
              fontSize: '0.9rem', 
              letterSpacing: '1px', 
              textTransform: 'uppercase', 
              marginBottom: '10px', 
              display: 'block' 
            }}>Daftar Harga</span>
            <h2>Harga yang ramah buat UMKM</h2>
            <p>Tanpa biaya tersembunyi, sangat transparan, dan disesuaikan dengan skala bisnis usahamu.</p>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <span className="pricing-name">Starter Branding</span>
              <div className="pricing-price">30K</div>
              <p>Setup Instagram bisnis lengkap, bio link WhatsApp, dan template feed basic.</p>
            </div>

            <div className="pricing-card">
              <span className="pricing-name">Premium Branding</span>
              <div className="pricing-price">75K</div>
              <p>Desain logo premium, katalog produk digital 10 item, dan 3 template desain promosi.</p>
            </div>

            <div className="pricing-card">
              <span className="pricing-name">Website UMKM</span>
              <div className="pricing-price">100K</div>
              <p>Pembuatan website statis terintegrasi tombol chat WhatsApp dan hosting 1 tahun.</p>
            </div>

            <div className="pricing-card">
              <span className="pricing-name">Management Konten</span>
              <div className="pricing-price">50K<span style={{ fontSize: '1rem', fontWeight: 500 }}>/bln</span></div>
              <p>Pengelolaan konten media sosial (Instagram feed harian & copywriting caption promo).</p>
            </div>
          </div>

          <div className="pricing-flex-banner">
            Harga fleksibel sesuai kebutuhan usaha.
          </div>

          {/* DYNAMIC PRICE ESTIMATOR WIDGET */}
          <div className="calculator-box glass-panel">
            <h3 className="calculator-title">Simulasi & Kalkulator Biaya Custom</h3>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '32px', marginTop: '-20px' }}>
              Pilih layanan yang Anda butuhkan di bawah ini untuk melihat perkiraan biaya digitalisasi tokomu secara instan:
            </p>

            <div className="calculator-grid">
              <div className="calculator-options">
                {calcServices.map((service) => (
                  <div 
                    key={service.id} 
                    className={`calc-option-card ${selectedServices.includes(service.id) ? 'active' : ''}`}
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="calc-option-left">
                      <div className="calc-checkbox">
                        {selectedServices.includes(service.id) && <Check size={14} strokeWidth={3} />}
                      </div>
                      <div>
                        <div className="calc-option-name">{service.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {service.id === 'website-statis' && 'Cocok untuk pemula'}
                          {service.id === 'website-cms' && 'Rekomendasi bisnis berkembang'}
                          {service.id === 'management' && 'Kelola konten bulanan'}
                        </div>
                      </div>
                    </div>
                    <div className="calc-option-price">
                      {service.price >= 1000 ? `${service.price/1000}K` : service.price}
                      {service.unit === 'bulan' ? '/bln' : ''}
                    </div>
                  </div>
                ))}
              </div>

              <div className="calculator-summary">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--navy-medium)' }}>
                  <Layers size={20} />
                  <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.5px' }}>Perkiraan Total</span>
                </div>
                
                <div>
                  {totalOnce > 0 && (
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Biaya Sekali Bayar (Setup/Pembuatan)</div>
                      <div className="calc-sum-price">{totalOnce/1000}K</div>
                    </div>
                  )}
                  {totalMonthly > 0 && (
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Biaya Rutin Bulanan (Maintenance/Konten)</div>
                      <div className="calc-sum-price" style={{ color: 'var(--yellow-gold)' }}>{totalMonthly/1000}K<span style={{ fontSize: '1.2rem' }}>/bulan</span></div>
                    </div>
                  )}
                  {totalOnce === 0 && totalMonthly === 0 && (
                    <div style={{ padding: '20px 0' }}>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Silakan pilih minimal 1 layanan untuk melihat estimasi harga.</p>
                    </div>
                  )}
                </div>

                <a 
                  href={selectedServices.length > 0 ? getWaLink(`Halo Tokoku Digital, saya sudah mencoba kalkulator harga custom. Pilihan saya: ${selectedServices.map(id => calcServices.find(s=>s.id === id)?.name).join(', ')}. Saya tertarik untuk berkonsultasi!`) : '#'}
                  target={selectedServices.length > 0 ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`btn btn-accent ${selectedServices.length === 0 ? 'disabled' : ''}`}
                  style={{ 
                    width: '100%', 
                    marginTop: '10px', 
                    opacity: selectedServices.length === 0 ? 0.5 : 1, 
                    pointerEvents: selectedServices.length === 0 ? 'none' : 'auto' 
                  }}
                >
                  Ambil Paket Ini Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 7: PREVIEW / PORTFOLIO & INTERACTIVE BEFORE-AFTER SLIDER */}
      <section id="portfolio" className="section-padding">
        <div className="container">
          <div className="portfolio-header">
            <span style={{ 
              color: 'var(--navy-medium)', 
              fontWeight: 700, 
              fontSize: '0.9rem', 
              letterSpacing: '1px', 
              textTransform: 'uppercase', 
              marginBottom: '10px', 
              display: 'block' 
            }}>Hasil Nyata</span>
            <h2>Contoh digitalisasi UMKM</h2>
            <p>Geser garis di bawah ini ke kiri dan ke kanan untuk melihat perbandingan toko sebelum dan sesudah didigitalisasi oleh tim kami.</p>
          </div>

          {/* BEFORE-AFTER INTERACTIVE SLIDER WIDGET */}
          <div className="slider-container">
            {/* Before (Left side) */}
            <div className="slider-image slider-before">
              <div className="before-design">
                <span style={{ fontSize: '3rem', filter: 'grayscale(1)' }}>🏪</span>
                <span className="before-logo">Warung Mak Murti (Offline)</span>
                <div className="before-menu">
                  <span>Hubungi: 0812-xxxx (Harus Catat Manual)</span>
                </div>
                <div className="before-body">
                  <p style={{ color: '#7f8c8d', fontSize: '11px' }}>❌ Belum punya website resmi</p>
                  <p style={{ color: '#7f8c8d', fontSize: '11px', marginTop: '4px' }}>❌ Logo digambar tangan seadanya</p>
                  <p style={{ color: '#7f8c8d', fontSize: '11px', marginTop: '4px' }}>❌ Orang luar kota tidak tahu warung ini</p>
                </div>
              </div>
            </div>

            {/* After (Right side) - Clip path dynamic sizing */}
            <div 
              className="slider-image slider-after"
              style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
            >
              <div className="after-design">
                <div className="after-logo-area">
                  <div className="after-logo-icon">🌿</div>
                  <span className="after-logo-text">Dapur Mak Murti — Catering Premium</span>
                </div>
                
                <div className="after-card">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div className="sim-img-box" style={{ height: '80px', fontSize: '1.6rem' }}>🍲</div>
                    <span className="after-tag">Rekomendasi</span>
                  </div>
                  <div className="after-card-right">
                    <span className="after-title">Nasi Tumpeng Mini Nusantara</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Cita rasa legendaris turun-temurun sejak 1998 kini hadir online.</span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--navy-medium)' }}>Rp 15.000</strong>
                      <button className="after-btn">Order Now</button>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', fontSize: '11px', fontWeight: 'bold', color: 'var(--success)' }}>
                  <span>✅ Terindex Google</span>
                  <span>✅ Tombol WA Otomatis</span>
                  <span>✅ Branding Modern</span>
                </div>
              </div>
            </div>

            {/* Labels overlay */}
            <div className="slider-label slider-label-before">SEBELUM (Offline)</div>
            <div className="slider-label slider-label-after">SESUDAH (Digital)</div>

            {/* Slide control bar */}
            <div 
              className="slider-handle"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="slider-handle-button">
                <ChevronLeft size={16} /><ChevronRight size={16} />
              </div>
            </div>

            {/* Invisible native range input overlayed to control cleanly */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderPos} 
              onChange={(e) => setSliderPos(Number(e.target.value))}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'ew-resize',
                zIndex: 35
              }}
            />
          </div>
        </div>
      </section>


      {/* SECTION 8: TESTIMONI (STUDI KASUS DUMMY) */}
      <section id="testimoni" className="section-padding testimonial-section">
        <div className="container">
          <div className="testimonial-header">
            <span style={{ 
              color: 'var(--navy-medium)', 
              fontWeight: 700, 
              fontSize: '0.9rem', 
              letterSpacing: '1px', 
              textTransform: 'uppercase', 
              marginBottom: '10px', 
              display: 'block' 
            }}>Ulasan Pelanggan</span>
            <h2>Apa kata pemilik usaha?</h2>
            <p>Cerita sukses nyata dari para pelaku UMKM yang berani mengambil langkah maju bersama kami.</p>
          </div>

          <div className="testimonial-carousel">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(testimonials[testiIndex].stars)].map((_, i) => (
                  <Star key={i} size={20} fill="var(--yellow-accent)" stroke="none" />
                ))}
              </div>

              <p className="testimonial-text">
                {testimonials[testiIndex].text}
              </p>

              <div className="testimonial-user">
                <div className="testimonial-avatar">
                  {testimonials[testiIndex].avatar}
                </div>
                <div className="testimonial-user-info">
                  <div className="testimonial-name">{testimonials[testiIndex].name}</div>
                  <div className="testimonial-business">{testimonials[testiIndex].business}</div>
                </div>
              </div>
            </div>

            <div className="testimonial-controls">
              <button className="testimonial-ctrl-btn" onClick={prevTesti} aria-label="Sebelumnya">
                <ChevronLeft size={20} />
              </button>
              <button className="testimonial-ctrl-btn" onClick={nextTesti} aria-label="Selanjutnya">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 9: CTA FINAL & CHAT BOX INTERACTIVE SIMULATOR */}
      <section id="kontak" className="section-padding cta-section">
        <div className="container cta-grid">
          <div className="cta-content">
            <span style={{ 
              backgroundColor: 'var(--yellow-light)', 
              color: 'var(--yellow-gold)', 
              fontWeight: 700, 
              fontSize: '0.85rem', 
              padding: '6px 16px', 
              borderRadius: '20px',
              display: 'inline-block',
              marginBottom: '16px',
              border: '1px solid var(--yellow-accent)'
            }}>
              Konsultasi 100% Gratis 💬
            </span>
            <h2>Siap bikin tokomu makin dikenal?</h2>
            <p>Mulai digitalisasi UMKM-mu sekarang. Chat dengan admin kami sekarang secara gratis untuk mendapatkan saran terbaik sesuai tokomu.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Clock color="var(--navy-medium)" size={20} />
                <span style={{ fontSize: '0.95rem' }}><strong>Respon Cepat:</strong> Senin - Minggu (08:00 - 21:00)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ShieldCheck color="var(--success)" size={20} />
                <span style={{ fontSize: '0.95rem' }}>Tanpa ikatan kontrak. Bebas tanya-tanya dlu sampai jelas.</span>
              </div>
            </div>
          </div>

          {/* INTERACTIVE CHAT PREVIEW SIMULATOR WIDGET */}
          <div>
            <div className="whatsapp-widget">
              <div className="wa-header">
                <div className="wa-avatar">T</div>
                <div className="wa-status-area">
                  <div className="wa-name">Tokoku Digital Admin</div>
                  <div className="wa-status">● Online (Siap Membantu)</div>
                </div>
              </div>
              
              <div className="wa-chat-body">
                <div className="wa-msg wa-msg-received">
                  Halo pelaku usaha hebat! Selamat datang di Tokoku Digital. Ada yang bisa kami bantu? 😊
                  <div className="wa-time">08:00</div>
                </div>
                
                <div className="wa-msg wa-msg-received">
                  Kami bisa bantu buatkan logo branding, desain feed Instagram, atau website UMKM kilat lho!
                  <div className="wa-time">08:01</div>
                </div>

                <div className="wa-msg wa-msg-sent">
                  Halo admin, saya mau tanya-tanya dulu tentang digitalisasi toko saya!
                  <div className="wa-time">Sekarang</div>
                </div>
              </div>

              <div className="wa-footer">
                <input 
                  type="text" 
                  className="wa-input" 
                  value={waMessage} 
                  onChange={(e) => setWaMessage(e.target.value)}
                  placeholder="Ketik pesan WhatsApp di sini..."
                  aria-label="Isi pesan WhatsApp"
                />
                <a 
                  href={getWaLink()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="wa-send-btn"
                  aria-label="Kirim ke WhatsApp"
                >
                  <MessageCircle size={18} fill="white" />
                </a>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <a 
                href={getWaLink()} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-accent" 
                style={{ width: '100%', maxWidth: '360px', padding: '14px 28px' }}
              >
                Konsultasi Gratis (WhatsApp)
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <span className="footer-brand-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img 
                src={tokokuLogo}
                alt="Tokoku Digital" 
                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
              />
              <span>Tokoku.Digital</span>
            </span>
            <p>Membantu mendigitalisasi usaha mikro, kecil, dan menengah di Indonesia agar tampil keren, modern, dan kebanjiran orderan.</p>
          </div>

          <div className="footer-links-col">
            <h4>Layanan Kami</h4>
            <ul>
              <li><a href="#solusi">📱 Sosial Media Setup</a></li>
              <li><a href="#solusi">🌐 Pembuatan Website UMKM</a></li>
              <li><a href="#solusi">🎨 Desain Branding & Logo</a></li>
              <li><a href="#solusi">🚀 Content Management Bulanan</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Navigasi Halaman</h4>
            <ul>
              <li><a href="#masalah">Masalah Offline</a></li>
              <li><a href="#keunggulan">Kenapa Pilih Kami</a></li>
              <li><a href="#edukasi">Statis vs CMS</a></li>
              <li><a href="#harga">Kalkulator Biaya</a></li>
              <li><a href="#portfolio">Slider Sebelum-Sesudah</a></li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Tokoku Digital. Hak Cipta Dilindungi. Dibuat dengan ❤️ untuk UMKM Indonesia.</p>
          <p style={{ fontSize: '0.75rem' }}>WhatsApp Admin : +62 857-0648-5815</p>
        </div>
      </footer>
    </>
  );
}

export default App;
