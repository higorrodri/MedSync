function PainelPaciente({ usuario, onSair }) {
  const { useState } = React;
  const [pagina, setPagina] = useState('dashboard');
  const medicoOnline        = DB.medicos.some(m => m.online);

  const menuItems = [
    { key: 'dashboard', label: 'Início',            icon: 'dashboard' },
    { key: 'consultas', label: 'Minhas Consultas',  icon: 'calendar'  },
    { key: 'atendente', label: 'Atendente Virtual', icon: 'chat'      },
  ];

  const DashboardPaciente = () => (
    <div>
      <div className="page-header">
        <h1>Olá, {usuario.nome.split(' ')[0]}! 👋</h1>
        <p>Bem-vindo ao seu painel de saúde</p>
      </div>
      <div className="cards">
        <div className="card">
          <div className="card-icon blue">{Icon.calendar}</div>
          <h3>Próxima Consulta</h3><p style={{ fontSize: '0.9rem' }}>26/05 às 08:00</p>
        </div>
        <div className="card">
          <div className="card-icon purple">{Icon.stethoscope}</div>
          <h3>Médicos Disponíveis</h3><p>{DB.medicos.filter(m => m.online).length} online agora</p>
        </div>
        <div className="card">
          <div className="card-icon" style={{ background: medicoOnline ? 'rgba(22,163,74,0.12)' : 'rgba(239,68,68,0.1)', color: medicoOnline ? '#16A34A' : '#DC2626' }}>{Icon.user}</div>
          <h3>Status</h3>
          <p style={{ fontSize: '0.85rem', color: medicoOnline ? '#16A34A' : '#DC2626', fontWeight: 600 }}>{medicoOnline ? '🟢 Médico online' : '🔴 Offline'}</p>
        </div>
      </div>

      {/* Lista de médicos */}
      <div style={{ marginTop: 24, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Médicos da clínica</h3>
        {DB.medicos.map(m => (
          <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '1.4rem' }}>{m.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{m.nome}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{m.especialidade} · {m.horarioInicio}–{m.horarioFim}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📅 {m.diasAtendimento?.join(', ')}</div>
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, background: m.online ? 'rgba(22,163,74,0.1)' : 'rgba(148,163,184,0.15)', border: `1px solid ${m.online ? 'rgba(22,163,74,0.3)' : 'rgba(148,163,184,0.3)'}`, borderRadius: 20, padding: '3px 10px', fontSize: '0.72rem', fontWeight: 600, color: m.online ? '#16A34A' : '#64748B' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: m.online ? '#22C55E' : '#94A3B8', display: 'inline-block' }} />
              {m.online ? 'Online' : 'Offline'}
            </span>
          </div>
        ))}
      </div>

      {!medicoOnline && (
        <div style={{ marginTop: 16, background: 'linear-gradient(135deg,rgba(37,99,235,0.06),rgba(124,58,237,0.06))', border: '1px solid rgba(37,99,235,0.2)', borderRadius: 14, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: '2rem' }}>🤖</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Todos os médicos estão offline</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Nosso assistente virtual está disponível para dúvidas!</div>
          </div>
          <button onClick={() => setPagina('atendente')} style={{ background: 'var(--brand)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
            Falar com MedBot
          </button>
        </div>
      )}
    </div>
  );

  const pages = {
    dashboard: <DashboardPaciente />,
    consultas: <Agendamentos medicosFiltrados={DB.medicos} />,
    atendente: <AtendenteVirtual medicoOnline={medicoOnline} />,
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="sidebar-header"><h2>MedSync</h2><span className="sidebar-badge">Paciente</span></div>
        <nav className="sidebar-nav">
          <div className="nav-label">Menu</div>
          {menuItems.map(m => (
            <button key={m.key} className={pagina === m.key ? 'active' : ''} onClick={() => setPagina(m.key)}>
              {Icon[m.icon]}{m.label}
              {m.key === 'atendente' && !medicoOnline && <span style={{ marginLeft: 'auto', background: 'var(--brand)', color: '#fff', borderRadius: 10, padding: '1px 6px', fontSize: '0.65rem', fontWeight: 600 }}>IA</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer"><button onClick={onSair}>{Icon.logout} Sair</button></div>
      </aside>
      <main className="content" key={pagina}>{pages[pagina]}</main>
    </div>
  );
}

function PainelApp({ usuario, perfil, onSair }) {
  const { useState } = React;
  const [pagina, setPagina] = useState('dashboard');

  const menus = {
    admin:  ['dashboard', 'pacientes', 'agendamentos', 'prontuario', 'medicos'],
    medico: ['dashboard', 'agendamentos', 'prontuario', 'meu-perfil'],
  };
  const menuItems = [
    { key: 'dashboard',    label: 'Dashboard',     icon: 'dashboard'   },
    { key: 'pacientes',    label: 'Pacientes',      icon: 'patients'    },
    { key: 'agendamentos', label: 'Agendamentos',   icon: 'calendar'    },
    { key: 'prontuario',   label: 'Prontuário',     icon: 'clipboard'   },
    { key: 'medicos',      label: 'Perfil Médicos', icon: 'stethoscope' },
    { key: 'meu-perfil',   label: 'Meu Perfil',     icon: 'user'        },
  ];
  const nomePerfil = { admin: 'Administrador', medico: 'Médico' }[perfil];

  const [usuarioAtual, setUsuarioAtual] = useState(usuario);
  const pages = {
    dashboard:    <Dashboard />,
    pacientes:    <Pacientes />,
    agendamentos: <Agendamentos />,
    prontuario:   <Prontuario />,
    medicos:      <PerfilMedicos />,
    'meu-perfil': perfil === 'medico'
      ? <MeuPerfil usuario={usuarioAtual} onSalvar={u => setUsuarioAtual(u)} />
      : <Dashboard />,
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="sidebar-header"><h2>MedSync</h2><span className="sidebar-badge">{nomePerfil}</span></div>
        <nav className="sidebar-nav">
          <div className="nav-label">Menu</div>
          {menuItems.filter(m => menus[perfil]?.includes(m.key)).map(m => (
            <button key={m.key} className={pagina === m.key ? 'active' : ''} onClick={() => setPagina(m.key)}>
              {Icon[m.icon]}{m.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer"><button onClick={onSair}>{Icon.logout} Sair</button></div>
      </aside>
      <main className="content" key={pagina}>{pages[pagina]}</main>
    </div>
  );
}
