import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  Building,
  Calculator,
  ChevronDown,
  Clock,
  CreditCard,
  Home,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scissors,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import type { Haircut } from "./backend.d";
import { Category } from "./backend.d";
import { useBCVRate, useHaircuts } from "./hooks/useQueries";

const WA_BASE = "https://wa.me/584266137046";
const WA_GENERAL = `${WA_BASE}?text=${encodeURIComponent("¡Hola Yelier! Me interesa reservar un corte contigo 🔥 Vi tu página y me gustaría saber tu disponibilidad 😊")}`;

function waServiceLink(serviceName: string) {
  const msg = `¡Hola Yelier! Quiero reservar un ${serviceName} 💈 ¿Tienes disponibilidad? Vi tu página web y me encantó tu trabajo! 😊`;
  return `${WA_BASE}?text=${encodeURIComponent(msg)}`;
}

function formatVES(amount: number): string {
  return new Intl.NumberFormat("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

const categoryLabel: Record<string, string> = {
  [Category.basic]: "Básico",
  [Category.intermediate]: "Intermedio",
  [Category.trend]: "Tendencia",
};

const categoryColor: Record<string, string> = {
  [Category.basic]: "bg-muted text-muted-foreground",
  [Category.intermediate]: "bg-gold/20 text-gold border-gold/30",
  [Category.trend]: "bg-primary/20 text-primary border-primary/30",
};

// --- Navbar ---
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicios", href: "#servicios" },
    { label: "Galería", href: "#galeria" },
    { label: "Testimonios", href: "#testimonios" },
    { label: "Precios", href: "#calculadora" },
    { label: "Sobre Mí", href: "#sobre-mi" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-carbon shadow-lg shadow-black/50"
          : "bg-carbon/80 backdrop-blur-md"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        <a href="#inicio" className="flex items-center gap-2 group">
          <Scissors className="w-6 h-6 text-gold group-hover:rotate-12 transition-transform" />
          <span className="text-gold font-bold text-xl tracking-widest uppercase">
            YilerthBarber
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                data-ocid="nav.link"
                className="text-sm font-semibold tracking-wider uppercase text-muted-foreground hover:text-gold transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={WA_GENERAL}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="nav.primary_button"
          className="hidden md:flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white px-4 py-2 rounded text-sm font-bold tracking-wider uppercase transition-colors"
        >
          <SiWhatsapp className="w-4 h-4" />
          RESERVAR
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground p-2"
          aria-label="Menú"
          data-ocid="nav.toggle"
          type="button"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-carbon border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-semibold tracking-wider uppercase text-muted-foreground hover:text-gold transition-colors py-2"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={WA_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-whatsapp text-white px-4 py-3 rounded font-bold tracking-wider uppercase mt-2"
              >
                <SiWhatsapp className="w-4 h-4" />
                RESERVAR POR WHATSAPP
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// --- Hero ---
function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase">
              Barbería Profesional · Caracas
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase leading-none mb-4 tracking-tight">
            <span className="text-gold">YILERTH</span>
            <br />
            <span className="text-white">BARBER</span>
          </h1>

          <p className="text-lg sm:text-xl font-semibold text-muted-foreground tracking-wider uppercase mb-4">
            Cortes Modernos en Caracas
          </p>

          <p className="text-base text-muted-foreground mb-10 max-w-lg leading-relaxed">
            Tu barbero de confianza para cortes profesionales, a domicilio y
            desde el apartamento. Precisión, estilo y comodidad donde estés.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contacto"
              data-ocid="hero.primary_button"
              className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-carbon font-bold px-8 py-4 rounded uppercase tracking-widest text-sm transition-colors"
            >
              RESERVA TU CITA <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#servicios"
              data-ocid="hero.secondary_button"
              className="flex items-center justify-center gap-2 border-2 border-gold text-gold hover:bg-gold/10 font-bold px-8 py-4 rounded uppercase tracking-widest text-sm transition-colors"
            >
              VER SERVICIOS <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-6 h-6 text-gold/60" />
      </motion.div>
    </section>
  );
}

// --- Service Card ---
function ServiceCard({
  haircut,
  bcvRate,
}: { haircut: Haircut; bcvRate: number }) {
  const ves = haircut.priceUSD * bcvRate;
  const link = waServiceLink(haircut.name);
  const catKey =
    typeof haircut.category === "object"
      ? Object.keys(haircut.category)[0]
      : String(haircut.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-carbon-card border border-border rounded-lg p-6 flex flex-col gap-4 hover:border-gold/50 transition-colors group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <span
            className={`inline-block text-xs font-bold px-2 py-1 rounded border mb-3 uppercase tracking-wider ${
              categoryColor[catKey] || "bg-muted text-muted-foreground"
            }`}
          >
            {categoryLabel[catKey] || catKey}
          </span>
          <h3 className="text-foreground font-bold text-lg leading-tight group-hover:text-gold transition-colors">
            {haircut.name}
          </h3>
        </div>
        <Scissors className="w-5 h-5 text-gold/40 group-hover:text-gold transition-colors flex-shrink-0 mt-1" />
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed flex-1">
        {haircut.description}
      </p>

      <div className="border-t border-border pt-4">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-gold font-black text-2xl">
              ${haircut.priceUSD} USD
            </div>
            {bcvRate > 0 && (
              <div className="text-muted-foreground text-sm">
                {formatVES(ves)} Bs.
              </div>
            )}
          </div>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="service.primary_button"
          className="flex items-center justify-center gap-2 w-full bg-whatsapp hover:bg-whatsapp-dark text-white font-bold py-2.5 rounded text-sm tracking-wider uppercase transition-colors"
        >
          <SiWhatsapp className="w-4 h-4" />
          RESERVAR
        </a>
      </div>
    </motion.div>
  );
}

// --- Services Section ---
function ServicesSection() {
  const { data: haircuts, isLoading } = useHaircuts();
  const { data: bcvRate = 0 } = useBCVRate();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = [
    { key: "all", label: "Todos" },
    { key: Category.basic, label: "Básicos" },
    { key: Category.intermediate, label: "Intermedios" },
    { key: Category.trend, label: "Tendencias" },
  ];

  const filtered =
    haircuts?.filter((h) => {
      if (activeFilter === "all") return true;
      const catKey =
        typeof h.category === "object"
          ? Object.keys(h.category)[0]
          : String(h.category);
      return catKey === activeFilter;
    }) ?? [];

  return (
    <section id="servicios" className="py-24 bg-carbon">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase">
              Nuestros Servicios
            </span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-foreground">
            Menú de <span className="text-gold">Cortes</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Desde el corte clásico hasta las últimas tendencias. Precios en USD
            y Bolívares.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveFilter(cat.key)}
              data-ocid="services.tab"
              className={`px-4 py-2 rounded text-sm font-bold tracking-wider uppercase border transition-colors ${
                activeFilter === cat.key
                  ? "bg-gold border-gold text-carbon"
                  : "border-border text-muted-foreground hover:border-gold/50 hover:text-gold"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="services.loading_state"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
              <Skeleton key={i} className="h-64 rounded-lg bg-carbon-card" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((h, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: stable order from backend
              <ServiceCard key={i} haircut={h} bcvRate={bcvRate} />
            ))}
            {filtered.length === 0 && (
              <div
                className="col-span-full text-center py-12 text-muted-foreground"
                data-ocid="services.empty_state"
              >
                No hay servicios en esta categoría.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// --- Gallery Section ---
const galleryPhotos = [
  {
    src: "/assets/uploads/1774583113813-019d302d-cdad-717a-874a-2ccd3590ad6b-1.jpg",
    alt: "Fade con color rubio/plateado",
    span: "row-span-2",
  },
  {
    src: "/assets/uploads/1774583138357-019d302d-cd46-74ca-9732-0a5142253d35-2.jpg",
    alt: "Crop texturizado con fade, vista lateral",
    span: "",
  },
  {
    src: "/assets/uploads/1774583063768-019d302d-cef4-713f-af22-85b330628472-3.jpg",
    alt: "Top texturizado con mid fade",
    span: "",
  },
  {
    src: "/assets/uploads/1774582969807-019d302d-cf4a-7152-8a95-afc68fe1eac1-4.jpg",
    alt: "Low fade vista trasera",
    span: "",
  },
  {
    src: "/assets/uploads/1774583154749-019d302d-d01c-73ec-8165-364075bd6eb6-5.jpg",
    alt: "Low skin fade al aire libre",
    span: "row-span-2",
  },
  {
    src: "/assets/uploads/1774583048287-019d302d-d00f-72d0-8dbf-9f4fca36abe4-6.jpg",
    alt: "Top rizado con fade, vista trasera",
    span: "",
  },
  {
    src: "/assets/uploads/screenshot_20260325-103849-019d302d-d042-7579-a981-742c156838b8-7.jpg",
    alt: "Rizado texturizado con fade, vista lateral",
    span: "",
  },
];

function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="galeria" className="py-24 bg-carbon-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase">
              Trabajos Reales
            </span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-foreground">
            Galería de <span className="text-gold">Trabajos</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Cortes reales realizados por Yelier
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          data-ocid="gallery.list"
        >
          {galleryPhotos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              data-ocid={`gallery.item.${i + 1}`}
              className="break-inside-avoid mb-4 group cursor-pointer"
              onClick={() => setSelected(i)}
            >
              <div className="relative overflow-hidden rounded-xl border border-border hover:border-gold/60 transition-all duration-300 shadow-md hover:shadow-gold/20 hover:shadow-lg">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full object-cover block transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-semibold uppercase tracking-wider">
                    {photo.alt}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="gallery.primary_button"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-carbon font-bold px-8 py-4 rounded uppercase tracking-widest text-sm transition-colors"
          >
            <SiWhatsapp className="w-4 h-4" />
            QUIERO UN CORTE ASÍ
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-white/70 hover:text-gold transition-colors"
              onClick={() => setSelected(null)}
              aria-label="Cerrar"
              data-ocid="gallery.close_button"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              src={galleryPhotos[selected].src}
              alt={galleryPhotos[selected].alt}
              className="max-h-[90vh] max-w-full rounded-xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// --- Testimonials Section ---
const testimonials = [
  {
    name: "Carlos M.",
    review:
      "El mejor fade que me han hecho, muy limpio y preciso. 100% recomendado 🔥",
    stars: 5,
  },
  {
    name: "Andrés R.",
    review:
      "Yelier es un crack, fui a domicilio y llegó puntual. El corte quedó espectacular.",
    stars: 5,
  },
  {
    name: "Luis G.",
    review:
      "Me hizo el color y el fade, quedé impresionado. Precio justo al BCV.",
    stars: 5,
  },
  {
    name: "Miguel T.",
    review: "Siempre salgo satisfecho. Ya llevo 6 meses siendo cliente fijo.",
    stars: 5,
  },
];

function TestimonialsSection() {
  return (
    <section id="testimonios" className="py-24 bg-carbon">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase">
              Clientes Satisfechos
            </span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-foreground">
            Lo que dicen nuestros <span className="text-gold">clientes</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            La satisfacción de nuestros clientes habla por sí sola.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          data-ocid="testimonials.list"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`testimonials.item.${i + 1}`}
              className="bg-carbon-card border border-border rounded-xl p-6 flex flex-col gap-4 hover:border-gold/40 transition-colors"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, s) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: fixed star count
                  <Star key={s} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="border-t border-border pt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-black text-sm">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">
                    {t.name}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Cliente verificado
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- BCV Calculator ---
function BCVCalculator() {
  const { data: bcvRate = 0, isLoading } = useBCVRate();
  const [usdInput, setUsdInput] = useState("");
  const [vesInput, setVesInput] = useState("");

  const handleUSDChange = (val: string) => {
    setUsdInput(val);
    const n = Number.parseFloat(val);
    if (!Number.isNaN(n) && bcvRate > 0) {
      setVesInput(formatVES(n * bcvRate));
    } else {
      setVesInput("");
    }
  };

  const handleVESChange = (val: string) => {
    const cleaned = val.replace(/[.\s]/g, "").replace(",", ".");
    setVesInput(val);
    const n = Number.parseFloat(cleaned);
    if (!Number.isNaN(n) && bcvRate > 0) {
      setUsdInput((n / bcvRate).toFixed(2));
    } else {
      setUsdInput("");
    }
  };

  return (
    <section id="calculadora" className="py-24 bg-carbon-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase">
              Calculadora BCV
            </span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-foreground">
            Precios en <span className="text-gold">Bolívares</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Convierte los precios según la tasa oficial del BCV
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-carbon border border-border rounded-xl p-8 shadow-gold"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-gold" />
              </div>
              <div>
                <div className="font-bold text-foreground">
                  Calculadora de Precios BCV
                </div>
                {isLoading ? (
                  <Skeleton className="h-4 w-40 mt-1 bg-carbon-card" />
                ) : (
                  <div className="text-sm text-gold font-semibold">
                    Tasa actual: 1 USD ={" "}
                    {bcvRate > 0 ? formatVES(bcvRate) : "—"} Bs.
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="usd-input"
                  className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2"
                >
                  Monto en USD ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold font-bold">
                    $
                  </span>
                  <input
                    id="usd-input"
                    type="number"
                    min="0"
                    value={usdInput}
                    onChange={(e) => handleUSDChange(e.target.value)}
                    placeholder="0.00"
                    data-ocid="calculator.input"
                    className="w-full bg-input border border-border rounded px-8 py-3 text-foreground font-semibold placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold text-xs font-bold">⇅</span>
                </div>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div>
                <label
                  htmlFor="ves-input"
                  className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2"
                >
                  Equivalente en Bolívares (Bs.)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold">
                    Bs.
                  </span>
                  <input
                    id="ves-input"
                    type="text"
                    value={vesInput}
                    onChange={(e) => handleVESChange(e.target.value)}
                    placeholder="0,00"
                    data-ocid="calculator.input"
                    className="w-full bg-input border border-border rounded pl-12 pr-4 py-3 text-foreground font-semibold placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-4 text-center">
              ✦ Tasa BCV actualizada regularmente
            </p>

            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="calculator.primary_button"
              className="flex items-center justify-center gap-2 w-full bg-whatsapp hover:bg-whatsapp-dark text-white font-bold py-3 rounded mt-6 tracking-wider uppercase transition-colors"
            >
              <SiWhatsapp className="w-4 h-4" />
              RESERVAR AHORA
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- About Section ---
function AboutSection() {
  const highlights = [
    {
      icon: Home,
      label: "A Domicilio",
      desc: "Voy hasta donde estés en Caracas",
    },
    {
      icon: Building,
      label: "Desde Mi Apartamento",
      desc: "Espacio cómodo y equipado",
    },
    {
      icon: Calculator,
      label: "Precios BCV",
      desc: "Siempre al tipo de cambio oficial",
    },
    {
      icon: Star,
      label: "Servicio Personalizado",
      desc: "Tu estilo, tu decisión",
    },
  ];

  return (
    <section id="sobre-mi" className="py-24 bg-carbon">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[3/4] bg-carbon-card rounded-2xl border border-border overflow-hidden relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                <div className="w-32 h-32 rounded-full bg-gold/10 border-2 border-gold/40 flex items-center justify-center">
                  <Scissors className="w-16 h-16 text-gold" />
                </div>
                <div className="text-center">
                  <div className="text-gold font-black text-2xl uppercase tracking-widest">
                    Yelier
                  </div>
                  <div className="text-muted-foreground text-sm tracking-wider uppercase mt-1">
                    Tu Barbero
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
              <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-gold/30 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-gold/30 rounded-bl-lg" />
            </div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
              className="absolute -bottom-6 -right-6 bg-gold text-carbon font-black px-4 py-3 rounded-xl shadow-lg"
            >
              <div className="text-xs uppercase tracking-wider">
                Especialista
              </div>
              <div className="text-sm">✂ Profesional</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase">
                Sobre Mí
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-6">
              Conoce a <span className="text-gold">Yelier</span>:<br />
              <span className="text-2xl sm:text-3xl">
                Tu Barbero de Confianza
              </span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Soy Yelier, un barbero en formación profesional apasionado por los
              cortes modernos. Comencé practicando con mis amigos del liceo y la
              universidad, y desde ese primer corte supe que esto era mi
              vocación.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Hoy ofrezco mis servicios a domicilio y desde mi apartamento en
              Caracas, llevando precisión y estilo directamente a donde estés.
              Mi compromiso es que salgas siempre con el mejor look.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-4 bg-carbon-card border border-border rounded-lg hover:border-gold/40 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">
                      {label}
                    </div>
                    <div className="text-muted-foreground text-xs mt-0.5">
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Contact / CTA ---
function ContactSection() {
  return (
    <section
      id="contacto"
      className="py-24 bg-carbon-light relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Sparkles className="w-10 h-10 text-gold mx-auto mb-6" />
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            ¿Listo para tu <span className="text-gold">próximo corte</span>?
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Escríbeme por WhatsApp y coordinamos tu cita al instante.
          </p>

          <a
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.primary_button"
            className="inline-flex items-center gap-3 bg-whatsapp hover:bg-whatsapp-dark text-white font-black text-lg px-10 py-5 rounded-xl tracking-widest uppercase transition-colors shadow-lg mb-12"
          >
            <SiWhatsapp className="w-6 h-6" />
            ESCRIBIR A WHATSAPP
          </a>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-4">
            <div className="flex flex-col items-center gap-2 p-5 bg-carbon border border-border rounded-xl">
              <Phone className="w-6 h-6 text-gold" />
              <div className="font-bold text-sm text-foreground">Teléfono</div>
              <div className="text-muted-foreground text-sm">
                +58 0426 6137046
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 p-5 bg-carbon border border-border rounded-xl">
              <MapPin className="w-6 h-6 text-gold" />
              <div className="font-bold text-sm text-foreground">Ubicación</div>
              <div className="text-muted-foreground text-sm">
                Caracas, Venezuela
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 p-5 bg-carbon border border-border rounded-xl">
              <Clock className="w-6 h-6 text-gold" />
              <div className="font-bold text-sm text-foreground">Horario</div>
              <div className="text-muted-foreground text-sm">
                Lun – Sáb · 9AM – 7PM
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 p-5 bg-carbon border border-border rounded-xl">
              <Mail className="w-6 h-6 text-gold" />
              <div className="font-bold text-sm text-foreground">Correo</div>
              <a
                href="mailto:yelierhernandez3550@gmail.com"
                className="text-muted-foreground text-sm hover:text-gold transition-colors break-all text-center"
              >
                yelierhernandez3550@gmail.com
              </a>
            </div>
            <div className="flex flex-col items-center gap-2 p-5 bg-carbon border border-border rounded-xl">
              <CreditCard className="w-6 h-6 text-gold" />
              <div className="font-bold text-sm text-foreground">
                Pago Móvil
              </div>
              <div className="text-muted-foreground text-sm text-center space-y-0.5">
                <div>Banco de Venezuela</div>
                <div>Código: 0102</div>
                <div>C.I.: V-31114170</div>
                <div>Tel: 0426 6137046</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-carbon border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="w-5 h-5 text-gold" />
              <span className="text-gold font-black text-lg tracking-widest uppercase">
                YilerthBarber
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Barbería profesional a domicilio y en apartamento. Cortes modernos
              en Caracas, Venezuela.
            </p>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-gold mb-4">
              Navegación
            </div>
            <ul className="space-y-2">
              {[
                ["Inicio", "#inicio"],
                ["Servicios", "#servicios"],
                ["Galería", "#galeria"],
                ["Testimonios", "#testimonios"],
                ["Calculadora BCV", "#calculadora"],
                ["Sobre Mí", "#sobre-mi"],
                ["Contacto", "#contacto"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-muted-foreground hover:text-gold text-sm transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-gold mb-4">
              Contacto
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <SiWhatsapp className="w-4 h-4 text-whatsapp flex-shrink-0" />
                <a
                  href={WA_GENERAL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  +58 0426 6137046
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                Caracas, Venezuela
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                Lun – Sáb · 9:00 AM – 7:00 PM
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href="mailto:yelierhernandez3550@gmail.com"
                  className="hover:text-gold transition-colors break-all"
                >
                  yelierhernandez3550@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <CreditCard className="w-4 h-4 text-gold flex-shrink-0" />
                Banco de Venezuela · 0102
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {year} YilerthBarber · Todos los derechos reservados
          </p>
          <p className="text-muted-foreground text-xs">
            Hecho con ❤️ usando{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// --- Floating WhatsApp Button ---
function FloatingWhatsApp() {
  return (
    <motion.a
      href={WA_GENERAL}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="floating.primary_button"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-whatsapp hover:bg-whatsapp-dark rounded-full flex items-center justify-center shadow-lg shadow-black/40 transition-colors"
      aria-label="Contactar por WhatsApp"
    >
      <SiWhatsapp className="w-7 h-7 text-white" />
    </motion.a>
  );
}

// --- Main App ---
export default function App() {
  return (
    <div className="min-h-screen bg-background font-montserrat">
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <GallerySection />
        <TestimonialsSection />
        <BCVCalculator />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
