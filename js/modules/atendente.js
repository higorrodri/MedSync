function AtendenteVirtual({ medicoOnline }) {
  const { useState, useEffect, useRef } = React;
  const [msgs, setMsgs]     = useState([{
    role: 'assistant',
    content: medicoOnline
      ? 'Olá! Sou o MedBot, assistente virtual do MedSync. Seu médico está online agora — você pode aguardar o atendimento direto. Posso ajudar com alguma dúvida enquanto isso?'
      : 'Olá! Sou o MedBot 🤖, assistente virtual de saúde do MedSync. No momento seu médico está offline, mas estou aqui para ajudar com dúvidas gerais de saúde, informações sobre consultas e agendamentos. Como posso te ajudar?',
  }]);
  const [input, setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef           = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const enviar = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim() };
    const newMsgs = [...msgs, userMsg];
    setMsgs(newMsgs); setInput(''); setLoading(true);
    try {
      const res  = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `Você é MedBot, atendente virtual de saúde do MedSync. Responda sempre em português brasileiro, de forma amigável e empática. Pode tirar dúvidas gerais de saúde, orientar sobre agendamentos e informações da clínica. NUNCA substitua avaliação médica. Para emergências, sempre oriente ligar 192 (SAMU) ou ir ao pronto-socorro.`,
          messages: newMsgs.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || '').join('') || 'Houve um erro. Tente novamente.';
      setMsgs(m => [...m, { role: 'assistant', content: text }]);
    } catch {
      setMsgs(m => [...m, { role: 'assistant', content: 'Erro de conexão. Tente novamente.' }]);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Atendente Virtual</h1>
        <p>{medicoOnline ? '✅ Médico online — assistente disponível para dúvidas extras' : '🤖 Médico offline — assistente IA disponível para te ajudar'}</p>
      </div>
      {!medicoOnline && (
        <div style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: 12, padding: '14px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.875rem', color: 'var(--brand)' }}>
          <span style={{ fontSize: '1.2rem' }}>💡</span>
          <span>Médico offline. O <strong>MedBot</strong> está disponível para dúvidas de saúde e informações da clínica.</span>
        </div>
      )}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, display: 'flex', flexDirection: 'column', height: 480, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        {/* Header do chat */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, background: 'var(--surface-2)' }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#2563EB,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>🤖</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>MedBot — Assistente Virtual</div>
            <div style={{ fontSize: '0.75rem', color: '#22C55E', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} /> Online · Powered by IA
            </div>
          </div>
        </div>
        {/* Mensagens */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: m.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 8 }}>
              {m.role === 'assistant' && <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: 'linear-gradient(135deg,#2563EB,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>🤖</div>}
              <div style={{ maxWidth: '72%', background: m.role === 'user' ? 'var(--brand)' : 'var(--surface-3)', color: m.role === 'user' ? '#fff' : 'var(--text-primary)', padding: '10px 14px', borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', fontSize: '0.875rem', lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#2563EB,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>🤖</div>
              <div style={{ background: 'var(--surface-3)', padding: '10px 16px', borderRadius: '14px 14px 14px 4px', display: 'flex', gap: 5, alignItems: 'center' }}>
                {[0,1,2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#94A3B8', animation: 'typing 1.2s ease infinite', animationDelay: `${i * 0.2}s`, display: 'inline-block' }} />)}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        {/* Input */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10, alignItems: 'center' }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && enviar()} placeholder="Digite sua mensagem…"
            style={{ flex: 1, border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', background: 'var(--surface-2)', color: 'var(--text-primary)' }} />
          <button onClick={enviar} disabled={loading || !input.trim()} style={{ width: 40, height: 40, borderRadius: 10, background: input.trim() && !loading ? 'var(--brand)' : 'var(--surface-3)', color: input.trim() && !loading ? '#fff' : 'var(--text-muted)', border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {Icon.send}
          </button>
        </div>
      </div>
      <style>{`@keyframes typing{0%,100%{opacity:.3;transform:translateY(0)}50%{opacity:1;transform:translateY(-3px)}}`}</style>
    </div>
  );
}
