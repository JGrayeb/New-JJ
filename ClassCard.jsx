
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

/* ─── Schema: ContactPage + LocalBusiness ───────────────────────────────── */
const CONTACT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contacto – JJStudio Querétaro',
  url: 'https://jjstudio.mx/contacto',
  description:
    'Contacta a JJStudio para agendar tu clase de prueba de Método Lagree en Querétaro. Teléfono, correo y ubicación.',
  mainEntity: {
    '@type': 'ExerciseGym',
    name: 'JJStudio',
    url: 'https://jjstudio.mx',
    telephone: '+5213318373447',
    email: 'administracion@jjstudio.mx',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Fracción #1 Supermanzana, La Purísima',
      addressLocality: 'Santiago de Querétaro',
      addressRegion: 'Querétaro',
      postalCode: '76146',
      addressCountry: 'MX',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '20.6340567',
      longitude: '-100.340924',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '06:00',
        closes: '14:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '17:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '14:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '12:00',
      },
    ],
  },
};

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio',   item: 'https://jjstudio.mx' },
    { '@type': 'ListItem', position: 2, name: 'Contacto', item: 'https://jjstudio.mx/contacto' },
  ],
};

/* ─── Shared color tokens ────────────────────────────────────────────────── */
const C = {
  bg:        '#0a0a0a',
  bgMuted:   '#111111',
  bgCard:    '#1a1a1a',
  red:       '#e53e3e',
  white:     '#ffffff',
  grey:      '#a0aec0',
  greyLight: '#cbd5e0',
  greyFaint: '#718096',
  inputBg:   '#1e1e1e',
  inputBorder: '#2d2d2d',
};

/* ─── Inline-override styles for shadcn Input / Textarea / Label ─────────── */
const fieldStyle = {
  backgroundColor: C.inputBg,
  color: C.white,
  border: `1px solid ${C.inputBorder}`,
  borderRadius: '0.5rem',
  padding: '0.6rem 0.85rem',
  fontSize: '1rem',
  width: '100%',
  outline: 'none',
  marginTop: '0.5rem',
  boxSizing: 'border-box',
};

const labelStyle = {
  color: C.greyLight,
  fontSize: '0.9rem',
  fontWeight: 500,
  display: 'block',
  marginBottom: '0.25rem',
};

const ContactoPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      toast.success('Mensaje enviado correctamente. Te contactaremos pronto.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsLoading(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      content: '+52 1 33 1837 3447',
      link: 'tel:+5213318373447',        // fixed: removed stray space after "tel:"
    },
    {
      icon: Mail,
      title: 'Correo',
      content: 'administracion@jjstudio.mx',
      link: 'mailto:administracion@jjstudio.mx', // fixed: was .com, now .mx
    },
    {
      icon: MapPin,
      title: 'Dirección',
      content:
        'Fracción #1 Supermanzana, La Purísima,\n76146 Santiago de Querétaro, Qro.',
    },
  ];

  const businessHours = [
    { day: 'Lunes – Viernes', hours: '6:00–14:00 / 17:00–21:00' },
    { day: 'Sábado',          hours: '8:00–14:00' },
    { day: 'Domingo',         hours: '9:00–12:00' },
  ];

  return (
    <>
      <Helmet>
        {/* ── Core meta ──────────────────────────────────────────────────── */}
        <html lang="es-MX" />
        <title>Contacto | Agenda tu Clase de Lagree en Querétaro – JJStudio</title>
        <meta
          name="description"
          content="Contacta a JJStudio para agendar tu clase de prueba de Método Lagree en Querétaro. Llámanos, escríbenos o visítanos en La Purísima, Santiago de Querétaro."
        />
        <meta
          name="keywords"
          content="contacto jjstudio, agendar clase lagree querétaro, teléfono jjstudio, dirección studio lagree queretaro, clase de prueba lagree"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jjstudio.mx/contacto" />

        {/* ── Open Graph ─────────────────────────────────────────────────── */}
        <meta property="og:type"        content="website" />
        <meta property="og:locale"      content="es_MX" />
        <meta property="og:site_name"   content="JJStudio" />
        <meta property="og:title"       content="Contacto | Agenda tu Clase de Lagree en Querétaro – JJStudio" />
        <meta property="og:description" content="Contacta a JJStudio para agendar tu clase de prueba de Método Lagree en Querétaro. Llámanos o escríbenos." />
        <meta property="og:url"         content="https://jjstudio.mx/contacto" />
        <meta property="og:image"       content="https://jjstudio.mx/og-contacto.jpg" />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt"   content="Contacto JJStudio – Método Lagree Querétaro" />

        {/* ── Twitter Card ───────────────────────────────────────────────── */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="Contacto | Agenda tu Clase de Lagree en Querétaro – JJStudio" />
        <meta name="twitter:description" content="Contacta a JJStudio para agendar tu clase de prueba de Método Lagree en Querétaro." />
        <meta name="twitter:image"       content="https://jjstudio.mx/og-contacto.jpg" />

        {/* ── Geo ────────────────────────────────────────────────────────── */}
        <meta name="geo.region"    content="MX-QUE" />
        <meta name="geo.placename" content="Santiago de Querétaro" />
        <meta name="geo.position"  content="20.6340567;-100.340924" />
        <meta name="ICBM"          content="20.6340567, -100.340924" />

        {/* ── Structured Data ────────────────────────────────────────────── */}
        <script type="application/ld+json">{JSON.stringify(CONTACT_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(BREADCRUMB_SCHEMA)}</script>
      </Helmet>

      <div style={{ minHeight: '100vh', backgroundColor: C.bg }}>
        <Header />

        {/* ── PAGE HERO ── */}
        <section
          aria-label="Contacto JJStudio Querétaro"
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
                  marginBottom: '1.25rem',
                }}
              >
                Agenda tu Clase de Prueba
                <span style={{ display: 'block', color: C.red, marginTop: '0.4rem' }}>
                  de Método Lagree en Querétaro
                </span>
              </h1>
              <p style={{ fontSize: '1.125rem', color: C.grey, lineHeight: 1.7 }}>
                Estamos aquí para responder tus preguntas y ayudarte a comenzar
                tu transformación en JJStudio
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── FORM + CONTACT INFO ── */}
        <section
          aria-label="Formulario de contacto e información"
          style={{ padding: '5rem 0', backgroundColor: C.bg }}
        >
          <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '3rem',
              }}
            >
              {/* ── LEFT: FORM ── */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 700,
                    color: C.white,
                    marginBottom: '2rem',
                  }}
                >
                  Envíanos un mensaje
                </h2>

                <form
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                  aria-label="Formulario de contacto JJStudio"
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="name" style={labelStyle}>Nombre completo</label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                      style={fieldStyle}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" style={labelStyle}>Correo electrónico</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="tu@email.com"
                      style={fieldStyle}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" style={labelStyle}>Teléfono</label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+52 442 123 4567"
                      style={fieldStyle}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" style={labelStyle}>Mensaje</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="¿En qué podemos ayudarte?"
                      style={{ ...fieldStyle, resize: 'vertical', lineHeight: 1.6 }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      backgroundColor: isLoading ? '#9b2c2c' : C.red,
                      color: C.white,
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.2s',
                      marginTop: '0.5rem',
                    }}
                  >
                    {isLoading ? 'Enviando...' : 'Enviar mensaje'}
                  </button>
                </form>
              </motion.div>

              {/* ── RIGHT: CONTACT INFO ── */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
              >
                {/* Contact details */}
                <div>
                  <h2
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                      fontWeight: 700,
                      color: C.white,
                      marginBottom: '2rem',
                    }}
                  >
                    Información de contacto
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {contactInfo.map((info, index) => (
                      <div
                        key={index}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
                      >
                        {/* Icon bubble */}
                        <div
                          style={{
                            width: '3rem',
                            height: '3rem',
                            borderRadius: '0.75rem',
                            backgroundColor: 'rgba(229,62,62,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <info.icon size={22} color={C.red} />
                        </div>

                        <div>
                          <span
                            style={{
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              color: C.red,
                              textTransform: 'uppercase',
                              letterSpacing: '0.07em',
                              display: 'block',
                              marginBottom: '0.3rem',
                            }}
                          >
                            {info.title}
                          </span>

                          {info.link ? (
                            <a
                              href={info.link}
                              style={{
                                color: C.greyLight,
                                textDecoration: 'none',
                                fontSize: '1rem',
                                lineHeight: 1.6,
                                transition: 'color 0.2s',
                              }}
                              onMouseEnter={(e) => (e.target.style.color = C.red)}
                              onMouseLeave={(e) => (e.target.style.color = C.greyLight)}
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p
                              style={{
                                color: C.greyLight,
                                margin: 0,
                                fontSize: '1rem',
                                lineHeight: 1.6,
                                whiteSpace: 'pre-line',
                              }}
                            >
                              {info.content}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business hours */}
                <div
                  style={{
                    backgroundColor: C.bgCard,
                    borderRadius: '1rem',
                    padding: '2rem',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <Clock size={22} color={C.red} />
                    <h3
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: C.white,
                        margin: 0,
                      }}
                    >
                      Horarios
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {businessHours.map((schedule, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingBottom: index < businessHours.length - 1 ? '0.75rem' : 0,
                          borderBottom:
                            index < businessHours.length - 1
                              ? '1px solid #2d2d2d'
                              : 'none',
                        }}
                      >
                        <span style={{ color: C.grey, fontSize: '0.95rem' }}>
                          {schedule.day}
                        </span>
                        <span
                          style={{
                            color: C.white,
                            fontWeight: 600,
                            fontSize: '0.95rem',
                          }}
                        >
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div
                  style={{
                    backgroundColor: C.bgCard,
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/place/Xentric+Lomas®/@20.6343177,-100.3410259,17z/data=!4m6!3m5!1s0x85d35d8c7c4df061:0xdaf1fedd1dc899c1!8m2!3d20.6340567!4d-100.340924!16s%2Fg%2F11srfz2wj4?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
                    width="100%"
                    height="300"
                    style={{ border: 0, display: 'block' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de JJStudio – Método Lagree en Querétaro"
                    aria-label="Mapa de ubicación de JJStudio en Santiago de Querétaro"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ContactoPage;
