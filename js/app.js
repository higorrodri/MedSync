const { useState } = React;

function App() {
  const [tela, setTela]                   = useState('landing');
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [perfil, setPerfil]               = useState(null);
  const [cadastroSucesso, setCadastroSucesso] = useState(null);

  const entrar = ({ usuario, perfil: p }) => {
    setUsuarioLogado(usuario);
    setPerfil(p);
    setTela('app');
  };

  const sair = () => {
    setTela('landing');
    setUsuarioLogado(null);
    setPerfil(null);
  };

  /* ── Cadastros ── */
  if (tela === 'cadastro-medico') {
    return <CadastroMedico
      onVoltar={() => setTela('login')}
      onSucesso={u => { setCadastroSucesso({ tipo: 'medico', usuario: u }); setTela('sucesso'); }}
    />;
  }
  if (tela === 'cadastro-paciente') {
    return <CadastroPaciente
      onVoltar={() => setTela('login')}
      onSucesso={u => { setCadastroSucesso({ tipo: 'paciente', usuario: u }); setTela('sucesso'); }}
    />;
  }
  if (tela === 'sucesso' && cadastroSucesso) {
    return <CadastroSucesso
      tipo={cadastroSucesso.tipo}
      usuario={cadastroSucesso.usuario}
      onEntrar={() => setTela('login')}
    />;
  }

  /* ── Páginas públicas ── */
  if (tela === 'landing') return <Landing onEntrar={() => setTela('login')} />;
  if (tela === 'login')   return <Login
    onEntrar={entrar}
    onCadastroMedico={() => setTela('cadastro-medico')}
    onCadastroPaciente={() => setTela('cadastro-paciente')}
    onLanding={() => setTela('landing')}
  />;

  /* ── App autenticado ── */
  if (perfil === 'paciente') return <PainelPaciente usuario={usuarioLogado} onSair={sair} />;
  return <PainelApp usuario={usuarioLogado} perfil={perfil} onSair={sair} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
