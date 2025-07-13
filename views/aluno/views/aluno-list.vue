<script setup lang="ts">
import TableActions from '@/components/shared/TableActions.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PageHeader from '~/components/shared/PageHeader.vue';
import { AlunoService } from '~/services';
import { useNotification } from '~/composables/useNotification';
import { useConfirmation } from '~/composables/useConfirmation';
import type { IAlunoDto } from '~/interfaces';
import { ALUNO_BREADCRUMBS_LIST, ALUNO_TABLE_HEADERS } from '../enums/aluno-enums';

const router = useRouter();
const { success, error: showError } = useNotification();
const { confirmDelete } = useConfirmation();
const aluno = ref<IAlunoDto[]>([]);
const loading = ref(true);

const breadcrumbs = ALUNO_BREADCRUMBS_LIST;
const headers = ALUNO_TABLE_HEADERS;

const carregarAluno = async () => {
  try {
    loading.value = true;
    const alunosData = await AlunoService.findAll();
    console.log('Dados dos alunos carregados:', alunosData);
    
    // Garantir que os dados tenham a propriedade idAluno
    aluno.value = alunosData.map((aluno: any) => ({
      ...aluno,
      idAluno: aluno.idAluno || aluno.id
    }));
  } catch (error) {
    console.error('Erro ao carregar aluno:', error);
  } finally {
    loading.value = false;
  }
};

const handleView = (id: number | string) => {
  console.log('handleView chamado com ID:', id);
  if (!id) {
    console.error('ID não fornecido para visualização');
    return;
  }
  router.push(paths.aluno.view(id.toString()));
};

const handleEdit = (id: number | string) => {
  console.log('handleEdit chamado com ID:', id);
  if (!id) {
    console.error('ID não fornecido para edição');
    return;
  }
  router.push(paths.aluno.edit(id.toString()));
};

const handleDelete = async (id: string | number) => {
  const idNum = Number(id);
  
  const confirmed = await confirmDelete('este aluno');
  if (!confirmed) return;

  try {
    await AlunoService.delete(idNum);
    success('Aluno excluído com sucesso!');
    carregarAluno();
  } catch (error) {
    showError('Erro ao excluir aluno.');
    console.error(error);
  }
};


onMounted(() => {
  carregarAluno();
});


</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Listar Alunos"
        :breadcrumbs="breadcrumbs"
        button-label="Novo Aluno"
        :button-to="paths.aluno.new"
      />

      <UiParentCard>
        <v-data-table
          :headers="headers"
          :items="aluno"
          :loading="loading"
          class="elevation-1"
          item-value="idAluno"
        >
          <template #item.actions="{ item }">
            <TableActions
              :id="item.idAluno"
              :onView="handleView"
              :onEdit="handleEdit"
              :onDelete="handleDelete"
            />
          </template>
        </v-data-table>

      </UiParentCard>
    </v-col>
  </v-row>
</template>
