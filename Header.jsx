import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import pb from '@/lib/pocketbaseClient';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClassCard from '@/components/ClassCard';
import { toast } from 'sonner';
import { Zap, Filter, Calendar, Users, Clock, ChevronRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─── SEO Schemas ────────────────────────────────────────────────────────── */
const PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Reserva tu Clase de Método Lagree en Querétaro | JJStudio',
  url: 'https://jjstudio.mx/registro-clases',
  description: 'Reserva tu lugar en clases de Método Lagree en Querétaro: regulares, privadas o bootcamp. Grupos de máximo 8 personas. JJStudio.',
  inLanguage: 'es-MX'
};
const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Clases de Método Lagree',
  provider: {
    '@type': 'ExerciseGym',
    name: 'JJStudio',
    url: 'https://jjstudio.mx'
  },
  areaServed: {
    '@type': 'City',
    name: 'Santiago de Querétaro'
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'MXN',
    availability: 'https://schema.org/InStock'
  }
};
const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{
    '@type': 'ListItem',
    position: 1,
    name: 'Inicio',
    item: 'https://jjstudio.mx'
  }, {
    '@type': 'ListItem',
    position: 2,
    name: 'Registro Clases',
    item: 'https://jjstudio.mx/registro-clases'
  }]
};

/* ─── Color tokens ───────────────────────────────────────────────────────── */
const C = {
  bg: '#0a0a0a',
  bgMuted: '#111111',
  bgCard: '#1a1a1a',
  red: '#e53e3e',
  redDim: 'rgba(229,62,62,0.12)',
  redBorder: 'rgba(229,62,62,0.3)',
  redDark: '#9b2c2c',
  white: '#ffffff',
  grey: '#a0aec0',
  greyLight: '#cbd5e0',
  greyFaint: '#4a5568',
  divider: '#2d2d2d',
  orange: '#dd6b20'
};

/* ─── Skeleton pulse ─────────────────────────────────────────────────────── */
const PULSE_STYLE = `
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
  .sk { animation: pulse 1.6s ease-in-out infinite; }
`;

/* ─── Class type filters ─────────────────────────────────────────────────── */
const CLASS_TYPES = ['Todas', 'Regular', 'Privada', 'Bootcamp'];

