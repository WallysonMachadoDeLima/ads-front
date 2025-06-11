import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const servidorSchema = yup.object({
  servidor: yup.string().required('Nome é obrigatório'),
  disciplina: yup.string().required('Disciplina é obrigatória'),
});

export const useServidorForm = () => {
  const { handleSubmit } = useForm({ validationSchema: servidorSchema });

  const { value: servidor, errorMessage: servidorErro } = useField<string>('servidor');
  const { value: disciplina, errorMessage: disciplinaErro } = useField<string>('disciplina');

  return {
    handleSubmit,
    servidor, servidorErro,
    disciplina, disciplinaErro,
  };
};
