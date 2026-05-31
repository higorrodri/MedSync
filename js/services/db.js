const DB = {
  medicos: [
    {
      id: 1, nome: 'Dr. Lucas Oliveira', email: 'lucas@medsync.com', senha: '123',
      crm: 'CRM/PB 12345', especialidade: 'Clínica Geral', telefone: '(83) 99999-0001',
      bio: 'Médico com 10 anos de experiência em clínica geral.',
      diasAtendimento: ['Terça', 'Quinta'],
      horarioInicio: '07:00', horarioFim: '13:00',
      online: true, avatar: '👨‍⚕️', consultas: 8,
    },
    {
      id: 2, nome: 'Dra. Ana Costa', email: 'ana@medsync.com', senha: '123',
      crm: 'CRM/PB 23456', especialidade: 'Cardiologia', telefone: '(83) 99999-0002',
      bio: 'Especialista em cardiologia com foco em prevenção.',
      diasAtendimento: ['Segunda', 'Quarta', 'Sexta'],
      horarioInicio: '08:00', horarioFim: '17:00',
      online: false, avatar: '👩‍⚕️', consultas: 5,
    },
    {
      id: 3, nome: 'Dr. Rafael Mendes', email: 'rafael@medsync.com', senha: '123',
      crm: 'CRM/PB 34567', especialidade: 'Pediatria', telefone: '(83) 99999-0003',
      bio: 'Pediatra dedicado ao cuidado infantil desde 2010.',
      diasAtendimento: ['Segunda', 'Terça', 'Quinta'],
      horarioInicio: '09:00', horarioFim: '16:00',
      online: true, avatar: '👨‍⚕️', consultas: 6,
    },
  ],
  pacientes: [
    {
      id: 1, nome: 'João Silva', email: 'joao@email.com', senha: '123',
      cpf: '123.456.789-00', nascimento: '1985-03-12',
      telefone: '(83) 99999-9999', convenio: 'Unimed',
    },
  ],
};

/* Constantes de formulário usadas em múltiplos arquivos */
const DIAS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const ESPECIALIDADES = [
  'Clínica Geral', 'Cardiologia', 'Dermatologia', 'Ginecologia', 'Neurologia',
  'Oftalmologia', 'Ortopedia', 'Pediatria', 'Psiquiatria', 'Urologia', 'Outra',
];
