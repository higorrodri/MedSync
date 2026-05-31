function Pacientes() {
  const { useState } = React;
  const [pacientes, setPacientes] = useState([...DB.pacientes]);
  const [busca, setBusca]         = useState('');
  const [form, setForm]           = useState({ nome: '', cpf: '', nascimento: '', telefone: '', convenio: '' });
  const [toast, setToast]         = useState(null);
  const [editId, setEditId]       = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const formatCPF = v => { const d = v.replace(/\D/g,'').slice(0,11); return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,'$1.$2.$3-$4').replace(/(\d{3})(\d{3})(\d{3})/,'$1.$2.$3').replace(/(\d{3})(\d{3})/,'$1.$2').replace(/(\d{3})/,'$1'); };
  const formatTel = v => { const d = v.replace(/\D/g,'').slice(0,11); if(d.length>=11)return d.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3'); if(d.length>=10)return d.replace(/(\d{2})(\d{4})(\d{4})/,'($1) $2-$3'); return d; };

  const salvar = () => {
    const { nome, cpf, telefone, convenio } = form;
    if (!nome || !cpf || !telefone || !convenio) { setToast({ msg: 'Preencha todos os campos obrigatórios.', type: 'error' }); return; }
    if (editId) {
      const idx = DB.pacientes.findIndex(p => p.id === editId);
      if (idx !== -1) DB.pacientes[idx] = { ...form, id: editId };
      setPacientes([...DB.pacientes]); setEditId(null); setToast({ msg: 'Paciente atualizado!', type: 'success' });
    } else {
      DB.pacientes.push({ ...form, id: Date.now() }); setPacientes([...DB.pacientes]); setToast({ msg: 'Paciente cadastrado!', type: 'success' });
    }
    setForm({ nome: '', cpf: '', nascimento: '', telefone: '', convenio: '' });
  };
  const editar  = p => { setForm(p); setEditId(p.id); };
  const excluir = id => { const idx = DB.pacientes.findIndex(p => p.id === id); if (idx !== -1) DB.pacientes.splice(idx, 1); setPacientes([...DB.pacientes]); };
  const filtrados = pacientes.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()) || p.cpf.includes(busca));

  return (
    <div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <div className="page-header"><h1>{editId ? 'Editar Paciente' : 'Cadastro de Pacientes'}</h1><p>Gerencie os pacientes da clínica</p></div>
      <div className="form-card">
        <h3>{editId ? 'Editar dados' : 'Novo paciente'}</h3>
        <div className="form">
          <input placeholder="Nome completo *"  value={form.nome}       onChange={e => set('nome', e.target.value)} />
          <input placeholder="CPF *"            value={form.cpf}        onChange={e => set('cpf', formatCPF(e.target.value))} />
          <input type="date"                    value={form.nascimento}  onChange={e => set('nascimento', e.target.value)} />
          <input placeholder="Telefone *"       value={form.telefone}   onChange={e => set('telefone', formatTel(e.target.value))} />
          <input placeholder="Convênio *"       value={form.convenio}   onChange={e => set('convenio', e.target.value)} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={salvar}>{Icon.plus} {editId ? 'Salvar Alterações' : 'Cadastrar Paciente'}</button>
            {editId && <button className="btn-secondary" onClick={() => { setEditId(null); setForm({ nome:'',cpf:'',nascimento:'',telefone:'',convenio:'' }); }}>Cancelar</button>}
          </div>
        </div>
      </div>
      <div className="topo">
        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{filtrados.length} paciente{filtrados.length !== 1 ? 's' : ''}</span>
        <input className="busca" placeholder="Buscar por nome ou CPF…" value={busca} onChange={e => setBusca(e.target.value)} />
      </div>
      <div className="table-wrapper">
        <table>
          <thead><tr><th>Nome</th><th>CPF</th><th>Telefone</th><th>Convênio</th><th>Ações</th></tr></thead>
          <tbody>
            {filtrados.length === 0
              ? <tr><td colSpan={5}><div className="empty-state">{Icon.patients}<p>Nenhum paciente encontrado.</p></div></td></tr>
              : filtrados.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 500 }}>{p.nome}</td>
                  <td style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.825rem' }}>{p.cpf}</td>
                  <td>{p.telefone}</td>
                  <td><span style={{ background: 'var(--brand-subtle)', color: 'var(--brand)', padding: '2px 10px', borderRadius: 20, fontSize: '0.775rem', fontWeight: 500 }}>{p.convenio}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-secondary btn-sm" onClick={() => editar(p)}>Editar</button>
                      <button className="btn-danger btn-sm"    onClick={() => excluir(p.id)}>Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