/* ─── Info strip items ───────────────────────────────────────────────────── */
const INFO_ITEMS = [{
  icon: Users,
  label: 'Máx. 8 personas por clase',
  color: C.red
}, {
  icon: Clock,
  label: 'Clases de 50 minutos',
  color: C.red
}, {
  icon: Calendar,
  label: 'Reserva con hasta 7 días antes',
  color: C.red
}, {
  icon: Zap,
  label: 'Resultados desde la 1ª sesión',
  color: C.red
}];
const RegistroClasesPage = () => {
  const {
    currentUser
  } = useAuth();
  const [classes, setClasses] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Todas');
  useEffect(() => {
    fetchData();
  }, [currentUser]);
  const fetchData = async () => {
    try {
      const [classesData, registrationsData] = await Promise.all([pb.collection('classes').getFullList({
        $autoCancel: false
      }), currentUser ? pb.collection('class_registrations').getFullList({
        filter: `user_id = "${currentUser.id}"`,
        $autoCancel: false
      }) : Promise.resolve([])]);
      setClasses(classesData);
      setRegistrations(registrationsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error al cargar las clases');
    } finally {
      setIsLoading(false);
    }
  };
  const handleRegister = async classItem => {
    if (!currentUser) {
      toast.error('Debes iniciar sesión para registrarte');
      return;
    }
    try {
      await pb.collection('class_registrations').create({
        user_id: currentUser.id,
        class_id: classItem.id,
        attended: false
      }, {
        $autoCancel: false
      });
      if (classItem.current_enrollment !== undefined && classItem.max_capacity) {
        await pb.collection('classes').update(classItem.id, {
          current_enrollment: (classItem.current_enrollment || 0) + 1
        }, {
          $autoCancel: false
        });
      }
      toast.success('¡Registro exitoso! Te esperamos en clase.');
      fetchData();
    } catch (error) {
      error.message.includes('duplicate') ? toast.error('Ya estás registrado en esta clase') : toast.error('Error al registrarse. Intenta de nuevo.');
    }
  };
  const isRegistered = classId => registrations.some(r => r.class_id === classId);
  const filteredClasses = activeFilter === 'Todas' ? classes : classes.filter(c => (c.type || '').toLowerCase() === activeFilter.toLowerCase());
  return <>
      <Helmet>
        <html lang="es-MX" />
        <title>Reserva tu Clase de Método Lagree en Querétaro | JJStudio</title>
        <meta name="description" content="Reserva tu lugar en clases de Método Lagree en Querétaro: regulares, privadas o bootcamp. Grupos pequeños, resultados reales. JJStudio." />
        <meta name="keywords" content="clases lagree queretaro, reservar clase lagree, clase regular lagree, bootcamp lagree queretaro, clase privada lagree, jjstudio queretaro" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://jjstudio.mx/registro-clases" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="JJStudio" />
        <meta property="og:title" content="Reserva tu Clase de Método Lagree en Querétaro | JJStudio" />
        <meta property="og:description" content="Reserva tu lugar en clases de Método Lagree en Querétaro: regulares, privadas o bootcamp." />
        <meta property="og:url" content="https://jjstudio.mx/registro-clases" />
        <meta property="og:image" content="https://jjstudio.mx/og-clases.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Clases de Método Lagree en JJStudio Querétaro" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Reserva tu Clase de Método Lagree en Querétaro | JJStudio" />
        <meta name="twitter:description" content="Reserva tu lugar en clases de Método Lagree en Querétaro." />
        <meta name="twitter:image" content="https://jjstudio.mx/og-clases.jpg" />

        {/* Structured data */}
        <script type="application/ld+json">{JSON.stringify(PAGE_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(SERVICE_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(BREADCRUMB_SCHEMA)}</script>

        <style>{PULSE_STYLE}</style>
      </Helmet>

      <div style={{
      minHeight: '100vh',
      backgroundColor: C.bg
    }}>
        <Header />

        {/* ── HERO ── */}
        <section aria-label="Registro de clases Método Lagree Querétaro" style={{
        padding: '5rem 0 4rem',
        backgroundColor: C.bgMuted,
        borderBottom: `1px solid ${C.divider}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
          {/* Decorative vertical bar */}
          <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '5px',
          height: '100%',
          background: `linear-gradient(to bottom, ${C.red}, transparent)`
        }} />

          {/* Background glow */}
          <div style={{
          position: 'absolute',
          top: '-6rem',
          right: '-6rem',
          width: '28rem',
          height: '28rem',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229,62,62,0.06) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

          <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1.5rem'
        }}>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} style={{
            textAlign: 'center',
            maxWidth: '50rem',
            margin: '0 auto'
          }}>
              {/* Eyebrow */}
              <span style={{
              display: 'inline-block',
              backgroundColor: C.redDim,
              border: `1px solid ${C.redBorder}`,
              color: C.red,
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '0.35rem 1rem',
              borderRadius: '9999px',
              marginBottom: '1.25rem'
            }}>
                Método Lagree · Querétaro
              </span>

              {/* H1 */}
              <h1 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: C.white,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '1.25rem'
            }}>
                Reserva tu Clase
                <span style={{
                display: 'block',
                color: C.red,
                marginTop: '0.3rem'
              }}>
                  de Método Lagree
                </span>
              </h1>

              <p style={{
              fontSize: '1.1rem',
              color: C.grey,
              lineHeight: 1.75,
              maxWidth: '38rem',
              margin: '0 auto 2.5rem'
            }}>
                Elige entre clases regulares, privadas o bootcamp. Grupos de máximo 7 personas para garantizar atención personalizada.
              </p>

              {/* CTA strip for guests */}
              {!currentUser && <motion.div initial={{
              opacity: 0,
              scale: 0.97
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: 0.3
            }} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              backgroundColor: 'rgba(229,62,62,0.1)',
              border: `1px solid ${C.redBorder}`,
              borderRadius: '0.75rem',
              padding: '0.75rem 1.25rem'
            }}>
                  <Lock size={15} color={C.red} />
                  <span style={{
                color: C.greyLight,
                fontSize: '0.9rem'
              }}>
                    <Link to="/auth" style={{
                  color: C.red,
                  fontWeight: 700,
                  textDecoration: 'none'
                }}>
                      Inicia sesión
                    </Link>{' '}
                    para reservar tu lugar en clase
                  </span>
                </motion.div>}
            </motion.div>

            {/* ── INFO STRIP ── */}
            <motion.div initial={{
            opacity: 0,
            y: 12
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.25
          }} style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '3rem'
          }}>
              {INFO_ITEMS.map((item, i) => <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: C.bgCard,
              border: `1px solid ${C.divider}`,
              borderRadius: '9999px',
              padding: '0.5rem 1rem'
            }}>
                  <item.icon size={14} color={item.color} />
                  <span style={{
                color: C.greyLight,
                fontSize: '0.8rem',
                fontWeight: 500
              }}>
                    {item.label}
                  </span>
                </div>)}
            </motion.div>
          </div>
        </section>

        {/* ── CLASSES SECTION ── */}
        <section aria-label="Listado de clases disponibles" style={{
        padding: '4rem 0 6rem',
        backgroundColor: C.bg
      }}>
          <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1.5rem'
        }}>

            {/* ── Filter bar ── */}
            <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap'
          }}>
              <Filter size={16} color={C.greyFaint} />
              <span style={{
              color: C.grey,
              fontSize: '0.85rem',
              fontWeight: 500
            }}>Filtrar:</span>
              {CLASS_TYPES.map(type => <button key={type} onClick={() => setActiveFilter(type)} style={{
              padding: '0.4rem 1.1rem',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: `1.5px solid ${activeFilter === type ? C.red : C.divider}`,
              backgroundColor: activeFilter === type ? C.redDim : 'transparent',
              color: activeFilter === type ? C.red : C.grey,
              transition: 'all 0.2s'
            }}>
                  {type}
                </button>)}
              {!isLoading && <span style={{
              marginLeft: 'auto',
              color: C.greyFaint,
              fontSize: '0.8rem'
            }}>
                  {filteredClasses.length} clase{filteredClasses.length !== 1 ? 's' : ''} disponible{filteredClasses.length !== 1 ? 's' : ''}
                </span>}
            </div>

            {/* ── Content ── */}
            {isLoading ? <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}>
                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="sk" style={{
              backgroundColor: C.bgCard,
              borderRadius: '1rem',
              height: '20rem',
              border: `1px solid ${C.divider}`
            }} />)}
              </div> : filteredClasses.length > 0 ? <motion.div initial="hidden" animate="visible" variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.07
              }
            }
          }} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}>
                {filteredClasses.map((classItem, index) => <motion.div key={classItem.id} variants={{
              hidden: {
                opacity: 0,
                y: 20
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.4
                }
              }
            }}>
                    {/* Wrapper that injects consistent dark styling around ClassCard */}
                    <div style={{
                backgroundColor: C.bgCard,
                borderRadius: '1rem',
                border: `1px solid ${C.divider}`,
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                transition: 'border-color 0.25s, transform 0.25s'
              }} onMouseEnter={e => {
                e.currentTarget.style.borderColor = C.red;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }} onMouseLeave={e => {
                e.currentTarget.style.borderColor = C.divider;
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                      <ClassCard classItem={classItem} index={index} onRegister={handleRegister} isRegistered={isRegistered(classItem.id)} />
                      {/* Red bottom accent bar */}
                      <div style={{
                  height: '3px',
                  background: isRegistered(classItem.id) ? `linear-gradient(to right, #38a169, transparent)` : `linear-gradient(to right, ${C.red}, transparent)`
                }} />
                    </div>
                  </motion.div>)}
              </motion.div> : (/* ── Empty state ── */
          <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} style={{
            textAlign: 'center',
            padding: '6rem 1rem'
          }}>
                <div style={{
              width: '5rem',
              height: '5rem',
              borderRadius: '50%',
              backgroundColor: C.redDim,
              border: `1px solid ${C.redBorder}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
                  <Calendar size={28} color={C.red} />
                </div>
                <p style={{
              color: C.greyLight,
              fontSize: '1.1rem',
              marginBottom: '0.5rem',
              fontWeight: 600
            }}>
                  {activeFilter === 'Todas' ? 'No hay clases disponibles por ahora' : `No hay clases "${activeFilter}" disponibles`}
                </p>
                <p style={{
              color: C.greyFaint,
              fontSize: '0.9rem',
              marginBottom: '1.75rem'
            }}>
                  Vuelve pronto o prueba otro tipo de clase
                </p>
                {activeFilter !== 'Todas' && <button onClick={() => setActiveFilter('Todas')} style={{
              backgroundColor: C.red,
              color: C.white,
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.7rem 1.5rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
                    Ver todas las clases <ChevronRight size={15} />
                  </button>}
              </motion.div>)}
          </div>
        </section>

        {/* ── BOTTOM CTA STRIP ── */}
        <section style={{
        backgroundColor: C.bgMuted,
        borderTop: `1px solid ${C.divider}`,
        padding: '3.5rem 0'
      }}>
          <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}>
            <div>
              <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              fontWeight: 700,
              color: C.white,
              margin: '0 0 0.4rem'
            }}>
                ¿Tienes dudas sobre qué clase elegir?
              </h2>
              <p style={{
              color: C.grey,
              fontSize: '0.92rem',
              margin: 0
            }}>
                Escríbenos y te ayudamos a encontrar la opción perfecta para ti.
              </p>
            </div>
            <Link to="/contacto" style={{
            textDecoration: 'none'
          }}>
              <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: C.red,
              color: C.white,
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.8rem 1.75rem',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'opacity 0.2s'
            }} onMouseEnter={e => e.currentTarget.style.opacity = '0.85'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                Contáctanos <ChevronRight size={16} />
              </button>
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>;
};
export default RegistroClasesPage;