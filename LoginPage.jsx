
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Target, Award, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BenefitCard from '@/components/BenefitCard';
import { Button } from '@/components/ui/button';

/* ─── LocalBusiness + ExerciseGym Schema ─────────────────────────────────── */
const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['ExerciseGym', 'LocalBusiness'],
  name: 'JJStudio',
  url: 'https://jjstudio.mx',
  logo: 'https://jjstudio.mx/logo.png',
  image:
    'https://horizons-cdn.hostinger.com/48e981b5-e40f-4be5-80e0-3e901da14182/imagen_2026-05-18_174008301-YlPvQ.png',
  description:
    'Studio boutique de Método Lagree en Querétaro. Grupos de máximo 8 personas, Megaformer de última generación e instructores certificados.',
  telephone: '+52-442-123-4567',
  email: 'contacto@jjstudio.mx',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Constituyentes 123, Centro',
    addressLocality: 'Querétaro',
    addressRegion: 'Querétaro',
    postalCode: '76000',
    addressCountry: 'MX',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '20.5888',
    longitude: '-100.3899',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '06:00',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '14:00',
    },
  ],
  priceRange: '$$',
  currenciesAccepted: 'MXN',
  paymentAccepted: 'Cash, Credit Card',
  areaServed: {
    '@type': 'City',
    name: 'Querétaro',
  },
  sameAs: [
    'https://www.instagram.com/jjstudio.mx',
    'https://www.facebook.com/jjstudio.mx',
  ],
};

/* ─── WebPage / BreadcrumbList Schema ────────────────────────────────────── */
const WEBPAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Método Lagree Querétaro | Clases Boutique – JJStudio',
  url: 'https://jjstudio.mx',
  description:
    'Studio boutique de Método Lagree en Querétaro. Grupos de máximo 8 personas, Megaformer e instructores certificados. Primera clase de prueba disponible.',
  inLanguage: 'es-MX',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://jjstudio.mx',
      },
    ],
  },
};

