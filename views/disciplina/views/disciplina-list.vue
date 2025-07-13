<script setup lang="ts">
import TableActions from '@/components/shared/TableActions.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PageHeader from '~/components/shared/PageHeader.vue';
import { disciplinaService } from '@/services';
import { useNotification } from '~/composables/useNotification';
import { useConfirmation } from '~/composables/useConfirmation';
import type { IDisciplinaDto } from '@/interfaces';
import { DISCIPLINA_BREADCRUMBS_LIST, DISCIPLINA_TABLE_HEADERS } from '../enums/disciplina-enums';

const router = useRouter();
const { success, error: showError } = useNotification();
const { confirmDelete } = useConfirmation();
const disciplinas = ref<IDisciplinaDto[]>([]);
const loading = ref(true);

const breadcrumbs = DISCIPLINA_BREADCRUMBS_LIST;
const headers = DISCIPLINA_TABLE_HEADERS;

const carregarDisciplinas = async () => {
  try {
    loading.value = true;
    const disciplinasData = await disciplinaService.findAll();
    console.log('Dados das disciplinas carregados:', disciplinasData);
    
    // Garantir que os dados tenham a propriedade id
    disciplinas.value = disciplinasData.map((disciplina: any) => ({
      ...disciplina,
      id: disciplina.id || disciplina.idDisciplina
    }));
  } catch (error) {
    console.error('Erro ao carregar disciplinas:', error);
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
  router.push(paths.disciplina.view(id.toString()));
};

const handleEdit = (id: number | string) => {
  console.log('handleEdit chamado com ID:', id);
  if (!id) {
    console.error('ID não fornecido para edição');
    return;
  }
  router.push(paths.disciplina.edit(id.toString()));
};

const handleDelete = async (id: string | number) => {
  const idNum = Number(id);
  
  const confirmed = await confirmDelete('esta disciplina');
  if (!confirmed) return;

  try {
    await disciplinaService.delete(idNum);
    success('Disciplina excluída com sucesso!');
    carregarDisciplinas();
  } catch (error) {
    showError('Erro ao excluir disciplina.');
    console.error(error);
  }
};

onMounted(() => {
  carregarDisciplinas();
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Listar Disciplinas"
        :breadcrumbs="breadcrumbs"
        button-label="Nova Disciplina"
        :button-to="paths.disciplina.new"
      />

      <UiParentCard>
        <v-data-table
          :headers="headers"
          :items="disciplinas"
          :loading="loading"
          class="elevation-1"
          item-value="id"
        >
          <template #item.descricao="{ item }">
            <div class="text-truncate" style="max-width: 200px;">
              {{ item.descricao }}
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
              <v-icon size="48" class="mb-2">mdi-book-outline</v-icon>
              <div>Nenhuma disciplina encontrada</div>
            </div>
          </template>
        </v-data-table>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
