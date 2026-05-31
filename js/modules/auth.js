/* ── Login ── */
function Login({ onEntrar, onCadastroMedico, onCadastroPaciente, onLanding }) {
  const { useState } = React;
  const [email, setEmail]       = useState('');
  const [senha, setSenha]       = useState('');
  const [perfil, setPerfil]     = useState('admin');
  const [erro, setErro]         = useState('');

  const login = () => {
    setErro('');
    if (!email || !senha) { setErro('Preencha e-mail e senha!'); return; }

    if (perfil === 'admin' && email === 'admin@medsync.com' && senha === 'admin') {
      onEntrar({ usuario: { nome: 'Administrador', email }, perfil: 'admin' }); return;
    }
    if (perfil === 'medico') {
      const med = DB.medicos.find(m => m.email === email && m.senha === senha);
      if (med) { onEntrar({ usuario: med, perfil: 'medico' }); return; }
    }
    if (perfil === 'paciente') {
      const pac = DB.pacientes.find(p => p.email === email && p.senha === senha);
      if (pac) { onEntrar({ usuario: pac, perfil: 'paciente' }); return; }
    }
    setErro('E-mail ou senha incorretos.');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <div className="logo-icon">{Icon.logo}</div>
          <h1>MedSync</h1>
          <p>Plataforma de Gestão Clínica</p>
        </div>

        <div><div className="login-label">E-mail</div>
          <input type="email" placeholder="seu@email.com" value={email} onChange={e => { setEmail(e.target.value); setErro(''); }} />
        </div>
        <div><div className="login-label">Senha</div>
          <input type="password" placeholder="••••••••" value={senha}
            onChange={e => { setSenha(e.target.value); setErro(''); }}
            onKeyDown={e => e.key === 'Enter' && login()} />
        </div>
        <div><div className="login-label">Perfil de Acesso</div>
          <select value={perfil} onChange={e => { setPerfil(e.target.value); setErro(''); }}>
            <option value="admin">Administrador</option>
            <option value="medico">Médico</option>
            <option value="paciente">Paciente</option>
          </select>
        </div>

        {erro && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: '0.82rem', color: '#DC2626' }}>
            {erro}
          </div>
        )}

        <button className="btn-login" onClick={login}>Entrar</button>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>Não tem conta?</span>
          <div style={{ display: 'flex', gap: 8, width: '100%' }}>
            <button onClick={onCadastroMedico} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '9px 0', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit' }}>
              👨‍⚕️ Sou médico
            </button>
            <button onClick={onCadastroPaciente} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '9px 0', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit' }}>
              🙋 Sou paciente
            </button>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', marginTop: 2 }}>
            Admin demo: admin@medsync.com / admin
          </div>
        </div>

        <button style={{ background: 'transparent', color: 'rgba(255,255,255,0.3)', border: 'none', fontSize: '0.8rem', cursor: 'pointer', padding: '4px 0' }}
          onClick={onLanding}>← Voltar ao início</button>
      </div>
    </div>
  );
}

