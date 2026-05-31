function Toast({ msg, type = 'success', onClose }) {
  const { useEffect } = React;
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, []);

  const colors = { success: '#22C55E', error: '#EF4444', info: '#2563EB' };

  return (
    <div style={{
      position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
      background: '#0F172A', color: '#fff',
      padding: '12px 20px', borderRadius: 12,
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      display: 'flex', alignItems: 'center', gap: 10,
      fontSize: '0.875rem', fontWeight: 500,
      animation: 'slideUp 0.3s ease',
    }}>
      <span style={{ color: colors[type] || colors.success, display: 'flex', width: 18, height: 18 }}>
        {Icon.check}
      </span>
      {msg}
    </div>
  );
}

/* Fundo glassmorphism dark — reutilizado em Login, Cadastro e Sucesso */
function DarkPageWrapper({ children }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0F172A 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, position: 'relative', overflow: 'hidden',
    }}>
      {/* Glows decorativos */}
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)', top: -200, right: -100, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)', bottom: -150, left: -100, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        {children}
      </div>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

/* Card glassmorphism — container dos formulários de auth */
function GlassCard({ children, maxWidth = 520 }) {
  return (
    <div style={{
      width: '100%', maxWidth,
      background: 'rgba(255,255,255,0.03)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 20, padding: '40px 44px',
      animation: 'slideUp 0.4s ease',
    }}>
      {children}
    </div>
  );
}

/* Logo header dentro dos cards de auth */
function AuthLogo({ subtitle }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        {Icon.logo}
      </div>
      <div>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.3px' }}>MedSync</div>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>{subtitle}</div>
      </div>
    </div>
  );
}
