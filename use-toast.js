
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar, User, LogOut, Edit, Zap, Clock, Star,
  AlertTriangle, TrendingUp, Lock, ChevronRight, Flame
} from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileEditForm from '@/components/ProfileEditForm';

/* ─── Color tokens ───────────────────────────────────────────────────────── */
const C = {
  bg:          '#0a0a0a',
  bgMuted:     '#111111',
  bgCard:      '#1a1a1a',
  bgCardHover: '#222222',
  red:         '#e53e3e',
  redDark:     '#9b2c2c',
  redGlow:     'rgba(229,62,62,0.15)',
  orange:      '#dd6b20',
  gold:        '#d69e2e',
  white:       '#ffffff',
  grey:        '#a0aec0',
  greyLight:   '#cbd5e0',
  greyFaint:   '#4a5568',
  border:      '#2d2d2d',
  success:     '#38a169',
};

/* ─── SEO schemas ────────────────────────────────────────────────────────── */
const DASHBOARD_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Mi Cuenta – JJStudio Método Lagree Querétaro',
  url: 'https://jjstudio.mx/dashboard',
  description: 'Gestiona tu perfil, clases y paquetes de Método Lagree en JJStudio Querétaro.',
  inLanguage: 'es-MX',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio',   item: 'https://jjstudio.mx' },
      { '@type': 'ListItem', position: 2, name: 'Mi Cuenta', item: 'https://jjstudio.mx/dashboard' },
    ],
  },
};

/* ─── Package data (dark-pattern upsell) ────────────────────────────────── */
const PACKAGES = [
  {
    id: 'starter',
    name: 'Paquete Inicio',
    classes: 4,
    price: 980,
    pricePerClass: 245,
    tag: null,
    color: C.grey,
    features: ['4 clases regulares', 'Vigencia 30 días', 'App de reservas'],
  },
  {
    id: 'popular',
    name: 'Paquete Premium',
    classes: 8,
    price: 1680,
    pricePerClass: 210,
    originalPrice: 1960,
    tag: '🔥 Más popular',
    color: C.red,
    features: ['8 clases regulares', 'Vigencia 45 días', 'App de reservas', '1 clase privada de regalo'],
  },
  {
    id: 'elite',
    name: 'Paquete Elite',
    classes: 16,
    price: 2880,
    pricePerClass: 180,
    originalPrice: 3920,
    tag: '⚡ Mejor valor',
    color: C.gold,
    features: ['16 clases regulares', 'Vigencia 60 días', 'App de reservas', '2 clases privadas', 'Seguimiento nutricional'],
  },
];

/* ─── Reusable card shell ────────────────────────────────────────────────── */
const DCard = ({ children, style = {} }) => (
  <div
    style={{
      backgroundColor: C.bgCard,
      borderRadius: '1rem',
      border: `1px solid ${C.border}`,
      overflow: 'hidden',
      ...style,
    }}
  >
    {children}
  </div>
);

