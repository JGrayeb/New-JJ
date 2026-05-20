import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  Eye, EyeOff, Mail, Lock, User, Phone,
  ArrowLeft, CheckCircle, XCircle, Loader2
} from 'lucide-react';

/* ─── Color tokens ───────────────────────────────────────────────────────── */
const C = {
  bg:          '#0a0a0a',
  bgCard:      '#141414',
  bgInput:     '#1c1c1c',
  red:         '#e53e3e',
  redDark:     '#9b2c2c',
  redGlow:     'rgba(229,62,62,0.18)',
  white:       '#ffffff',
  grey:        '#a0aec0',
  greyLight:   '#cbd5e0',
  greyFaint:   '#4a5568',
  border:      '#2a2a2a',
  borderFocus: '#e53e3e',
  success:     '#38a169',
  error:       '#fc8181',
};

/* ─── SEO schemas ────────────────────────────────────────────────────────── */
const LOGIN_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Iniciar Sesión – JJStudio Método Lagree Querétaro',
  url: 'https://jjstudio.mx/login',
  description: 'Inicia sesión o crea tu cuenta en JJStudio para gestionar tus clases de Método Lagree en Querétaro.',
  inLanguage: 'es-MX',
};

/* ─── Password strength helper ───────────────────────────────────────────── */
const getStrength = (pw) => {
  if (!pw) return null;
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { label: 'Débil',    color: C.error,   width: '25%' };
  if (score <= 3) return { label: 'Regular',  color: '#d69e2e', width: '60%' };
  return            { label: 'Fuerte',   color: C.success, width: '100%' };
};

