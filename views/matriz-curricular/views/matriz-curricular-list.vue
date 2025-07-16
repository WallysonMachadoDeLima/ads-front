<script setup lang="ts">
import TableActions from '@/components/shared/TableActions.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PageHeader from '~/components/shared/PageHeader.vue';
import { matrizCurricularService } from '@/services';
import { useNotification } from '~/composables/useNotification';
import { useConfirmation } from '~/composables/useConfirmation';
import type { IMatrizCurricularDto } from '@/interfaces';
import { MATRIZ_CURRICULAR_BREADCRUMBS_LIST, MATRIZ_CURRICULAR_TABLE_HEADERS } from '../enums/matriz-curricular-enums';

const router = useRouter();
const { success, error: showError } = useNotification();
const { confirmDelete } = useConfirmation();
const matrizesCurriculares = ref<IMatrizCurricularDto[]>([]);
const loading = ref(true);

const breadcrumbs = MATRIZ_CURRICULAR_BREADCRUMBS_LIST;
const headers = MATRIZ_CURRICULAR_TABLE_HEADERS;

const carregarMatrizesCurriculares = async () => {
  try {
    loading.value = true;
    const matrizesData = await matrizCurricularService.findAll();
    console.log('Dados das matrizes curriculares carregados:', matrizesData);
    
    matrizesCurriculares.value = matrizesData.map((matriz: any) => ({
      ...matriz,
      id: matriz.id || matriz.idMatrizCurricular
    }));
  } catch (error) {
    console.error('Erro ao carregar matrizes curriculares:', error);
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
  router.push(paths.matrizCurricular.view(id.toString()));
};

const handleEdit = (id: number | string) => {
  console.log('handleEdit chamado com ID:', id);
  if (!id) {
    console.error('ID não fornecido para edição');
    return;
  }
  router.push(paths.matrizCurricular.edit(id.toString()));
};

const handleDelete = async (id: string | number) => {
  const idNum = Number(id);
  
  const confirmed = await confirmDelete('esta matriz curricular');
  if (!confirmed) return;

  try {
    await matrizCurricularService.delete(idNum);
    success('Matriz curricular excluída com sucesso!');
    carregarMatrizesCurriculares();
  } catch (error) {
    showError('Erro ao excluir matriz curricular.');
    console.error(error);
  }
};

onMounted(() => {
  carregarMatrizesCurriculares();
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Listar Matrizes Curriculares"
        :breadcrumbs="breadcrumbs"
        button-label="Nova Matriz Curricular"
        :button-to="paths.matrizCurricular.new"
      />

      <UiParentCard>
        <v-data-table
          :headers="headers"
          :items="matrizesCurriculares"
          :loading="loading"
          class="elevation-1"
          item-value="id"
        >
          <template #item.disciplinas="{ item }">
            <div class="text-truncate" style="max-width: 300px;">
              {{ item.disciplinas?.map((d: any) => d.nome).join(', ') || 'Nenhuma disciplina' }}
            </div>
          </template>

          <template #item.actions="{ item }">
            <TableActions
              :id="item.id"
              :onView="handleView"
              :onEdit="handleEdit"
              :onDelete="handleDelete"
            />
          </template>

          <template #no-data>
            <div class="text-center py-4">
              <v-icon size="48" class="mb-2">mdi-grid-large</v-icon>
              <div>Nenhuma matriz curricular encontrada</div>
            </div>
          </template>
        </v-data-table>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
