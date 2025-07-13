import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const validationSchema = yup.object({
  servidorId: yup.string().required('Servidor é obrigatório'),
  disciplina: yup.string().required('Disciplina é obrigatória'),
});

export const useCorpoDocenteForm = () => {
  const { handleSubmit, setValues, resetForm, values } = useForm({
    validationSchema,
    initialValues: {
      servidorId: '',
      disciplina: '',
    },
  });

  const { value: servidorId, errorMessage: servidorIdErro } = useField<string>('servidorId');
  const { value: disciplina, errorMessage: disciplinaErro } = useField<string>('disciplina');

  return {
    handleSubmit,
    setValues,
    resetForm,
    values,
    servidorId, servidorIdErro,
    disciplina, disciplinaErro,
  };
};
