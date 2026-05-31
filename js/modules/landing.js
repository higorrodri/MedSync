function Landing({ onEntrar }) {
  const { useState } = React;
  const [aba, setAba] = useState('anual');

  const atendimentos = [
    { icon: 'patients',    titulo: 'Clínica Geral',  desc: 'Consultas de rotina, check-ups e acompanhamento contínuo com histórico completo.', cor: 'blue'   },
    { icon: 'heart',       titulo: 'Cardiologia',    desc: 'Gestão de laudos, exames e acompanhamento de pacientes com condições cardíacas.', cor: 'coral'  },
    { icon: 'clipboard',   titulo: 'Pediatria',      desc: 'Controle de vacinação, curvas de crescimento e prontuários especializados.', cor: 'green'  },
    { icon: 'stethoscope', titulo: 'Especialidades', desc: 'Dermatologia, ortopedia, neurologia — cada especialidade com fluxos customizados.', cor: 'purple' },
  ];
  const funcionalidades = [
    { icon: 'clipboard',  titulo: 'Prontuário Eletrônico',  desc: 'Histórico clínico completo, prescrições e diagnósticos em um só lugar.' },
    { icon: 'calendar',   titulo: 'Agendamento Online',     desc: 'Agenda integrada com confirmação automática e lembretes para pacientes.' },
    { icon: 'patients',   titulo: 'Gestão de Pacientes',    desc: 'Cadastro completo com busca rápida por nome, CPF ou convênio.' },
    { icon: 'schedule',   titulo: 'Agenda do Médico',       desc: 'Cada médico define seus dias e horários. Flexível e fácil de configurar.' },
    { icon: 'trend',      titulo: 'Relatórios Avançados',   desc: 'Exportação e análise de dados clínicos e financeiros por período.' },
    { icon: 'bot',        titulo: 'Atendente Virtual IA',   desc: 'Assistente inteligente disponível 24h quando o médico está offline.' },
  ];
  const planos = [
    { nome: 'Starter',    mensal: 149, anual: 119, desc: 'Ideal para consultórios individuais', destaque: false, itens: ['1 médico', 'Até 200 pacientes', 'Agendamento básico', 'Prontuário eletrônico', 'Suporte por e-mail'] },
    { nome: 'Pro',        mensal: 299, anual: 239, desc: 'Para clínicas em crescimento',        destaque: true,  itens: ['Até 5 médicos', 'Pacientes ilimitados', 'Agenda personalizada', 'Relatórios avançados', 'Atendente Virtual IA', 'Suporte prioritário'] },
    { nome: 'Enterprise', mensal: 599, anual: 479, desc: 'Para grandes redes e hospitais',      destaque: false, itens: ['Médicos ilimitados', 'Multi-unidade', 'API e integrações', 'Gestor dedicado', 'SLA 99,9%', 'Treinamento presencial'] },
  ];
  const corMap = { blue: '#2563EB', coral: '#E05A3A', green: '#16A34A', purple: '#7C3AED' };
  const bgMap  = { blue: 'rgba(37,99,235,0.12)', coral: 'rgba(224,90,58,0.12)', green: 'rgba(22,163,74,0.12)', purple: 'rgba(124,58,237,0.12)' };

  return (
    <div className="landing">
      <nav className="land-nav">
        <div className="land-nav-inner">
          <div className="land-logo"><div className="land-logo-icon">{Icon.logo}</div><span>MedSync</span></div>
          <div className="land-nav-links"><a href="#atendimentos">Atendimentos</a><a href="#funcionalidades">Funcionalidades</a><a href="#planos">Planos</a></div>
          <button className="btn-land-login" onClick={onEntrar}>Entrar</button>
        </div>
      </nav>
      <section className="land-hero">
        <div className="land-hero-glow land-glow-1" /><div className="land-hero-glow land-glow-2" />
        <div className="land-hero-split">
          <div className="land-hero-left">
            <div className="land-tag">Plataforma de gestão clínica</div>
            <h1 className="land-hero-title">Sua clínica,<br /><span className="land-hero-accent">no próximo nível.</span></h1>
            <p className="land-hero-sub">Prontuário eletrônico, agendamento e gestão de pacientes — tudo integrado numa plataforma moderna.</p>
            <div className="land-hero-ctas">
              <button className="btn-cta-primary" onClick={onEntrar}>Começar agora {Icon.plus}</button>
              <a href="#planos" className="btn-cta-ghost">Ver planos</a>
            </div>
            <div className="land-hero-stats">
              {[['+12 mil', 'Médicos ativos'], ['98%', 'Satisfação'], ['24/7', 'Suporte']].map(([n, l]) => (
                <div key={l} className="land-stat"><strong>{n}</strong><span>{l}</span></div>
              ))}
            </div>
          </div>
          <div className="land-hero-right">
            <div className="land-mascot-wrap">
              <img src="assets/images/BUFALLO_BIL.png" alt="Mascote MedSync" className="land-mascot" />
              <div className="land-mascot-bubble">Bem-vindo ao<br /><strong>MedSync!</strong></div>
            </div>
          </div>
        </div>
      </section>
      <section className="land-section" id="atendimentos">
        <div className="land-section-inner">
          <div className="land-section-header"><div className="land-tag">Especialidades</div><h2>Tipos de atendimento</h2><p>Fluxos adaptados para cada especialidade médica</p></div>
          <div className="land-grid-4">
            {atendimentos.map(a => (
              <div className="land-card" key={a.titulo}>
                <div className="land-card-icon" style={{ background: bgMap[a.cor], color: corMap[a.cor] }}>{Icon[a.icon]}</div>
                <h3>{a.titulo}</h3><p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="land-section land-section-alt" id="funcionalidades">
        <div className="land-section-inner">
          <div className="land-section-header"><div className="land-tag">Plataforma</div><h2>Tudo que você precisa</h2><p>Ferramentas pensadas para o dia a dia clínico</p></div>
          <div className="land-grid-3">
            {funcionalidades.map(f => (
              <div className="land-feat" key={f.titulo}>
                <div className="land-feat-icon">{Icon[f.icon]}</div>
                <div><h4>{f.titulo}</h4><p>{f.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="land-section" id="planos">
        <div className="land-section-inner">
          <div className="land-section-header"><div className="land-tag">Preços</div><h2>Planos e preços</h2><p>Sem taxas ocultas. Cancele quando quiser.</p></div>
          <div className="land-toggle">
            <button className={aba === 'mensal' ? 'active' : ''} onClick={() => setAba('mensal')}>Mensal</button>
            <button className={aba === 'anual'  ? 'active' : ''} onClick={() => setAba('anual')}>Anual <span className="land-desconto">−20%</span></button>
          </div>
          <div className="land-planos">
            {planos.map(p => (
              <div className={`land-plano ${p.destaque ? 'land-plano-dest' : ''}`} key={p.nome}>
                {p.destaque && <div className="land-plano-badge">Mais popular</div>}
                <h3>{p.nome}</h3><p className="land-plano-desc">{p.desc}</p>
                <div className="land-plano-preco"><span className="land-preco-val">R$ {aba === 'anual' ? p.anual : p.mensal}</span><span className="land-preco-per">/mês</span></div>
                {aba === 'anual' && <p className="land-plano-economia">Economia de R$ {(p.mensal - p.anual) * 12}/ano</p>}
                <ul className="land-plano-itens">{p.itens.map(i => <li key={i}><span className="land-check">{Icon.check}</span>{i}</li>)}</ul>
                <button className={p.destaque ? 'btn-cta-primary' : 'btn-cta-outline'} onClick={onEntrar} style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>Começar com {p.nome}</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="land-footer">
        <div className="land-logo" style={{ justifyContent: 'center', marginBottom: 8 }}><div className="land-logo-icon">{Icon.logo}</div><span>MedSync</span></div>
        <p>© 2026 MedSync. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
