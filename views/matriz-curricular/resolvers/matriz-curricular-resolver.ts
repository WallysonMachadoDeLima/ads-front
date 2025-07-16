import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export const validationSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório').min(3, 'Mínimo 3 caracteres'),
  ano: yup.number().required('Ano é obrigatório').min(2020, 'Ano mínimo 2020').max(2030, 'Ano máximo 2030'),
  disciplinaIds: yup.array().of(yup.number()).min(1, 'Selecione pelo menos uma disciplina').required('Disciplinas são obrigatórias'),
  observacao: yup.string().required('Observação é obrigatória').min(10, 'Mínimo 10 caracteres'),
});

export const useMatrizCurricularForm = (isEdit = false) => {
  const { handleSubmit, setValues, resetForm } = useForm({
    validationSchema,
    initialValues: {
      nome: '',
      ano: new Date().getFullYear(),
      disciplinaIds: [] as number[],
      observacao: '',
    },
  });

  const { value: nome, errorMessage: nomeErro } = useField<string>('nome');
  const { value: ano, errorMessage: anoErro } = useField<number>('ano');
  const { value: disciplinaIds, errorMessage: disciplinaIdsErro } = useField<number[]>('disciplinaIds');
  const { value: observacao, errorMessage: observacaoErro } = useField<string>('observacao');

  return {
    handleSubmit,
    setValues,
    resetForm,
    nome, nomeErro,
    ano, anoErro,
    disciplinaIds, disciplinaIdsErro,
    observacao, observacaoErro,
  };
};
