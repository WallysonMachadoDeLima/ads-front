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

const {
  handleSubmit,
  setValues,
  nome, nomeErro,
  cpf, cpfErro,
  email, emailErro,
  telefone, telefoneErro,
  matricula, matriculaErro,
} = useAlunoForm(isEdit);

onMounted(async () => {
  if (isEdit && id) {
    try {
      const aluno: IAlunoDto = await AlunoService.findOneById(id);
      setValues({
        nome: aluno.nome,
        cpf: aluno.cpf,
        email: aluno.email,
        telefone: aluno.telefone,
        matricula: aluno.matricula,
      });
    } catch (error) {
      console.error('Erro ao carregar dados do aluno:', error);
      showError('Erro ao carregar dados do aluno.');
    }
  }
});

const onSubmit = handleSubmit(async (formData: ICreateUpdateAlunoDto) => {
  try {
    if (isEdit) {
      await AlunoService.update(id, { ...formData, idAluno: id });
      success('Aluno atualizado com sucesso!');
    } else {
      await AlunoService.create({ ...formData, idAluno: 0 });
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