/* ── Cadastro Médico ── */
function CadastroMedico({ onVoltar, onSucesso }) {
  const { useState } = React;
  const [passo, setPasso]       = useState(1);
  const [showSenha, setShowSenha] = useState(false);
  const [toast, setToast]       = useState(null);
  const [form, setForm]         = useState({
    nome: '', email: '', senha: '', confirmarSenha: '',
    crm: '', especialidade: '', telefone: '', bio: '',
    diasAtendimento: [], horarioInicio: '08:00', horarioFim: '17:00',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleDia = (dia) => set('diasAtendimento',
    form.diasAtendimento.includes(dia)
      ? form.diasAtendimento.filter(d => d !== dia)
      : [...form.diasAtendimento, dia]
  );

  const validarPasso1 = () => {
    if (!form.nome || !form.email || !form.senha || !form.crm || !form.especialidade) {
      setToast({ msg: 'Preencha todos os campos obrigatórios.', type: 'error' }); return false;
    }
    if (form.senha.length < 6) { setToast({ msg: 'Senha com mínimo 6 caracteres.', type: 'error' }); return false; }
    if (form.senha !== form.confirmarSenha) { setToast({ msg: 'As senhas não coincidem.', type: 'error' }); return false; }
    if (DB.medicos.find(m => m.email === form.email)) { setToast({ msg: 'E-mail já cadastrado.', type: 'error' }); return false; }
    return true;
  };

  const avancar   = () => { if (validarPasso1()) setPasso(2); };
  const finalizar = () => {
    if (form.diasAtendimento.length === 0) { setToast({ msg: 'Selecione ao menos um dia.', type: 'error' }); return; }
    const novo = { ...form, id: Date.now(), online: false, consultas: 0, avatar: '👨‍⚕️' };
    delete novo.confirmarSenha;
    DB.medicos.push(novo);
    onSucesso(novo);
  };

  const stepCircle = (n) => ({
    width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.3s',
    background: passo > n ? '#16A34A' : passo === n ? '#2563EB' : 'rgba(255,255,255,0.08)',
    border: `2px solid ${passo > n ? '#16A34A' : passo === n ? '#2563EB' : 'rgba(255,255,255,0.15)'}`,
    color: passo >= n ? '#fff' : 'rgba(255,255,255,0.3)',
    boxShadow: passo === n ? '0 0 0 4px rgba(37,99,235,0.25)' : 'none',
  });

  const btnVoltar    = { flex: 1, padding: '12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit' };
  const btnAvancar   = { flex: 2, padding: '12px', borderRadius: 10, border: 'none', background: '#2563EB', color: '#fff', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' };
  const btnFinalizar = { flex: 2, padding: '12px', borderRadius: 10, border: 'none', background: '#16A34A', color: '#fff', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' };

  return (
    <DarkPageWrapper>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <GlassCard maxWidth={560}>
        <AuthLogo subtitle="Cadastro de Médico" />

        {/* Steps */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
          <div style={stepCircle(1)}>1</div>
          <div style={{ flex: 1, height: 2, margin: '0 8px', background: passo >= 2 ? '#2563EB' : 'rgba(255,255,255,0.1)', transition: 'background 0.4s', borderRadius: 2 }} />
          <div style={stepCircle(2)}>2</div>
          <div style={{ flex: 1, height: 2, margin: '0 8px', background: 'rgba(255,255,255,0.08)', borderRadius: 2 }} />
          <div style={{ ...stepCircle(3), background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.25)' }}>✓</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: -20, marginBottom: 28, fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>
          <span style={{ color: passo === 1 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)', fontWeight: passo === 1 ? 600 : 400 }}>Dados pessoais</span>
          <span style={{ color: passo === 2 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)', fontWeight: passo === 2 ? 600 : 400 }}>Agenda</span>
          <span>Concluído</span>
        </div>

        {/* Passo 1 — dados pessoais */}
        {passo === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelDark}>Nome completo *</label>
              <input style={inpDark} placeholder="Dr. João Exemplo" value={form.nome} onChange={e => set('nome', e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelDark}>CRM *</label>
                <input style={inpDark} placeholder="CRM/UF 00000" value={form.crm} onChange={e => set('crm', e.target.value)} />
              </div>
              <div>
                <label style={labelDark}>Especialidade *</label>
                <select style={{ ...inpDark, color: form.especialidade ? '#fff' : 'rgba(255,255,255,0.35)' }} value={form.especialidade} onChange={e => set('especialidade', e.target.value)}>
                  <option value="" style={{ background: '#1E293B' }}>Selecione…</option>
                  {ESPECIALIDADES.map(e => <option key={e} style={{ background: '#1E293B', color: '#fff' }}>{e}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={labelDark}>E-mail *</label>
              <input style={inpDark} type="email" placeholder="seu@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
            <div>
              <label style={labelDark}>Telefone</label>
              <input style={inpDark} placeholder="(00) 00000-0000" value={form.telefone} onChange={e => set('telefone', e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelDark}>Senha *</label>
                <div style={{ position: 'relative' }}>
                  <input style={inpDark} type={showSenha ? 'text' : 'password'} placeholder="Mín. 6 caracteres" value={form.senha} onChange={e => set('senha', e.target.value)} />
                  <button onClick={() => setShowSenha(s => !s)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', width: 18, height: 18 }}>
                    {showSenha ? Icon.eyeoff : Icon.eye}
                  </button>
                </div>
              </div>
              <div>
                <label style={labelDark}>Confirmar senha *</label>
                <input style={inpDark} type="password" placeholder="Repita a senha" value={form.confirmarSenha} onChange={e => set('confirmarSenha', e.target.value)} />
              </div>
            </div>
            <div>
              <label style={labelDark}>Bio / Apresentação</label>
              <textarea style={{ ...inpDark, minHeight: 72, resize: 'vertical' }} placeholder="Breve descrição sobre você…" value={form.bio} onChange={e => set('bio', e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <button onClick={onVoltar} style={btnVoltar}>← Voltar</button>
              <button onClick={avancar} style={btnAvancar}>Próximo: Agenda →</button>
            </div>
          </div>
        )}

        {/* Passo 2 — agenda */}
        {passo === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div>
              <label style={labelDark}>Dias de atendimento *</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
                {DIAS.map(dia => (
                  <button key={dia} onClick={() => toggleDia(dia)} style={{
                    padding: '8px 16px', borderRadius: 20, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem', transition: 'all 0.15s',
                    border: `1.5px solid ${form.diasAtendimento.includes(dia) ? '#2563EB' : 'rgba(255,255,255,0.12)'}`,
                    background: form.diasAtendimento.includes(dia) ? 'rgba(37,99,235,0.25)' : 'rgba(255,255,255,0.04)',
                    color: form.diasAtendimento.includes(dia) ? '#93C5FD' : 'rgba(255,255,255,0.45)',
                    fontWeight: form.diasAtendimento.includes(dia) ? 600 : 400,
                    boxShadow: form.diasAtendimento.includes(dia) ? '0 0 0 3px rgba(37,99,235,0.15)' : 'none',
                  }}>{dia}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={labelDark}>Horário de atendimento</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 4 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>Início</div>
                  <input type="time" style={inpDark} value={form.horarioInicio} onChange={e => set('horarioInicio', e.target.value)} />
                </div>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.3rem', marginTop: 20 }}>→</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>Fim</div>
                  <input type="time" style={inpDark} value={form.horarioFim} onChange={e => set('horarioFim', e.target.value)} />
                </div>
              </div>
            </div>
            {/* Prévia */}
            {form.diasAtendimento.length > 0 && (
              <div style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>📋 Prévia da sua agenda</div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
                  <strong style={{ color: '#fff' }}>{form.nome || 'Você'}</strong> atenderá das{' '}
                  <span style={{ color: '#93C5FD', fontWeight: 600 }}>{form.horarioInicio} às {form.horarioFim}</span><br />
                  📅 <span style={{ color: '#93C5FD', fontWeight: 600 }}>{form.diasAtendimento.join(' · ')}</span>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setPasso(1)} style={btnVoltar}>← Voltar</button>
              <button onClick={finalizar} style={btnFinalizar}>✓ Criar minha conta</button>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)' }}>
          Já tem conta?{' '}
          <button onClick={onVoltar} style={{ background: 'none', border: 'none', color: '#60A5FA', cursor: 'pointer', fontSize: '0.78rem', fontFamily: 'inherit' }}>
            Fazer login
          </button>
        </div>
      </GlassCard>
    </DarkPageWrapper>
  );
}

/* ── Cadastro Paciente ── */
function CadastroPaciente({ onVoltar, onSucesso }) {
  const { useState } = React;
  const [showSenha, setShowSenha] = useState(false);
  const [toast, setToast]         = useState(null);
  const [form, setForm]           = useState({
    nome: '', email: '', senha: '', confirmarSenha: '',
    cpf: '', nascimento: '', telefone: '', convenio: '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const formatCPF = v => {
    const d = v.replace(/\D/g, '').slice(0, 11);
    return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
            .replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3')
            .replace(/(\d{3})(\d{3})/, '$1.$2')
            .replace(/(\d{3})/, '$1');
  };

  const finalizar = () => {
    if (!form.nome || !form.email || !form.senha || !form.cpf) { setToast({ msg: 'Preencha todos os campos obrigatórios.', type: 'error' }); return; }
    if (form.senha.length < 6) { setToast({ msg: 'Senha com mínimo 6 caracteres.', type: 'error' }); return; }
    if (form.senha !== form.confirmarSenha) { setToast({ msg: 'As senhas não coincidem.', type: 'error' }); return; }
    if (DB.pacientes.find(p => p.email === form.email)) { setToast({ msg: 'E-mail já cadastrado.', type: 'error' }); return; }
    const novo = { ...form, id: Date.now() };
    delete novo.confirmarSenha;
    DB.pacientes.push(novo);
    onSucesso(novo);
  };

  return (
    <DarkPageWrapper>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <GlassCard maxWidth={520}>
        <AuthLogo subtitle="Criar conta de Paciente" />
        <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem', marginBottom: 4 }}>Crie sua conta</h2>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', marginBottom: 24 }}>Acesse consultas, prontuários e o atendente virtual</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelDark}>Nome completo *</label>
            <input style={inpDark} placeholder="Seu nome completo" value={form.nome} onChange={e => set('nome', e.target.value)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelDark}>CPF *</label>
              <input style={inpDark} placeholder="000.000.000-00" value={form.cpf} onChange={e => set('cpf', formatCPF(e.target.value))} />
            </div>
            <div>
              <label style={labelDark}>Nascimento</label>
              <input style={{ ...inpDark, colorScheme: 'dark' }} type="date" value={form.nascimento} onChange={e => set('nascimento', e.target.value)} />
            </div>
          </div>
          <div>
            <label style={labelDark}>E-mail *</label>
            <input style={inpDark} type="email" placeholder="seu@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelDark}>Telefone</label>
              <input style={inpDark} placeholder="(00) 00000-0000" value={form.telefone} onChange={e => set('telefone', e.target.value)} />
            </div>
            <div>
              <label style={labelDark}>Convênio</label>
              <input style={inpDark} placeholder="Unimed, SUS…" value={form.convenio} onChange={e => set('convenio', e.target.value)} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelDark}>Senha *</label>
              <div style={{ position: 'relative' }}>
                <input style={inpDark} type={showSenha ? 'text' : 'password'} placeholder="Mín. 6 caracteres" value={form.senha} onChange={e => set('senha', e.target.value)} />
                <button onClick={() => setShowSenha(s => !s)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', width: 18, height: 18 }}>
                  {showSenha ? Icon.eyeoff : Icon.eye}
                </button>
              </div>
            </div>
            <div>
              <label style={labelDark}>Confirmar *</label>
              <input style={inpDark} type="password" placeholder="Repita a senha" value={form.confirmarSenha}
                onChange={e => set('confirmarSenha', e.target.value)}
                onKeyDown={e => e.key === 'Enter' && finalizar()} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button onClick={onVoltar} style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit' }}>← Voltar</button>
            <button onClick={finalizar} style={{ flex: 2, padding: '12px', borderRadius: 10, border: 'none', background: '#16A34A', color: '#fff', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>✓ Criar minha conta</button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)' }}>
          Já tem conta?{' '}
          <button onClick={onVoltar} style={{ background: 'none', border: 'none', color: '#60A5FA', cursor: 'pointer', fontSize: '0.78rem', fontFamily: 'inherit' }}>Fazer login</button>
        </div>
      </GlassCard>
    </DarkPageWrapper>
  );
}

/* ── Cadastro Sucesso ── */
function CadastroSucesso({ tipo, usuario, onEntrar }) {
  return (
    <DarkPageWrapper>
      <GlassCard maxWidth={440}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(22,163,74,0.15)', border: '2px solid rgba(22,163,74,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem', boxShadow: '0 0 0 8px rgba(22,163,74,0.08)' }}>
            ✓
          </div>
          <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.5rem', marginBottom: 8 }}>Conta criada!</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem' }}>
            Bem-vindo(a) ao MedSync, <strong style={{ color: 'rgba(255,255,255,0.75)' }}>{usuario.nome.split(' ')[0]}</strong>!
          </p>

          {tipo === 'medico' && (
            <div style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: 12, padding: '14px 18px', margin: '20px 0', fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, textAlign: 'left' }}>
              🗓 <strong style={{ color: '#93C5FD' }}>{usuario.horarioInicio} às {usuario.horarioFim}</strong><br />
              📅 <strong style={{ color: '#93C5FD' }}>{usuario.diasAtendimento?.join(' · ')}</strong><br />
              🩺 <strong style={{ color: '#93C5FD' }}>{usuario.especialidade}</strong>
            </div>
          )}
          {tipo === 'paciente' && (
            <div style={{ background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.2)', borderRadius: 12, padding: '12px 16px', margin: '20px 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
              Você já pode fazer login como <strong style={{ color: '#86EFAC' }}>Paciente</strong> e agendar consultas ou usar o atendente virtual.
            </div>
          )}

          <button onClick={onEntrar} style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', background: '#2563EB', color: '#fff', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginTop: 8, boxShadow: '0 4px 14px rgba(37,99,235,0.35)' }}>
            Ir para o login →
          </button>
        </div>
      </GlassCard>
    </DarkPageWrapper>
  );
}
