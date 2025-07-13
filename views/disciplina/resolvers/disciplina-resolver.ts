import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const validationSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório').min(3, 'Mínimo 3 caracteres'),
  codigo: yup.string().required('Código é obrigatório').min(2, 'Mínimo 2 caracteres'),
  descricao: yup.string().required('Descrição é obrigatória').min(10, 'Mínimo 10 caracteres'),
  objetivos: yup.string().required('Objetivos são obrigatórios').min(10, 'Mínimo 10 caracteres'),
  conteudo: yup.string().required('Conteúdo é obrigatório').min(10, 'Mínimo 10 caracteres'),
});

export const useDisciplinaForm = (isEdit = false) => {
  const { handleSubmit, setValues, resetForm } = useForm({
    validationSchema,
    initialValues: {
      nome: '',
      codigo: '',
      descricao: '',
      objetivos: '',
      conteudo: '',
    },
  });

  const { value: nome, errorMessage: nomeErro } = useField<string>('nome');
  const { value: codigo, errorMessage: codigoErro } = useField<string>('codigo');
  const { value: descricao, errorMessage: descricaoErro } = useField<string>('descricao');
  const { value: objetivos, errorMessage: objetivosErro } = useField<string>('objetivos');
  const { value: conteudo, errorMessage: conteudoErro } = useField<string>('conteudo');

  return {
    handleSubmit,
    setValues,
    resetForm,
    nome, nomeErro,
    codigo, codigoErro,
    descricao, descricaoErro,
    objetivos, objetivosErro,
    conteudo, conteudoErro,
  };
};
