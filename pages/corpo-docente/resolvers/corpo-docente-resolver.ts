import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const validationSchema = yup.object({
  disciplina: yup.string().required('Disciplina é obrigatória'),
});

export const useCorpoDocenteForm = () => {
  const { handleSubmit, values } = useForm({ validationSchema });

  const { value: servidorId, errorMessage: servidorIdErro } = useField<string>('servidor');
  const { value: disciplina, errorMessage: disciplinaErro } = useField<string>('disciplina');

  return {
    handleSubmit,
    values,
    servidorId, servidorIdErro,
    disciplina, disciplinaErro,
  };
};
