import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

const documentoSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório').min(2, 'Nome deve ter pelo menos 2 caracteres'),
  descricao: yup.string().required('Descrição é obrigatória').min(5, 'Descrição deve ter pelo menos 5 caracteres'),
  url: yup.string().required('URL é obrigatória').url('URL deve ter um formato válido'),
});

export const useDocumentoForm = (isEdit = false) => {
  const { handleSubmit, setValues, resetForm, values, errors } = useForm({
    validationSchema: documentoSchema,
    initialValues: {
      nome: '',
      descricao: '',
      url: '',
    },
  });

  const { value: nome, errorMessage: nomeErro } = useField<string>('nome');
  const { value: descricao, errorMessage: descricaoErro } = useField<string>('descricao');
  const { value: url, errorMessage: urlErro } = useField<string>('url');

  return {
    handleSubmit,
    setValues,
    resetForm,
    values,
    errors,
    nome,
    nomeErro,
    descricao,
    descricaoErro,
    url,
    urlErro,
  };
};
