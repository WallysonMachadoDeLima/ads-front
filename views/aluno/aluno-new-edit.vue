<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { paths } from '@/routes/paths';
import { ALUNO_BREADCRUMBS_NEW_EDIT } from './enums/aluno-enums';
import { useAlunoForm } from './resolvers/aluno-resolver';
import { AlunoService } from '~/services/aluno-service';
import { useNotification } from '~/composables/useNotification';
import type { ICreateUpdateAlunoDto, IAlunoDto } from '~/interfaces';
import type { IEnumItem } from '~/services/enums-service';

//------------------------------------------------------------------------------

const props = defineProps<{
  currentData?: {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    matricula: string;
  };
  isEdit?: boolean;
  currentId?: string | number;
}>();

const router = useRouter();
const { success, error: showError } = useNotification();
const id = Number(props.currentId) || 0;
const isEdit = props.isEdit || !!id;

// Arrays para os selects
const sexos = ref<IEnumItem[]>([
  { value: 0, name: 'Masculino', description: 'Masculino' },
  { value: 1, name: 'Feminino', description: 'Feminino' },
  { value: 2, name: 'Outros', description: 'Outros' }
]);

const periodos = ref<IEnumItem[]>([
  { value: 1, name: '1º Período', description: '1º Período' },
  { value: 2, name: '2º Período', description: '2º Período' },
  { value: 3, name: '3º Período', description: '3º Período' },
  { value: 4, name: '4º Período', description: '4º Período' },
  { value: 5, name: '5º Período', description: '5º Período' },
  { value: 6, name: '6º Período', description: '6º Período' },
]);

const situacoes = ref<IEnumItem[]>([
  { value: 1, name: 'Ativo', description: 'Aluno ativo' },
  { value: 2, name: 'Inativo', description: 'Aluno inativo' },
  { value: 3, name: 'Trancado', description: 'Matrícula trancada' },
  { value: 4, name: 'Formado', description: 'Aluno formado' },
]);

const {
  handleSubmit,
  setValues,
  nome, nomeErro,
  cpf, cpfErro,
  email, emailErro,
  telefone, telefoneErro,
  matricula, matriculaErro,
  dataNascimento, dataNascimentoErro,
  sexo, sexoErro,
  periodo, periodoErro,
  situacao, situacaoErro,
} = useAlunoForm(isEdit);

onMounted(async () => {
  if (isEdit && id) {
    try {
      const aluno: IAlunoDto = await AlunoService.findOneById(id);
      
      // Mapear strings de volta para números (caso a API retorne strings)
      const sexoReverseMap: { [key: string]: number } = {
        'Masculino': 0,
        'Feminino': 1,
        'Outros': 2
      };

      const periodoReverseMap: { [key: string]: number } = {
        '1º Período': 1,
        '2º Período': 2,
        '3º Período': 3,
        '4º Período': 4,
        '5º Período': 5,
        '6º Período': 6
      };

      const situacaoReverseMap: { [key: string]: number } = {
        'Ativo': 1,
        'Inativo': 2,
        'Trancado': 3,
        'Formado': 4
      };

      // Converter data ISO para formato YYYY-MM-DD
      const formatarDataParaInput = (dataISO: string): string => {
        if (!dataISO) return '';
        try {
          // Extrair apenas a parte da data (YYYY-MM-DD) do ISO string
          if (dataISO.includes('T')) {
            return dataISO.split('T')[0];
          }
          return dataISO;
        } catch {
          return '';
        }
      };

      setValues({
        nome: aluno.nome,
        cpf: aluno.cpf,
        email: aluno.email,
        telefone: aluno.telefone,
        matricula: aluno.matricula,
        dataNascimento: formatarDataParaInput(aluno.dataNascimento),
        sexo: typeof aluno.sexo === 'string' ? sexoReverseMap[aluno.sexo] || 0 : aluno.sexo,
        periodo: typeof aluno.periodo === 'string' ? periodoReverseMap[aluno.periodo] || 1 : aluno.periodo,
        situacao: typeof aluno.situacao === 'string' ? situacaoReverseMap[aluno.situacao] || 1 : aluno.situacao,
      });
    } catch (error) {
      console.error('Erro ao carregar dados do aluno:', error);
      showError('Erro ao carregar dados do aluno.');
    }
  }
});

// Interface para os dados do formulário (números)
interface IAlunoFormData {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  matricula: string;
  dataNascimento: string;
  sexo: number;
  periodo: number;
  situacao: number;
}

const onSubmit = handleSubmit(async (formData: IAlunoFormData) => {
  try {
    // Mapear valores para strings conforme API
    const sexoMap: { [key: number]: string } = {
      0: 'Masculino',
      1: 'Feminino',
      2: 'Outros'
    };

    const periodoMap: { [key: number]: string } = {
      1: '1º Período',
      2: '2º Período',
      3: '3º Período',
      4: '4º Período',
      5: '5º Período',
      6: '6º Período'
    };

    const situacaoMap: { [key: number]: string } = {
      1: 'Ativo',
      2: 'Inativo',
      3: 'Trancado',
      4: 'Formado'
    };

    // Preparar dados para envio com types corretos para API
    const payload: any = {
      nome: formData.nome,
      cpf: formData.cpf,
      email: formData.email,
      telefone: formData.telefone,
      matricula: formData.matricula,
      dataNascimento: formData.dataNascimento,
      sexo: sexoMap[formData.sexo] || 'Masculino',
      periodo: periodoMap[formData.periodo] || '1º Período',
      situacao: situacaoMap[formData.situacao] || 'Ativo',
    };

    console.log('Payload para API:', payload);

    if (isEdit) {
      await AlunoService.update(id, payload);
      success('Aluno atualizado com sucesso!');
    } else {
      await AlunoService.create(payload);
      success('Aluno cadastrado com sucesso!');
    }

    router.push(paths.aluno.list);
  } catch (error) {
    console.error('Erro ao salvar aluno:', error);
    showError('Erro ao salvar aluno.');
  }
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        :title="isEdit ? 'Editar Aluno' : 'Cadastrar Aluno'"
        :breadcrumbs="ALUNO_BREADCRUMBS_NEW_EDIT"
        button-label="Listar Alunos"
        :button-to="paths.aluno.list"
      />

      <UiParentCard>
        <v-form @submit.prevent="onSubmit">
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="nome" :error-messages="nomeErro" label="Nome" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="cpf" :error-messages="cpfErro" label="CPF" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="email" :error-messages="emailErro" label="Email" outlined type="email" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="telefone" :error-messages="telefoneErro" label="Telefone" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="matricula" :error-messages="matriculaErro" label="Matrícula" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field 
                v-model="dataNascimento" 
                :error-messages="dataNascimentoErro" 
                label="Data de Nascimento" 
                outlined 
                type="date" 
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select 
                v-model="sexo" 
                :items="sexos" 
                :error-messages="sexoErro" 
                label="Sexo" 
                outlined 
                item-title="name"
                item-value="value"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select 
                v-model="periodo" 
                :items="periodos" 
                :error-messages="periodoErro" 
                label="Período" 
                outlined 
                item-title="name"
                item-value="value"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select 
                v-model="situacao" 
                :items="situacoes" 
                :error-messages="situacaoErro" 
                label="Situação" 
                outlined 
                item-title="name"
                item-value="value"
              />
            </v-col>
            <v-col cols="12" class="text-right">
              <v-btn type="submit" color="primary" class="mt-4">
                {{ isEdit ? 'Salvar Alterações' : 'Cadastrar Aluno' }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
