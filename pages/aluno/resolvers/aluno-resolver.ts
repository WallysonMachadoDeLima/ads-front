import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const validationSchema = yup.object({
  idAluno: yup
    .string(),
  nome: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  telefone: yup.string().required('Telefone é obrigatório'),
  matricula: yup.string().required('Matrícula é obrigatória'),
});

export const useAlunoForm = () => {
  const { handleSubmit } = useForm({ validationSchema });

  const { value: idAluno, errorMessage: idAlunoErro } = useField<string>('idAluno');
  const { value: nome, errorMessage: nomeErro } = useField<string>('nome');
  const { value: cpf, errorMessage: cpfErro } = useField<string>('cpf');
  const { value: email, errorMessage: emailErro } = useField<string>('email');
  const { value: telefone, errorMessage: telefoneErro } = useField<string>('telefone');
  const { value: matricula, errorMessage: matriculaErro } = useField<string>('matricula');

  return {
    handleSubmit,
    idAluno, idAlunoErro,
    nome, nomeErro,
    cpf, cpfErro,
    email, emailErro,
    telefone, telefoneErro,
    matricula, matriculaErro,
  };
};