/* ─── Reusable input with icon + show/hide ───────────────────────────────── */
const Field = ({
  id, name, type = 'text', value, onChange, placeholder,
  label, icon: Icon, hint, required = false,
  showToggle = false, show, onToggle,
  validationIcon = null,
}) => {
  const [focused, setFocused] = useState(false);
  const inputType = showToggle ? (show ? 'text' : 'password') : type;

  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: 'block',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: focused ? C.greyLight : C.grey,
          marginBottom: '0.4rem',
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          transition: 'color 0.2s',
        }}
      >
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        {/* Left icon */}
        <Icon
          size={15}
          color={focused ? C.red : C.greyFaint}
          style={{
            position: 'absolute',
            left: '0.85rem',
            top: '50%',
            transform: 'translateY(-50%)',
            transition: 'color 0.2s',
            pointerEvents: 'none',
          }}
        />
        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          placeholder={placeholder}
          autoComplete={
            name === 'email' ? 'email' :
            name === 'password' ? 'current-password' :
            name === 'passwordConfirm' ? 'new-password' :
            name === 'name' ? 'name' :
            name === 'phone' ? 'tel' : 'off'
          }
          style={{
            width: '100%',
            padding: '0.75rem 2.8rem 0.75rem 2.5rem',
            backgroundColor: C.bgInput,
            color: C.white,
            border: `1.5px solid ${focused ? C.red : C.border}`,
            borderRadius: '0.6rem',
            fontSize: '0.95rem',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxShadow: focused ? `0 0 0 3px ${C.redGlow}` : 'none',
          }}
        />
        {/* Right: show/hide or validation icon */}
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            tabIndex={-1}
            style={{
              position: 'absolute',
              right: '0.85rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: C.greyFaint,
              padding: 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
        {validationIcon && !showToggle && (
          <div
            style={{
              position: 'absolute',
              right: '0.85rem',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            {validationIcon}
          </div>
        )}
      </div>
      {hint && (
        <p style={{ color: C.greyFaint, fontSize: '0.72rem', marginTop: '0.35rem' }}>
          {hint}
        </p>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════ */
const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, signup, isAuthenticated } = useAuth();
  const [isSignup, setIsSignup] = useState(searchParams.get('signup') === 'true');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    email: '', password: '', passwordConfirm: '', name: '', phone: '',
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const switchMode = () => {
    setIsSignup((v) => !v);
    setFormData({ email: formData.email, password: '', passwordConfirm: '', name: '', phone: '' });
    setShowPassword(false);
    setShowConfirm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignup) {
      if (formData.password !== formData.passwordConfirm) {
        toast.error('Las contraseñas no coinciden');
        setIsLoading(false);
        return;
      }
      if (formData.password.length < 8) {
        toast.error('La contraseña debe tener al menos 8 caracteres');
        setIsLoading(false);
        return;
      }
      const result = await signup(
        formData.email, formData.password, formData.passwordConfirm,
        formData.name, formData.phone
      );
      if (result.success) {
        toast.success('¡Cuenta creada! Bienvenido a JJStudio 🎉');
        navigate('/dashboard');
      } else {
        toast.error(result.error || 'Error al crear cuenta');
      }
    } else {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        toast.success('¡Bienvenido de vuelta!');
        navigate('/dashboard');
      } else {
        toast.error('Correo o contraseña incorrectos');
      }
    }
    setIsLoading(false);
  };

  const passwordStrength = isSignup ? getStrength(formData.password) : null;
  const passwordsMatch =
    isSignup && formData.passwordConfirm.length > 0
      ? formData.password === formData.passwordConfirm
      : null;
  const emailValid = formData.email.includes('@') && formData.email.includes('.');

  return (
    <>
      <Helmet>
        <html lang="es-MX" />
        <title>
          {isSignup
            ? 'Crear Cuenta | JJStudio – Método Lagree Querétaro'
            : 'Iniciar Sesión | JJStudio – Método Lagree Querétaro'}
        </title>
        <meta
          name="description"
          content={
            isSignup
              ? 'Crea tu cuenta en JJStudio para reservar clases de Método Lagree en Querétaro. Rápido y seguro.'
              : 'Inicia sesión en JJStudio para gestionar tus clases de Método Lagree en Querétaro.'
          }
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://jjstudio.mx/login" />
        <script type="application/ld+json">{JSON.stringify(LOGIN_SCHEMA)}</script>
      </Helmet>

      <div
        style={{
          minHeight: '100vh',
          backgroundColor: C.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1rem',
          position: 'relative',
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: 'fixed',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(229,62,62,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: '26rem' }}
        >
          {/* Back link */}
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: C.grey,
              fontSize: '0.82rem',
              textDecoration: 'none',
              marginBottom: '1.75rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.white)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.grey)}
          >
            <ArrowLeft size={14} /> Volver al inicio
          </Link>

          {/* Logo + heading */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  color: C.red,
                  display: 'block',
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em',
                }}
              >
                JJStudio
              </span>
            </Link>

            {/* Mode toggle tabs */}
            <div
              style={{
                display: 'inline-flex',
                backgroundColor: '#181818',
                border: `1px solid ${C.border}`,
                borderRadius: '0.6rem',
                padding: '0.25rem',
              }}
            >
              {['Iniciar sesión', 'Crear cuenta'].map((label, i) => {
                const active = i === 0 ? !isSignup : isSignup;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => i === 0 ? (isSignup && switchMode()) : (!isSignup && switchMode())}
                    style={{
                      padding: '0.45rem 1.1rem',
                      borderRadius: '0.4rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: active ? 700 : 400,
                      backgroundColor: active ? C.red : 'transparent',
                      color: active ? C.white : C.grey,
                      transition: 'all 0.2s',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <p style={{ color: C.grey, fontSize: '0.85rem', marginTop: '0.85rem' }}>
              {isSignup
                ? 'Únete a JJStudio y comienza tu transformación'
                : 'Accede para gestionar tus clases y paquetes'}
            </p>
          </div>

          {/* Form card */}
          <div
            style={{
              backgroundColor: C.bgCard,
              border: `1px solid ${C.border}`,
              borderRadius: '1rem',
              padding: '2rem',
            }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
            >
              <AnimatePresence mode="wait">
                {isSignup && (
                  <motion.div
                    key="signup-fields"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', overflow: 'hidden' }}
                  >
                    <Field
                      id="name" name="name" type="text"
                      value={formData.name} onChange={handleChange}
                      label="Nombre completo" icon={User}
                      placeholder="Tu nombre completo" required
                    />
                    <Field
                      id="phone" name="phone" type="tel"
                      value={formData.phone} onChange={handleChange}
                      label="Teléfono (opcional)" icon={Phone}
                      placeholder="+52 33 1837 3447"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <Field
                id="email" name="email" type="email"
                value={formData.email} onChange={handleChange}
                label="Correo electrónico" icon={Mail}
                placeholder="tu@email.com" required
                validationIcon={
                  formData.email.length > 4
                    ? emailValid
                      ? <CheckCircle size={14} color={C.success} />
                      : <XCircle size={14} color={C.error} />
                    : null
                }
              />

              <div>
                <Field
                  id="password" name="password"
                  value={formData.password} onChange={handleChange}
                  label="Contraseña" icon={Lock}
                  placeholder="••••••••" required
                  showToggle show={showPassword}
                  onToggle={() => setShowPassword((v) => !v)}
                  hint={isSignup ? 'Mínimo 8 caracteres' : null}
                />
                {/* Password strength bar */}
                {isSignup && formData.password.length > 0 && passwordStrength && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <div
                      style={{
                        height: '4px',
                        backgroundColor: '#222',
                        borderRadius: '999px',
                        overflow: 'hidden',
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: passwordStrength.width }}
                        transition={{ duration: 0.4 }}
                        style={{
                          height: '100%',
                          backgroundColor: passwordStrength.color,
                          borderRadius: '999px',
                        }}
                      />
                    </div>
                    <p style={{ fontSize: '0.7rem', color: passwordStrength.color, marginTop: '0.25rem' }}>
                      Contraseña {passwordStrength.label}
                    </p>
                  </div>
                )}
              </div>

              <AnimatePresence mode="wait">
                {isSignup && (
                  <motion.div
                    key="confirm-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <Field
                      id="passwordConfirm" name="passwordConfirm"
                      value={formData.passwordConfirm} onChange={handleChange}
                      label="Confirmar contraseña" icon={Lock}
                      placeholder="••••••••" required
                      showToggle show={showConfirm}
                      onToggle={() => setShowConfirm((v) => !v)}
                    />
                    {passwordsMatch !== null && (
                      <p
                        style={{
                          fontSize: '0.72rem',
                          color: passwordsMatch ? C.success : C.error,
                          marginTop: '0.35rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        {passwordsMatch
                          ? <><CheckCircle size={11} /> Las contraseñas coinciden</>
                          : <><XCircle size={11} /> Las contraseñas no coinciden</>}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Forgot password (login only) */}
              {!isSignup && (
                <div style={{ textAlign: 'right', marginTop: '-0.4rem' }}>
                  <Link
                    to="/recuperar-password"
                    style={{ color: C.grey, fontSize: '0.78rem', textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = C.red)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.grey)}
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  marginTop: '0.5rem',
                  backgroundColor: isLoading ? C.redDark : C.red,
                  color: C.white,
                  border: 'none',
                  borderRadius: '0.6rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'opacity 0.2s',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.opacity = '0.88'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                {isLoading && <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />}
                {isLoading
                  ? isSignup ? 'Creando cuenta...' : 'Iniciando sesión...'
                  : isSignup ? 'Crear mi cuenta' : 'Iniciar sesión'}
              </button>

              {/* Terms (signup only) */}
              {isSignup && (
                <p style={{ color: C.greyFaint, fontSize: '0.72rem', textAlign: 'center', margin: '0.25rem 0 0', lineHeight: 1.5 }}>
                  Al registrarte aceptas nuestros{' '}
                  <Link to="/terminos" style={{ color: C.grey, textDecoration: 'underline' }}>
                    Términos de uso
                  </Link>{' '}
                  y{' '}
                  <Link to="/privacidad" style={{ color: C.grey, textDecoration: 'underline' }}>
                    Política de privacidad
                  </Link>
                </p>
              )}
            </form>
          </div>

          {/* Switch mode link */}
          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: C.grey }}>
            {isSignup ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
            <button
              type="button"
              onClick={switchMode}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: C.red,
                fontWeight: 700,
                fontSize: '0.85rem',
                padding: 0,
                textDecoration: 'underline',
              }}
            >
              {isSignup ? 'Inicia sesión' : 'Regístrate gratis'}
            </button>
          </p>
        </motion.div>

        {/* Spinner keyframes */}
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </>
  );
};

export default LoginPage;