function Dashboard() {
  const cards = [
    { label: 'Consultas Hoje',      value: 12,                   icon: 'clock',       color: 'blue'   },
    { label: 'Pacientes',           value: DB.pacientes.length,  icon: 'patients',    color: 'purple' },
    { label: 'Médicos Cadastrados', value: DB.medicos.length,    icon: 'stethoscope', color: 'green'  },
    { label: 'Próx. Atendimentos',  value: 5,                    icon: 'calendar',    color: 'amber'  },
  ];

  const proximasConsultas = [
    { time: '08:00', name: 'Maria Clara',   doctor: 'Dr. Lucas', status: 'agendada'  },
    { time: '09:30', name: 'Carlos Mendes', doctor: 'Dra. Ana',  status: 'agendada'  },
    { time: '10:00', name: 'João Silva',    doctor: 'Dr. Lucas', status: 'realizada' },
    { time: '11:30', name: 'Ana Ferreira',  doctor: 'Dra. Ana',  status: 'cancelada' },
    { time: '14:00', name: 'Pedro Lima',    doctor: 'Dr. Lucas', status: 'agendada'  },
  ];

  return (
    <div>
      <div className="page-header"><h1>Dashboard</h1><p>Resumo das atividades de hoje</p></div>
      <div className="cards">
        {cards.map(c => (
          <div className="card" key={c.label}>
            <div className={`card-icon ${c.color}`}>{Icon[c.icon]}</div>
            <h3>{c.label}</h3><p>{c.value}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>Próximas Consultas</h3>
        {proximasConsultas.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.8rem', color: 'var(--text-muted)', minWidth: 40 }}>{c.time}</span>
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{c.name}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: 8 }}>{c.doctor}</span>
            </div>
            <span className={`status ${c.status}`}>{c.status.charAt(0).toUpperCase() + c.status.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
