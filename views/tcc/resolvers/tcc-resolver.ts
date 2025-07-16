import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const validationSchema = yup.object({
  alunoId: yup.number().required('Aluno é obrigatório').min(1, 'Selecione um aluno'),
  tituloProvisorio: yup.string().required('Título provisório é obrigatório').min(5, 'Mínimo 5 caracteres'),
  resumo: yup.string().required('Resumo é obrigatório').min(50, 'Mínimo 50 caracteres'),
  areaTematica: yup.string().required('Área temática é obrigatória').min(3, 'Mínimo 3 caracteres'),
  orientadorId: yup.number().required('Orientador é obrigatório').min(1, 'Selecione um orientador'),
  coorientadorId: yup.number().nullable(),
  arquivoProposta: yup.string().nullable(),
  periodo: yup.string().required('Período é obrigatório'),
  dataPrevistaDefesa: yup.string().required('Data prevista para defesa é obrigatória'),
  status: yup.number().required('Status é obrigatório'),
  observacoes: yup.string().nullable(),
});

export const useTccForm = (isEdit = false) => {
  const { handleSubmit, setValues, resetForm } = useForm({
    validationSchema,
    initialValues: {
      alunoId: 0,
      tituloProvisorio: '',
      resumo: '',
      areaTematica: '',
      orientadorId: 0,
      coorientadorId: null,
      arquivoProposta: null,
      periodo: '',
      dataPrevistaDefesa: '',
      status: 0,
      observacoes: '',
    },
  });

  const { value: alunoId, errorMessage: alunoIdErro } = useField<number>('alunoId');
  const { value: tituloProvisorio, errorMessage: tituloProvErro } = useField<string>('tituloProvisorio');
  const { value: resumo, errorMessage: resumoErro } = useField<string>('resumo');
  const { value: areaTematica, errorMessage: areaTemErro } = useField<string>('areaTematica');
  const { value: orientadorId, errorMessage: orientadorIdErro } = useField<number>('orientadorId');
  const { value: coorientadorId, errorMessage: coorientadorIdErro } = useField<number | null>('coorientadorId');
  const { value: arquivoProposta, errorMessage: arquivoErro } = useField<string | null>('arquivoProposta');
  const { value: periodo, errorMessage: periodoErro } = useField<string>('periodo');
  const { value: dataPrevistaDefesa, errorMessage: dataDefesaErro } = useField<string>('dataPrevistaDefesa');
  const { value: status, errorMessage: statusErro } = useField<number>('status');
  const { value: observacoes, errorMessage: obsErro } = useField<string>('observacoes');

  return {
    handleSubmit,
    setValues,
    resetForm,
    alunoId, alunoIdErro,
    tituloProvisorio, tituloProvErro,
    resumo, resumoErro,
    areaTematica, areaTemErro,
    orientadorId, orientadorIdErro,
    coorientadorId, coorientadorIdErro,
    arquivoProposta, arquivoErro,
    periodo, periodoErro,
    dataPrevistaDefesa, dataDefesaErro,
    status, statusErro,
    observacoes, obsErro,
  };
};