const DCardHeader = ({ children }) => (
  <div
    style={{
      padding: '1.25rem 1.5rem',
      borderBottom: `1px solid ${C.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    {children}
  </div>
);

const DCardBody = ({ children, style = {} }) => (
  <div style={{ padding: '1.5rem', ...style }}>{children}</div>
);

/* ─── Urgency banner ─────────────────────────────────────────────────────── */
const UrgencyBanner = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    style={{
      backgroundColor: 'rgba(229,62,62,0.12)',
      border: `1px solid ${C.red}`,
      borderRadius: '0.75rem',
      padding: '0.85rem 1.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '2rem',
    }}
  >
    <Flame size={18} color={C.red} style={{ flexShrink: 0 }} />
    <p style={{ color: C.greyLight, fontSize: '0.92rem', margin: 0 }}>
      <strong style={{ color: C.red }}>Oferta por tiempo limitado:</strong>{' '}
      20% de descuento en el Paquete Elite hasta el domingo. ¡Solo quedan 3 lugares disponibles este mes!
    </p>
  </motion.div>
);

/* ─── Stats row ──────────────────────────────────────────────────────────── */
const StatsRow = ({ registrations }) => {
  const stats = [
    { label: 'Clases tomadas', value: registrations.length, icon: Calendar, color: C.red },
    { label: 'Clases restantes', value: 0, icon: Lock, color: C.orange, note: 'Compra un paquete' },
    { label: 'Racha actual', value: '—', icon: Flame, color: C.gold, note: 'Activa con paquete' },
    { label: 'Nivel', value: registrations.length < 4 ? 'Principiante' : 'Intermedio', icon: TrendingUp, color: C.success },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}
    >
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 * i }}
          style={{
            backgroundColor: C.bgCard,
            border: `1px solid ${C.border}`,
            borderRadius: '0.75rem',
            padding: '1.25rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              backgroundColor: `${s.color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem',
            }}
          >
            <s.icon size={16} color={s.color} />
          </div>
          <p style={{ fontSize: '1.4rem', fontWeight: 700, color: C.white, margin: '0 0 0.25rem' }}>
            {s.value}
          </p>
          <p style={{ fontSize: '0.75rem', color: C.grey, margin: 0 }}>{s.label}</p>
          {s.note && (
            <p style={{ fontSize: '0.7rem', color: s.color, margin: '0.25rem 0 0', fontWeight: 600 }}>
              {s.note}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
};

/* ─── Package card ───────────────────────────────────────────────────────── */
const PackageCard = ({ pkg, index }) => {
  const isPopular = pkg.id === 'popular';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 * index }}
      style={{
        backgroundColor: isPopular ? 'rgba(229,62,62,0.08)' : C.bgCard,
        border: `2px solid ${isPopular ? C.red : C.border}`,
        borderRadius: '1rem',
        padding: '1.5rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* Tag */}
      {pkg.tag && (
        <span
          style={{
            position: 'absolute',
            top: '-0.85rem',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: isPopular ? C.red : C.gold,
            color: C.white,
            fontSize: '0.72rem',
            fontWeight: 700,
            padding: '0.25rem 0.9rem',
            borderRadius: '999px',
            whiteSpace: 'nowrap',
          }}
        >
          {pkg.tag}
        </span>
      )}

      <div>
        <h3 style={{ color: C.white, fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', margin: '0 0 0.25rem' }}>
          {pkg.name}
        </h3>
        <p style={{ color: C.grey, fontSize: '0.82rem', margin: 0 }}>{pkg.classes} clases incluidas</p>
      </div>

      <div>
        {pkg.originalPrice && (
          <span style={{ color: C.greyFaint, fontSize: '0.85rem', textDecoration: 'line-through', display: 'block' }}>
            ${pkg.originalPrice.toLocaleString()} MXN
          </span>
        )}
        <span style={{ color: pkg.color, fontSize: '1.75rem', fontWeight: 800 }}>
          ${pkg.price.toLocaleString()}
        </span>
        <span style={{ color: C.grey, fontSize: '0.8rem' }}> MXN</span>
        <p style={{ color: C.greyFaint, fontSize: '0.75rem', margin: '0.2rem 0 0' }}>
          ${pkg.pricePerClass}/clase
        </p>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {pkg.features.map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: pkg.color, flexShrink: 0 }} />
            <span style={{ color: C.greyLight, fontSize: '0.82rem' }}>{f}</span>
          </li>
        ))}
      </ul>

      <Link to="/contacto" style={{ textDecoration: 'none', marginTop: 'auto' }}>
        <button
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: isPopular ? C.red : 'transparent',
            color: isPopular ? C.white : pkg.color,
            border: `1.5px solid ${isPopular ? C.red : pkg.color}`,
            borderRadius: '0.5rem',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Adquirir <ChevronRight size={15} />
        </button>
      </Link>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════ */
const DashboardPage = () => {
  const { currentUser, logout } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, [currentUser]);

  const fetchRegistrations = async () => {
    if (!currentUser) return;
    try {
      const records = await pb.collection('class_registrations').getFullList({
        filter: `user_id = "${currentUser.id}"`,
        expand: 'class_id',
        sort: '-registration_date',
        $autoCancel: false,
      });
      setRegistrations(records);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelRegistration = async (registrationId) => {
    try {
      await pb.collection('class_registrations').delete(registrationId, { $autoCancel: false });
      setRegistrations(registrations.filter((r) => r.id !== registrationId));
    } catch (error) {
      console.error('Error canceling registration:', error);
    }
  };

  return (
    <>
      <Helmet>
        <html lang="es-MX" />
        <title>Mi Cuenta | JJStudio – Método Lagree Querétaro</title>
        <meta
          name="description"
          content="Gestiona tu perfil, tus clases y tus paquetes de Método Lagree en JJStudio Querétaro. Consulta tu progreso y adquiere nuevas membresías."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://jjstudio.mx/dashboard" />
        <script type="application/ld+json">{JSON.stringify(DASHBOARD_SCHEMA)}</script>
      </Helmet>

      <div style={{ minHeight: '100vh', backgroundColor: C.bg }}>
        <Header />

        <section style={{ padding: '4rem 0 6rem' }}>
          <div style={{ maxWidth: '82rem', margin: '0 auto', padding: '0 1.5rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* ── TOP BAR ── */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '2rem',
                }}
              >
                <div>
                  <h1
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                      fontWeight: 700,
                      color: C.white,
                      margin: '0 0 0.35rem',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Hola, {currentUser?.name?.split(' ')[0] || 'Usuario'} 👋
                  </h1>
                  <p style={{ color: C.grey, margin: 0, fontSize: '0.95rem' }}>
                    Bienvenido a tu dashboard de JJStudio
                  </p>
                </div>
                <button
                  onClick={logout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.55rem 1rem',
                    backgroundColor: 'transparent',
                    color: C.grey,
                    border: `1px solid ${C.border}`,
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = C.red; e.currentTarget.style.borderColor = C.red; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = C.grey; e.currentTarget.style.borderColor = C.border; }}
                >
                  <LogOut size={15} />
                  Cerrar sesión
                </button>
              </div>

              {/* ── URGENCY BANNER ── */}
              <UrgencyBanner />

              {/* ── STATS ── */}
              <StatsRow registrations={registrations} />

              {/* ── MAIN GRID ── */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '1.5rem',
                  alignItems: 'start',
                }}
              >
                {/* ── LEFT COL: profile + quick actions ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                  {/* Profile card */}
                  <DCard>
                    <DCardHeader>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={17} color={C.red} />
                        <span style={{ color: C.white, fontWeight: 600, fontSize: '0.95rem' }}>Mi perfil</span>
                      </div>
                      {!isEditing && (
                        <button
                          onClick={() => setIsEditing(true)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: C.grey,
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0.25rem',
                          }}
                          title="Editar perfil"
                        >
                          <Edit size={15} />
                        </button>
                      )}
                    </DCardHeader>
                    <DCardBody>
                      {isEditing ? (
                        <ProfileEditForm
                          onCancel={() => setIsEditing(false)}
                          onSuccess={() => { setIsEditing(false); window.location.reload(); }}
                        />
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          {[
                            { label: 'Nombre', value: currentUser?.name || 'No especificado' },
                            { label: 'Correo',  value: currentUser?.email },
                            { label: 'Teléfono', value: currentUser?.phone || 'No especificado' },
                          ].map((field, i) => (
                            <div key={i}>
                              <span style={{ fontSize: '0.75rem', color: C.grey, display: 'block', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                {field.label}
                              </span>
                              <p style={{ color: C.white, margin: 0, fontSize: '0.92rem', fontWeight: 500 }}>
                                {field.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </DCardBody>
                  </DCard>

                  {/* Quick actions */}
                  <DCard>
                    <DCardHeader>
                      <span style={{ color: C.white, fontWeight: 600, fontSize: '0.95rem' }}>Acciones rápidas</span>
                    </DCardHeader>
                    <DCardBody style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {[
                        { to: '/registro-clases', icon: Calendar, label: 'Reservar clase', primary: true },
                        { to: '/clases',          icon: Clock,    label: 'Ver horarios',  primary: false },
                      ].map((action, i) => (
                        <Link key={i} to={action.to} style={{ textDecoration: 'none' }}>
                          <button
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.6rem',
                              padding: '0.7rem 1rem',
                              backgroundColor: action.primary ? C.red : 'transparent',
                              color: action.primary ? C.white : C.greyLight,
                              border: `1px solid ${action.primary ? C.red : C.border}`,
                              borderRadius: '0.5rem',
                              cursor: 'pointer',
                              fontSize: '0.88rem',
                              fontWeight: action.primary ? 600 : 400,
                              transition: 'opacity 0.2s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                          >
                            <action.icon size={15} />
                            {action.label}
                          </button>
                        </Link>
                      ))}
                    </DCardBody>
                  </DCard>

                  {/* Progress nudge (dark pattern: social proof + scarcity) */}
                  <DCard style={{ border: `1px solid ${C.gold}40` }}>
                    <DCardBody>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <Star size={15} color={C.gold} />
                        <span style={{ color: C.gold, fontWeight: 600, fontSize: '0.85rem' }}>Tu progreso</span>
                      </div>
                      <p style={{ color: C.greyLight, fontSize: '0.83rem', lineHeight: 1.6, margin: '0 0 1rem' }}>
                        Estás a <strong style={{ color: C.white }}>{Math.max(0, 8 - registrations.length)} clases</strong> de desbloquear
                        el nivel <strong style={{ color: C.gold }}>Intermedio Elite</strong> y obtener
                        acceso a beneficios exclusivos.
                      </p>
                      <div style={{ backgroundColor: C.bgMuted, borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${Math.min(100, (registrations.length / 8) * 100)}%`,
                            backgroundColor: C.gold,
                            borderRadius: '999px',
                            transition: 'width 0.6s ease',
                          }}
                        />
                      </div>
                      <p style={{ color: C.greyFaint, fontSize: '0.72rem', marginTop: '0.5rem', textAlign: 'right' }}>
                        {registrations.length}/8 clases
                      </p>
                    </DCardBody>
                  </DCard>
                </div>

                {/* ── RIGHT COL: registrations ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', gridColumn: 'span 2' }}>
                  <DCard>
                    <DCardHeader>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={17} color={C.red} />
                        <span style={{ color: C.white, fontWeight: 600, fontSize: '0.95rem' }}>
                          Mis clases registradas
                        </span>
                      </div>
                      <span
                        style={{
                          backgroundColor: C.redGlow,
                          color: C.red,
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.65rem',
                          borderRadius: '999px',
                        }}
                      >
                        {registrations.length} clase{registrations.length !== 1 ? 's' : ''}
                      </span>
                    </DCardHeader>
                    <DCardBody>
                      {isLoading ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              style={{
                                height: '5.5rem',
                                backgroundColor: C.bgMuted,
                                borderRadius: '0.75rem',
                                animation: 'pulse 1.5s infinite',
                              }}
                            />
                          ))}
                        </div>
                      ) : registrations.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                          {registrations.map((reg) => (
                            <div
                              key={reg.id}
                              style={{
                                backgroundColor: C.bgMuted,
                                borderRadius: '0.75rem',
                                padding: '1.1rem 1.25rem',
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                gap: '1rem',
                                border: `1px solid ${C.border}`,
                              }}
                            >
                              <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                                  <h3 style={{ color: C.white, fontWeight: 600, fontSize: '0.95rem', margin: 0 }}>
                                    {reg.expand?.class_id?.name || 'Clase'}
                                  </h3>
                                  <span
                                    style={{
                                      backgroundColor: C.redGlow,
                                      color: C.red,
                                      fontSize: '0.7rem',
                                      fontWeight: 600,
                                      padding: '0.15rem 0.55rem',
                                      borderRadius: '999px',
                                    }}
                                  >
                                    {reg.expand?.class_id?.type || 'Regular'}
                                  </span>
                                </div>
                                <p style={{ color: C.grey, fontSize: '0.82rem', margin: '0 0 0.25rem' }}>
                                  {reg.expand?.class_id?.schedule || 'Horario por confirmar'}
                                </p>
                                <p style={{ color: C.greyFaint, fontSize: '0.75rem', margin: 0 }}>
                                  Registrado: {new Date(reg.registration_date).toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </p>
                              </div>
                              <button
                                onClick={() => handleCancelRegistration(reg.id)}
                                style={{
                                  background: 'none',
                                  border: `1px solid ${C.border}`,
                                  borderRadius: '0.4rem',
                                  color: C.grey,
                                  cursor: 'pointer',
                                  fontSize: '0.78rem',
                                  padding: '0.35rem 0.75rem',
                                  whiteSpace: 'nowrap',
                                  transition: 'color 0.2s, border-color 0.2s',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = C.red; e.currentTarget.style.borderColor = C.red; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = C.grey; e.currentTarget.style.borderColor = C.border; }}
                              >
                                Cancelar
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                          <Calendar size={48} color={C.greyFaint} style={{ margin: '0 auto 1rem' }} />
                          <p style={{ color: C.grey, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                            No tienes clases registradas aún
                          </p>
                          <Link to="/registro-clases" style={{ textDecoration: 'none' }}>
                            <button
                              style={{
                                backgroundColor: C.red,
                                color: C.white,
                                border: 'none',
                                borderRadius: '0.5rem',
                                padding: '0.7rem 1.5rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                              }}
                            >
                              Reservar mi primera clase
                            </button>
                          </Link>
                        </div>
                      )}
                    </DCardBody>
                  </DCard>

                  {/* ── SOCIAL PROOF STRIP ── */}
                  <div
                    style={{
                      backgroundColor: 'rgba(56,161,105,0.08)',
                      border: '1px solid rgba(56,161,105,0.3)',
                      borderRadius: '0.75rem',
                      padding: '0.85rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}
                  >
                    <TrendingUp size={17} color={C.success} style={{ flexShrink: 0 }} />
                    <p style={{ color: C.greyLight, fontSize: '0.83rem', margin: 0 }}>
                      <strong style={{ color: C.success }}>23 personas</strong> adquirieron un paquete
                      esta semana en JJStudio Querétaro.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── PACKAGES SECTION ── */}
              <div style={{ marginTop: '3rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <Zap size={18} color={C.red} />
                    <span
                      style={{
                        color: C.red,
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      Oferta activa
                    </span>
                  </div>
                  <h2
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                      fontWeight: 700,
                      color: C.white,
                      margin: '0 0 0.5rem',
                    }}
                  >
                    Elige tu paquete de clases
                  </h2>
                  <p style={{ color: C.grey, fontSize: '0.92rem', margin: 0 }}>
                    Mientras más clases, menor precio por sesión. Sin mensualidades.
                  </p>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1.25rem',
                  }}
                >
                  {PACKAGES.map((pkg, i) => (
                    <PackageCard key={pkg.id} pkg={pkg} index={i} />
                  ))}
                </div>

                {/* Final scarcity nudge */}
                <div
                  style={{
                    marginTop: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <AlertTriangle size={14} color={C.orange} />
                  <p style={{ color: C.greyFaint, fontSize: '0.78rem', margin: 0 }}>
                    Los precios pueden cambiar sin previo aviso. Bloquea el tuyo hoy.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default DashboardPage;
