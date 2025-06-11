import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const validationSchema = yup.object({
  servidorId: yup.string().required('Servidor é obrigatório'),
  disciplina: yup.string().required('Disciplina é obrigatória'),
});

export const useCorpoDocenteForm = () => {
  const { handleSubmit } = useForm({ validationSchema });

  const { value: servidorId, errorMessage: servidorIdErro } = useField<string>('servidor');
  const { value: disciplina, errorMessage: disciplinaErro } = useField<string>('disciplina');

  return {
    handleSubmit,
    servidorId, servidorIdErro,
    disciplina, disciplinaErro,
  };
};
