import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const validationSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().length(11, 'CPF inválido').required('CPF é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  telefone: yup.string().required('Telefone é obrigatório'),
  matricula: yup.string().required('Matrícula é obrigatória'),
  dataNascimento: yup.string().required('Data de nascimento é obrigatória'),
  sexo: yup.number().required('Sexo é obrigatório'),
  periodo: yup.number().required('Período é obrigatório'),
  situacao: yup.number().required('Situação é obrigatória'),
});

export const useAlunoForm = (isEdit = false) => {
  const { handleSubmit, setValues, resetForm } = useForm({
    validationSchema,
    initialValues: {
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      matricula: '',
      dataNascimento: '',
      sexo: 0,
      periodo: 1,
      situacao: 1, // Ativo como padrão
    },
  });

  const { value: nome, errorMessage: nomeErro } = useField<string>('nome');
  const { value: cpf, errorMessage: cpfErro } = useField<string>('cpf');
  const { value: email, errorMessage: emailErro } = useField<string>('email');
  const { value: telefone, errorMessage: telefoneErro } = useField<string>('telefone');
  const { value: matricula, errorMessage: matriculaErro } = useField<string>('matricula');
  const { value: dataNascimento, errorMessage: dataNascimentoErro } = useField<string>('dataNascimento');
  const { value: sexo, errorMessage: sexoErro } = useField<number>('sexo');
  const { value: periodo, errorMessage: periodoErro } = useField<number>('periodo');
  const { value: situacao, errorMessage: situacaoErro } = useField<number>('situacao');

  return {
    handleSubmit,
    setValues,
    resetForm,
    nome, nomeErro,
    cpf, cpfErro,
    email, emailErro,
    telefone, telefoneErro,
    matricula, matriculaErro,
    dataNascimento, dataNascimentoErro,
    sexo, sexoErro,
    periodo, periodoErro,
    situacao, situacaoErro,
  };
};
