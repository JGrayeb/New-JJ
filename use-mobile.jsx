
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Clock, Users, Dumbbell } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/* ─── Schema: Service + LocalBusiness for /clases ───────────────────────── */
const CLASES_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Clases de Método Lagree',
  provider: {
    '@type': 'ExerciseGym',
    name: 'JJStudio',
    url: 'https://jjstudio.mx',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Constituyentes 123, Centro',
      addressLocality: 'Querétaro',
      addressRegion: 'Querétaro',
      postalCode: '76000',
      addressCountry: 'MX',
    },
    telephone: '+52-442-123-4567',
  },
  areaServed: { '@type': 'City', name: 'Querétaro' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Modalidades de clases',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Clases Regulares de Método Lagree',
          description:
            'Sesiones grupales de máximo 7 personas. Ambiente motivador con atención personalizada. Lunes a Viernes 6:00–21:00 hrs.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Clases Privadas de Método Lagree',
          description:
            'Entrenamiento uno a uno completamente personalizado. Atención exclusiva del instructor con horarios flexibles.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Bootcamp Lagree Querétaro',
          description:
            'Programa intensivo de 4 semanas con seguimiento nutricional y resultados garantizados.',
        },
      },
    ],
  },
};

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://jjstudio.mx' },
    { '@type': 'ListItem', position: 2, name: 'Clases', item: 'https://jjstudio.mx/clases' },
  ],
};

/* ─── Shared style tokens ────────────────────────────────────────────────── */
const C = {
  bg:        '#0a0a0a',
  bgMuted:   '#111111',
  bgCard:    '#1a1a1a',
  bgAccent:  '#2a1010',   // subtle red-tinted background for benefit box
  red:       '#e53e3e',
  white:     '#ffffff',
  grey:      '#a0aec0',
  greyLight: '#cbd5e0',
  greyFaint: '#718096',
};

