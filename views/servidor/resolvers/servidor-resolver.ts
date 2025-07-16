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
  dataNascimento: yup.string().required('Data de nascimento é obrigatória'),
  sexo: yup.number().required('Sexo é obrigatório'),
  situacao: yup.number().required('Situação é obrigatória'),
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
      dataNascimento: '',
      sexo: 0,
      situacao: 1, // Ativo como padrão
    },
  });

  const { value: nome, errorMessage: nomeErro } = useField<string>('nome');
  const { value: cpf, errorMessage: cpfErro } = useField<string>('cpf');
  const { value: email, errorMessage: emailErro } = useField<string>('email');
  const { value: senha, errorMessage: senhaErro } = useField<string>('senha');
  const { value: tipo, errorMessage: tipoErro } = useField<number>('tipo');
  const { value: dataNascimento, errorMessage: dataNascimentoErro } = useField<string>('dataNascimento');
  const { value: sexo, errorMessage: sexoErro } = useField<number>('sexo');
  const { value: situacao, errorMessage: situacaoErro } = useField<number>('situacao');

  return {
    handleSubmit,
    setValues,
    resetForm,
    nome, nomeErro,
    cpf, cpfErro,
    email, emailErro,
    senha, senhaErro,
    tipo, tipoErro,
    dataNascimento, dataNascimentoErro,
    sexo, sexoErro,
    situacao, situacaoErro,
  };
};
