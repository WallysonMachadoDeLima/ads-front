import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const validationSchema = yup.object({
  servidorId: yup.number().required('Servidor é obrigatório'),
  disciplina: yup.number().required('Disciplina é obrigatória'),
  turno: yup.number().required('Turno é obrigatório'),
  cargaHorariaSemanal: yup.string().required('Carga horária é obrigatória'),
  tipoContrato: yup.number().required('Tipo de contrato é obrigatório'),
  observacoes: yup.string().required('Observações são obrigatórias'),
  situacao: yup.number().required('Situação é obrigatória'),
});

export const useCorpoDocenteForm = () => {
  const { handleSubmit, setValues, resetForm, values } = useForm({
    validationSchema,
    initialValues: {
      servidorId: 0,
      disciplina: 0,
      turno: 1, // Matutino como padrão
      cargaHorariaSemanal: '40h', // 40h como padrão
      tipoContrato: 0,
      observacoes: '',
      situacao: 1, // Ativo como padrão
    },
  });

  const { value: servidorId, errorMessage: servidorIdErro } = useField<number>('servidorId');
  const { value: disciplina, errorMessage: disciplinaErro } = useField<number>('disciplina');
  const { value: turno, errorMessage: turnoErro } = useField<number>('turno');
  const { value: cargaHorariaSemanal, errorMessage: cargaHorariaErro } = useField<string>('cargaHorariaSemanal');
  const { value: tipoContrato, errorMessage: tipoContratoErro } = useField<number>('tipoContrato');
  const { value: observacoes, errorMessage: observacoesErro } = useField<string>('observacoes');
  const { value: situacao, errorMessage: situacaoErro } = useField<number>('situacao');

  return {
    handleSubmit,
    setValues,
    resetForm,
    values,
    servidorId, servidorIdErro,
    disciplina, disciplinaErro,
    turno, turnoErro,
    cargaHorariaSemanal, cargaHorariaErro,
    tipoContrato, tipoContratoErro,
    observacoes, observacoesErro,
    situacao, situacaoErro,
  };
};