const ClasesPage = () => {
  const classTypes = [
    {
      name: 'Clases Regulares',
      icon: Users,
      description:
        'Sesiones grupales de máximo 7 personas. Ambiente motivador con atención personalizada en cada movimiento.',
      schedule: 'Lunes a Viernes: 6:00 a 11:00 y 17:00–21:00 hrs',
      duration: '50 minutos',
      features: ['Grupos reducidos', 'Todos los niveles', 'Equipamiento premium'],
    },
    {
      name: 'Clases Privadas',
      icon: Dumbbell,
      description:
        'Entrenamiento uno a uno completamente personalizado. Atención exclusiva del instructor certificado en Método Lagree.',
      schedule: 'Horarios flexibles con reserva previa',
      duration: '50 minutos',
      features: ['Atención exclusiva', 'Plan personalizado', 'Horario flexible'],
    },
    {
      name: 'Bootcamp',
      icon: Clock,
      description:
        'Programas intensivos de 4 semanas. Resultados acelerados con seguimiento nutricional y corporal.',
      schedule: 'Inicio cada mes — Consultar fechas disponibles',
      duration: '4 semanas',
      features: ['Programa integral', 'Seguimiento nutricional', 'Resultados garantizados'],
    },
  ];

  const benefits = [
    'Aumento de fuerza muscular en 4–6 semanas',
    'Mejora de postura y alineación corporal',
    'Reducción de grasa corporal y definición muscular',
    'Mayor flexibilidad y rango de movimiento',
    'Fortalecimiento del core y estabilidad',
    'Bajo impacto en articulaciones',
  ];

  return (
    <>
      <Helmet>
        {/* ── Core meta ──────────────────────────────────────────────────── */}
        <html lang="es-MX" />
        <title>Clases de Método Lagree en Querétaro | JJStudio</title>
        <meta
          name="description"
          content="Clases regulares, privadas y bootcamp de Método Lagree en Querétaro. Grupos de máximo 7 personas, Megaformer e instructores certificados. Agenda tu clase de prueba en JJStudio."
        />
        <meta
          name="keywords"
          content="clases lagree querétaro, método lagree queretaro, clases privadas lagree, bootcamp lagree, megaformer queretaro, fitness boutique queretaro, jjstudio clases"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jjstudio.mx/clases" />

        {/* ── Open Graph ─────────────────────────────────────────────────── */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="JJStudio" />
        <meta property="og:title" content="Clases de Método Lagree en Querétaro | JJStudio" />
        <meta
          property="og:description"
          content="Clases regulares, privadas y bootcamp de Método Lagree en Querétaro. Grupos máx. 7 personas, Megaformer e instructores certificados."
        />
        <meta property="og:url" content="https://jjstudio.mx/clases" />
        <meta
          property="og:image"
          content="https://jjstudio.mx/og-clases.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Clases de Método Lagree en JJStudio Querétaro" />

        {/* ── Twitter Card ───────────────────────────────────────────────── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Clases de Método Lagree en Querétaro | JJStudio" />
        <meta
          name="twitter:description"
          content="Clases regulares, privadas y bootcamp de Método Lagree en Querétaro. Grupos máx. 7 personas, Megaformer e instructores certificados."
        />
        <meta name="twitter:image" content="https://jjstudio.mx/og-clases.jpg" />

        {/* ── Structured Data ────────────────────────────────────────────── */}
        <script type="application/ld+json">{JSON.stringify(CLASES_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(BREADCRUMB_SCHEMA)}</script>
      </Helmet>

      <div style={{ minHeight: '100vh', backgroundColor: C.bg }}>
        <Header />

        {/* ── PAGE HERO ── */}
        <section
          aria-label="Clases de Método Lagree en JJStudio Querétaro"
          style={{ padding: '5rem 0', backgroundColor: C.bgMuted }}
        >
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto' }}
            >
              {/* H1 — keyword-targeted */}
              <h1
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 700,
                  color: C.white,
                  letterSpacing: '-0.02em',
                  marginBottom: '1.5rem',
                }}
              >
                Clases de Método Lagree
                <span style={{ display: 'block', color: C.red, marginTop: '0.4rem' }}>
                  en Querétaro
                </span>
              </h1>
              <p style={{ fontSize: '1.125rem', color: C.grey, lineHeight: 1.7 }}>
                Elige la modalidad que mejor se adapte a tus objetivos.
                Grupos reducidos, Megaformer e instructores certificados en JJStudio.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── WHAT IS LAGREE + BENEFITS ── */}
        <section
          aria-label="Qué es el Método Lagree y sus beneficios"
          style={{ padding: '5rem 0', backgroundColor: C.bg }}
        >
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '3rem',
                marginBottom: '5rem',
              }}
            >
              {/* Left: explanation */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 700,
                    color: C.white,
                    marginBottom: '1.5rem',
                  }}
                >
                  ¿Qué es el Método Lagree?
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    'El Método Lagree es un sistema de entrenamiento revolucionario que combina fuerza, resistencia, flexibilidad y equilibrio en una sola sesión de 50 minutos.',
                    'Utilizando el Megaformer, una máquina patentada diseñada específicamente para este método, trabajamos cada grupo muscular de forma controlada y efectiva, logrando resultados que otros entrenamientos tardan meses en conseguir.',
                    'A diferencia del Pilates tradicional, el Método Lagree se enfoca en movimientos lentos y controlados bajo tensión constante, generando activación muscular profunda sin impacto en las articulaciones.',
                  ].map((text, i) => (
                    <p key={i} style={{ color: C.greyLight, lineHeight: 1.8, margin: 0 }}>
                      {text}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Right: benefits list */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  backgroundColor: C.bgCard,
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: `1px solid ${C.bgAccent}`,
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: C.white,
                    marginBottom: '1.5rem',
                  }}
                >
                  Beneficios comprobados
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {benefits.map((benefit, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '1.5rem',
                          height: '1.5rem',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(229,62,62,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        <div
                          style={{
                            width: '0.5rem',
                            height: '0.5rem',
                            borderRadius: '50%',
                            backgroundColor: C.red,
                          }}
                        />
                      </div>
                      <span style={{ color: C.greyLight, lineHeight: 1.6 }}>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* ── CLASS TYPES ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
              <h2
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 700,
                  color: C.white,
                  marginBottom: '1rem',
                }}
              >
                Tipos de clases
              </h2>
              <p style={{ fontSize: '1.125rem', color: C.grey }}>
                Encuentra la modalidad perfecta para ti en JJStudio Querétaro
              </p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {classTypes.map((classType, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  aria-label={`${classType.name} – Método Lagree Querétaro`}
                  style={{
                    backgroundColor: C.bgCard,
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: '2rem',
                      padding: '2rem',
                    }}
                  >
                    {/* Left: info */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div
                          style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '0.75rem',
                            backgroundColor: 'rgba(229,62,62,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <classType.icon size={28} color={C.red} />
                        </div>
                        <h3
                          style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            color: C.white,
                            margin: 0,
                          }}
                        >
                          {classType.name}
                        </h3>
                      </div>

                      <p style={{ color: C.grey, lineHeight: 1.7, marginBottom: '1.5rem' }}>
                        {classType.description}
                      </p>

                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {classType.features.map((feature, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div
                              style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: C.red,
                                flexShrink: 0,
                              }}
                            />
                            <span style={{ fontSize: '0.9rem', color: C.greyLight }}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: schedule box */}
                    <div
                      style={{
                        backgroundColor: '#111111',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.25rem',
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: C.red,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            display: 'block',
                            marginBottom: '0.5rem',
                          }}
                        >
                          Horarios
                        </span>
                        <p style={{ color: C.greyLight, margin: 0, lineHeight: 1.6 }}>
                          {classType.schedule}
                        </p>
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: C.red,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            display: 'block',
                            marginBottom: '0.5rem',
                          }}
                        >
                          Duración
                        </span>
                        <p style={{ color: C.greyLight, margin: 0 }}>{classType.duration}</p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOUTIQUE EXPERIENCE ── */}
        <section
          aria-label="Experiencia boutique JJStudio"
          style={{ padding: '5rem 0', backgroundColor: C.bgMuted }}
        >
          <div
            style={{
              maxWidth: '48rem',
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
                  color: C.white,
                  marginBottom: '1.5rem',
                }}
              >
                La experiencia boutique
              </h2>
              <p style={{ fontSize: '1.125rem', color: C.grey, lineHeight: 1.8 }}>
                En JJStudio, cada detalle está diseñado para tu comodidad.
                Instalaciones premium, vestidores equipados, regaderas privadas,
                amenidades de lujo y un ambiente que inspira tu mejor versión en Querétaro.
              </p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ClasesPage;
