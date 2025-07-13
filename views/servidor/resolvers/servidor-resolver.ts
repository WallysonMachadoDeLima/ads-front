// src/sections/servidor/resolvers/servidor-resolver.ts
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const getValidationSchema = (isEdit = false) => yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().length(11, 'CPF inválido').required('CPF é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: isEdit 
    ? yup.string().min(6, 'Mínimo 6 caracteres').optional()
    : yup.string().min(6, 'Mínimo 6 caracteres').required('Senha é obrigatória'),
  tipo: yup.number().required('Tipo é obrigatório'),
});

export const useServidorForm = (isEdit = false) => {
  const { handleSubmit, setValues, resetForm } = useForm({
    validationSchema: getValidationSchema(isEdit),
    initialValues: {
      nome: '',
      cpf: '',
      email: '',
      senha: '',
      tipo: 0,
    },
  });

  const { value: nome, errorMessage: nomeErro } = useField<string>('nome');
  const { value: cpf, errorMessage: cpfErro } = useField<string>('cpf');
  const { value: email, errorMessage: emailErro } = useField<string>('email');
  const { value: senha, errorMessage: senhaErro } = useField<string>('senha');
  const { value: tipo, errorMessage: tipoErro } = useField<number>('tipo');

  return {
    handleSubmit,
    setValues,
    resetForm,
    nome, nomeErro,
    cpf, cpfErro,
    email, emailErro,
    senha, senhaErro,
    tipo, tipoErro,
  };
};
