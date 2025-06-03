import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

export const servidorSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().length(11, 'CPF inválido').required('CPF é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: yup.string().min(6, 'Mínimo 6 caracteres').required('Senha é obrigatória'),
  tipo: yup.string().required('Tipo é obrigatório'),
});

export const useServidorForm = () => {
  const { handleSubmit } = useForm({ validationSchema: servidorSchema });

  const { value: nome, errorMessage: nomeErro } = useField<string>('nome');
  const { value: cpf, errorMessage: cpfErro } = useField<string>('cpf');
  const { value: email, errorMessage: emailErro } = useField<string>('email');
  const { value: senha, errorMessage: senhaErro } = useField<string>('senha');
  const { value: tipo, errorMessage: tipoErro } = useField<string>('tipo');

  return {
    handleSubmit,
    nome, nomeErro,
    cpf, cpfErro,
    email, emailErro,
    senha, senhaErro,
    tipo, tipoErro,
  };
};