const HomePage = () => {
  const benefits = [
    {
      icon: Zap,
      title: 'Bajo impacto, alta intensidad',
      description:
        'Entrenamiento que protege tus articulaciones mientras maximiza resultados. Perfecto para profesionistas que buscan eficiencia sin lesiones.',
    },
    {
      icon: Target,
      title: 'Activación muscular profunda',
      description:
        'Trabaja músculos estabilizadores que otros métodos no alcanzan. Cada sesión activa más del 87% de tus fibras musculares.',
    },
    {
      icon: TrendingUp,
      title: 'Resultados medibles',
      description:
        'Progreso visible en 4–6 semanas. Aumento de fuerza, definición muscular y resistencia cardiovascular comprobados.',
    },
    {
      icon: Award,
      title: 'Atención personalizada',
      description:
        'Grupos reducidos de máximo 8 personas. Cada movimiento es supervisado por instructores certificados en Método Lagree.',
    },
  ];

  const pillars = [
    {
      title: 'Exclusividad',
      description:
        'Ambiente boutique diseñado para profesionistas. Equipamiento Megaformer de última generación en instalaciones premium.',
    },
    {
      title: 'Intensidad',
      description:
        'Sesiones de 50 minutos que equivalen a 2 horas de entrenamiento tradicional. Máxima eficiencia para agendas ocupadas.',
    },
    {
      title: 'Resultados',
      description:
        'Transformación corporal integral: fuerza, flexibilidad, resistencia y definición muscular en un solo método.',
    },
  ];

  return (
    <>
      <Helmet>
        {/* ── Core meta ───────────────────────────────────────────────────── */}
        <html lang="es-MX" />
        <title>Método Lagree Querétaro | Clases Boutique – JJStudio</title>
        <meta
          name="description"
          content="Studio boutique de Método Lagree en Querétaro. Grupos de máximo 8 personas, Megaformer e instructores certificados. Primera clase de prueba disponible. Av. Constituyentes, Centro."
        />
        <meta
          name="keywords"
          content="método lagree querétaro, lagree queretaro, clases lagree queretaro, studio boutique fitness queretaro, megaformer queretaro, pilates reformer queretaro, jjstudio"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jjstudio.mx" />

        {/* ── Open Graph (Facebook, WhatsApp, LinkedIn) ───────────────────── */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="JJStudio" />
        <meta
          property="og:title"
          content="Método Lagree Querétaro | Clases Boutique – JJStudio"
        />
        <meta
          property="og:description"
          content="Studio boutique de Método Lagree en Querétaro. Grupos de máximo 8 personas, Megaformer e instructores certificados. Primera clase de prueba disponible."
        />
        <meta property="og:url" content="https://jjstudio.mx" />
        <meta
          property="og:image"
          content="https://horizons-cdn.hostinger.com/48e981b5-e40f-4be5-80e0-3e901da14182/imagen_2026-05-18_174008301-YlPvQ.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Studio boutique JJStudio – Método Lagree en Querétaro"
        />

        {/* ── Twitter / X Card ────────────────────────────────────────────── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Método Lagree Querétaro | Clases Boutique – JJStudio"
        />
        <meta
          name="twitter:description"
          content="Studio boutique de Método Lagree en Querétaro. Grupos máximo 8 personas, Megaformer, instructores certificados."
        />
        <meta
          name="twitter:image"
          content="https://horizons-cdn.hostinger.com/48e981b5-e40f-4be5-80e0-3e901da14182/imagen_2026-05-18_174008301-YlPvQ.png"
        />

        {/* ── Geo meta (extra local SEO signal) ───────────────────────────── */}
        <meta name="geo.region" content="MX-QUE" />
        <meta name="geo.placename" content="Querétaro" />
        <meta name="geo.position" content="20.5888;-100.3899" />
        <meta name="ICBM" content="20.5888, -100.3899" />

        {/* ── Structured Data ─────────────────────────────────────────────── */}
        <script type="application/ld+json">
          {JSON.stringify(LOCAL_BUSINESS_SCHEMA)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(WEBPAGE_SCHEMA)}
        </script>
      </Helmet>

      <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
        <Header />

        {/* ── HERO ── */}
        <section
          aria-label="Bienvenida – Método Lagree en Querétaro"
          style={{
            position: 'relative',
            minHeight: '100dvh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: 0 }}>
            {/*
              SEO FIX: alt text now contains the target keyword + location.
              Also added width/height to help CLS (Core Web Vitals).
            */}
            <img
              src="https://horizons-cdn.hostinger.com/48e981b5-e40f-4be5-80e0-3e901da14182/imagen_2026-05-18_174008301-YlPvQ.png"
              alt="Clases de Método Lagree en Querétaro – Studio boutique JJStudio con Megaformer"
              width="1920"
              height="1080"
              fetchpriority="high"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0.35) 100%)',
              }}
            />
          </div>

          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: '80rem',
              margin: '0 auto',
              padding: '5rem 1.5rem',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ maxWidth: '48rem' }}
            >
              {/*
                SEO FIX: H1 now targets the primary keyword "Método Lagree Querétaro"
                instead of just the brand name.
              */}
              <h1
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  marginBottom: '1.5rem',
                  textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                }}
              >
                Método Lagree
                <span
                  style={{
                    display: 'block',
                    color: '#e53e3e',
                    marginTop: '0.5rem',
                  }}
                >
                  en Querétaro
                </span>
              </h1>

              {/*
                SEO FIX: Subheading now includes brand name + key differentiators
                using natural language that matches search intent.
              */}
              <p
                style={{
                  fontSize: '1.25rem',
                  color: '#e2e8f0',
                  marginBottom: '1rem',
                  lineHeight: 1.6,
                  textShadow: '0 1px 6px rgba(0,0,0,0.5)',
                  fontWeight: 600,
                }}
              >
                JJStudio — Studio Boutique de Alto Rendimiento
              </p>
              <p
                style={{
                  fontSize: '1.1rem',
                  color: '#cbd5e0',
                  marginBottom: '2.5rem',
                  lineHeight: 1.6,
                  textShadow: '0 1px 6px rgba(0,0,0,0.5)',
                }}
              >
                Megaformer · Grupos de máximo 8 personas · Instructores certificados
                · Av. Constituyentes, Centro
              </p>

              <Link to="/clases" aria-label="Ver clases de Método Lagree en JJStudio Querétaro">
                <Button
                  size="lg"
                  style={{
                    backgroundColor: '#e53e3e',
                    color: '#ffffff',
                    fontSize: '1.125rem',
                    padding: '1.5rem 2rem',
                  }}
                >
                  Comienza tu transformación
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section
          aria-label="Beneficios del Método Lagree"
          style={{ padding: '6rem 0', backgroundColor: '#111111' }}
        >
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
              {/* H2 keeps secondary keyword "Método Lagree" for topical depth */}
              <h2
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '1rem',
                }}
              >
                El poder del Método Lagree
              </h2>
              <p
                style={{
                  fontSize: '1.125rem',
                  color: '#a0aec0',
                  maxWidth: '40rem',
                  margin: '0 auto',
                }}
              >
                Entrenamiento de bajo impacto y alta intensidad, científicamente
                diseñado para resultados medibles en Querétaro
              </p>
            </motion.div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
              }}
            >
              {benefits.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ── PILLARS ── */}
        <section
          aria-label="Por qué elegir JJStudio"
          style={{ padding: '6rem 0', backgroundColor: '#0a0a0a' }}
        >
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
              <h2
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '1rem',
                }}
              >
                Por qué JJStudio en Querétaro
              </h2>
              <p
                style={{
                  fontSize: '1.125rem',
                  color: '#a0aec0',
                  maxWidth: '40rem',
                  margin: '0 auto',
                }}
              >
                Tres pilares que definen nuestra experiencia boutique de fitness
              </p>
            </motion.div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '2rem',
              }}
            >
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    backgroundColor: '#1a1a1a',
                    borderRadius: '1rem',
                    padding: '2rem',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                  }}
                >
                  <div
                    style={{
                      width: '3rem',
                      height: '4px',
                      backgroundColor: '#e53e3e',
                      marginBottom: '1.5rem',
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      marginBottom: '1rem',
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p style={{ color: '#a0aec0', lineHeight: 1.7 }}>
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          aria-label="Agenda tu clase de prueba en JJStudio"
          style={{ padding: '6rem 0', backgroundColor: '#e53e3e' }}
        >
          <div
            style={{
              maxWidth: '56rem',
              margin: '0 auto',
              padding: '0 1.5rem',
              textAlign: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '1.5rem',
                }}
              >
                Únete a la comunidad JJStudio
              </h2>
              <p
                style={{
                  fontSize: '1.125rem',
                  color: 'rgba(255,255,255,0.9)',
                  maxWidth: '40rem',
                  margin: '0 auto 2.5rem',
                }}
              >
                Descubre por qué profesionistas de Querétaro eligen JJStudio
                para su transformación con Método Lagree
              </p>
              <Link
                to="/contacto"
                aria-label="Agendar clase de prueba de Método Lagree en JJStudio Querétaro"
              >
                <Button
                  size="lg"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#e53e3e',
                    fontSize: '1.125rem',
                    padding: '1.5rem 2rem',
                    fontWeight: 700,
                  }}
                >
                  Agenda tu clase de prueba
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
