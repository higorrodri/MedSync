function PerfilMedicos() {
  const { useState } = React;
  const [medicos, setMedicos] = useState([...DB.medicos]);
  const [selecionado, setSelecionado] = useState(null);

  const toggleOnline = (id) => {
    const idx = DB.medicos.findIndex(m => m.id === id);
    if (idx !== -1) DB.medicos[idx].online = !DB.medicos[idx].online;
    setMedicos([...DB.medicos]);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Perfil dos Médicos</h1>
        <p>Gerencie a equipe e acompanhe status e agendas</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 18 }}>
        {medicos.map(med => (
          <div key={med.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 22, boxShadow: 'var(--shadow-sm)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', alignItems: 'center', gap: 5, background: med.online ? 'rgba(22,163,74,0.1)' : 'rgba(148,163,184,0.15)', border: `1px solid ${med.online ? 'rgba(22,163,74,0.3)' : 'rgba(148,163,184,0.3)'}`, borderRadius: 20, padding: '3px 10px', fontSize: '0.72rem', fontWeight: 600, color: med.online ? '#16A34A' : '#64748B' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: med.online ? '#22C55E' : '#94A3B8', animation: med.online ? 'pulse 2s infinite' : 'none' }} />
              {med.online ? 'Online' : 'Offline'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: `2px solid ${med.online ? 'rgba(22,163,74,0.3)' : 'var(--border)'}` }}>
                {med.avatar}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{med.nome}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{med.especialidade}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace' }}>{med.crm}</div>
              </div>
            </div>
            <div style={{ background: 'var(--surface-3)', borderRadius: 10, padding: '10px 12px', marginBottom: 12, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              🕐 <strong>{med.horarioInicio} – {med.horarioFim}</strong><br />
              📅 {med.diasAtendimento?.join(', ') || 'Não configurado'}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => toggleOnline(med.id)} style={{ flex: 1, background: med.online ? 'rgba(239,68,68,0.08)' : 'rgba(22,163,74,0.08)', color: med.online ? '#DC2626' : '#16A34A', border: `1px solid ${med.online ? 'rgba(239,68,68,0.2)' : 'rgba(22,163,74,0.2)'}`, borderRadius: 8, padding: '7px 0', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                {med.online ? '⏸ Offline' : '▶ Online'}
              </button>
              <button onClick={() => setSelecionado(selecionado?.id === med.id ? null : med)} style={{ flex: 1, background: 'var(--surface-3)', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 0', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                {selecionado?.id === med.id ? '▲ Fechar' : '▼ Detalhes'}
              </button>
            </div>
            {selecionado?.id === med.id && (
              <div style={{ marginTop: 12, padding: '12px 0', borderTop: '1px solid var(--border)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <div>📧 {med.email}</div>
                <div>📞 {med.telefone || '—'}</div>
                {med.bio && <div style={{ marginTop: 6, color: 'var(--text-muted)', fontStyle: 'italic' }}>"{med.bio}"</div>}
              </div>
            )}
          </div>
        ))}
      </div>
      <style>{`@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.4)}50%{box-shadow:0 0 0 5px rgba(34,197,94,0)}}`}</style>
    </div>
  );
}

function MeuPerfil({ usuario, onSalvar }) {
  const { useState } = React;
  const [form, setForm] = useState({ ...usuario });
  const [toast, setToast] = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleDia = (dia) => set('diasAtendimento',
    form.diasAtendimento.includes(dia)
      ? form.diasAtendimento.filter(d => d !== dia)
      : [...form.diasAtendimento, dia]
  );

  const salvar = () => {
    const idx = DB.medicos.findIndex(m => m.id === usuario.id);
    if (idx !== -1) DB.medicos[idx] = { ...DB.medicos[idx], ...form };
    onSalvar(form);
    setToast({ msg: 'Perfil atualizado com sucesso!', type: 'success' });
  };

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <div className="page-header">
        <h1>Meu Perfil</h1>
        <p>Gerencie seus dados e configure sua agenda de atendimento</p>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 18, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ width: 60, height: 60, borderRadius: 16, background: 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', border: '2px solid var(--border)' }}>
          {usuario.avatar}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{form.nome}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{form.especialidade} · {form.crm}</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 4, background: usuario.online ? 'rgba(22,163,74,0.1)' : 'rgba(148,163,184,0.15)', borderRadius: 20, padding: '2px 10px', fontSize: '0.75rem', fontWeight: 600, color: usuario.online ? '#16A34A' : '#64748B' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: usuario.online ? '#22C55E' : '#94A3B8', display: 'inline-block' }} />
            {usuario.online ? 'Online' : 'Offline'}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>Dados pessoais</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div><label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Nome completo</label><input style={inp} value={form.nome} onChange={e => set('nome', e.target.value)} /></div>
            <div><label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>E-mail</label><input style={{ ...inp, color: 'var(--text-muted)' }} value={form.email} readOnly /></div>
            <div><label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Telefone</label><input style={inp} placeholder="(00) 00000-0000" value={form.telefone} onChange={e => set('telefone', e.target.value)} /></div>
            <div><label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Bio</label><textarea style={{ ...inp, minHeight: 80, resize: 'vertical' }} value={form.bio} onChange={e => set('bio', e.target.value)} /></div>
          </div>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>Minha agenda</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Dias de atendimento</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {DIAS.map(dia => (
                  <button key={dia} onClick={() => toggleDia(dia)} style={{ padding: '6px 12px', borderRadius: 20, border: '1.5px solid', borderColor: form.diasAtendimento.includes(dia) ? 'var(--brand)' : 'var(--border)', background: form.diasAtendimento.includes(dia) ? 'var(--brand-subtle)' : 'transparent', color: form.diasAtendimento.includes(dia) ? 'var(--brand)' : 'var(--text-muted)', fontWeight: form.diasAtendimento.includes(dia) ? 600 : 400, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>{dia}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Horário</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1 }}><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4 }}>Início</div><input type="time" style={inp} value={form.horarioInicio} onChange={e => set('horarioInicio', e.target.value)} /></div>
                <div style={{ color: 'var(--text-muted)', marginTop: 18 }}>→</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4 }}>Fim</div><input type="time" style={inp} value={form.horarioFim} onChange={e => set('horarioFim', e.target.value)} /></div>
              </div>
            </div>
            <div style={{ background: 'var(--surface-3)', borderRadius: 10, padding: 12, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              🗓 <strong>{form.horarioInicio} – {form.horarioFim}</strong><br />
              {form.diasAtendimento.length > 0 ? form.diasAtendimento.join(' · ') : <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Nenhum dia selecionado</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={salvar} style={{ background: 'var(--brand)', color: '#fff', border: 'none', borderRadius: 10, padding: '11px 28px', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          {Icon.save} Salvar alterações
        </button>
      </div>
    </div>
  );
}
