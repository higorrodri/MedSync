function Agendamentos({ medicosFiltrados }) {
  const { useState } = React;
  const medList = medicosFiltrados || DB.medicos;
  const [consultas, setConsultas] = useState([
    { id: 1, paciente: 'Maria Clara', medico: 'Dr. Lucas Oliveira', data: '2026-05-26', horario: '08:00', status: 'Agendada' },
  ]);
  const [form, setForm] = useState({ paciente: '', medico: '', data: '', horario: '', status: 'Agendada' });
  const [toast, setToast] = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const agendar = () => {
    const { paciente, medico, data, horario } = form;
    if (!paciente || !medico || !data || !horario) { setToast({ msg: 'Preencha todos os campos!', type: 'error' }); return; }
    setConsultas(c => [...c, { ...form, id: Date.now() }]);
    setToast({ msg: 'Consulta agendada!', type: 'success' });
    setForm({ paciente: '', medico: '', data: '', horario: '', status: 'Agendada' });
  };

  const statusClass = s => ({ Agendada: 'agendada', Realizada: 'realizada', Cancelada: 'cancelada' }[s] || 'agendada');
  const ordenadas   = [...consultas].sort((a, b) => `${a.data}T${a.horario}`.localeCompare(`${b.data}T${b.horario}`));

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <div className="page-header"><h1>Agendamento de Consultas</h1><p>Gerencie os horários e compromissos</p></div>
      <div className="form-card">
        <h3>Nova Consulta</h3>
        <div className="form">
          <input placeholder="Nome do paciente" value={form.paciente} onChange={e => set('paciente', e.target.value)} />
          <select value={form.medico} onChange={e => set('medico', e.target.value)}>
            <option value="">Selecionar Médico</option>
            {medList.map(m => <option key={m.id} value={m.nome}>{m.nome} — {m.especialidade}</option>)}
          </select>
          <input type="date" value={form.data}    onChange={e => set('data', e.target.value)} />
          <input type="time" value={form.horario} onChange={e => set('horario', e.target.value)} />
          <select value={form.status} onChange={e => set('status', e.target.value)}>
            <option>Agendada</option><option>Realizada</option><option>Cancelada</option>
          </select>
          <button onClick={agendar}>{Icon.plus} Agendar Consulta</button>
        </div>
      </div>
      <div className="agenda">
        {ordenadas.length === 0
          ? <div className="empty-state">{Icon.calendar}<p>Nenhuma consulta agendada.</p></div>
          : ordenadas.map(c => (
            <div className="consulta" key={c.id}>
              <div className="consulta-info">
                <strong>{c.horario} — {c.paciente}</strong>
                <p>{c.medico} · {c.data ? new Date(c.data + 'T00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}</p>
              </div>
              <span className={`status ${statusClass(c.status)}`}>{c.status}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

function Prontuario() {
  const { useState } = React;
  const [registros, setRegistros] = useState([{ id: 1, data: '10/05/2026', queixa: 'Consulta de rotina', diagnostico: 'Saudável', prescricao: '', obs: '' }]);
  const [form, setForm]           = useState({ queixa: '', diagnostico: '', prescricao: '', obs: '' });
  const [toast, setToast]         = useState(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const salvar = () => {
    if (!form.queixa) { setToast({ msg: 'Informe a queixa principal.', type: 'error' }); return; }
    setRegistros(r => [{ ...form, id: Date.now(), data: new Date().toLocaleDateString('pt-BR') }, ...r]);
    setToast({ msg: 'Prontuário salvo!', type: 'success' });
    setForm({ queixa: '', diagnostico: '', prescricao: '', obs: '' });
  };

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <div className="page-header"><h1>Prontuário Eletrônico</h1><p>Histórico e registros clínicos</p></div>
      <div className="prontuario">
        <div className="historico">
          <h3>Histórico Clínico</h3>
          {registros.map(r => (
            <div className="registro" key={r.id}>
              <strong>{r.data}</strong><p>{r.queixa}</p>
              {r.diagnostico && <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 2 }}>Diag.: {r.diagnostico}</p>}
            </div>
          ))}
        </div>
        <div className="area-form">
          <div className="area-form-card">
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>Nova Consulta</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <textarea placeholder="Queixa principal *" value={form.queixa}       onChange={e => set('queixa', e.target.value)} />
              <textarea placeholder="Diagnóstico"        value={form.diagnostico}  onChange={e => set('diagnostico', e.target.value)} />
              <textarea placeholder="Prescrição"         value={form.prescricao}   onChange={e => set('prescricao', e.target.value)} />
              <textarea placeholder="Observações"        value={form.obs}          onChange={e => set('obs', e.target.value)} />
              <button onClick={salvar} style={{ alignSelf: 'flex-start' }}>{Icon.save} Salvar Prontuário</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
