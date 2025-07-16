<script setup lang="ts">
import TableActions from '@/components/shared/TableActions.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PageHeader from '~/components/shared/PageHeader.vue';
import { tccService } from '@/services';
import { useNotification } from '~/composables/useNotification';
import { useConfirmation } from '~/composables/useConfirmation';
import type { ITccDto } from '@/interfaces';
import { TCC_BREADCRUMBS_LIST, TCC_TABLE_HEADERS, getStatusText, getStatusColor } from '../enums/tcc-enums';

const router = useRouter();
const { success, error: showError } = useNotification();
const { confirmDelete } = useConfirmation();
const tccs = ref<ITccDto[]>([]);
const loading = ref(true);

const breadcrumbs = TCC_BREADCRUMBS_LIST;
const headers = TCC_TABLE_HEADERS;

const carregarTccs = async () => {
  try {
    loading.value = true;
    const tccsData = await tccService.findAll();
    console.log('Dados dos TCCs carregados:', tccsData);
    
    tccs.value = tccsData.map((tcc: any) => ({
      ...tcc,
      id: tcc.id || tcc.idTcc
    }));
  } catch (error) {
    console.error('Erro ao carregar TCCs:', error);
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
  router.push(paths.tcc.view(id.toString()));
};

const handleEdit = (id: number | string) => {
  console.log('handleEdit chamado com ID:', id);
  if (!id) {
    console.error('ID não fornecido para edição');
    return;
  }
  router.push(paths.tcc.edit(id.toString()));
};

const handleDelete = async (id: string | number) => {
  const idNum = Number(id);
  
  const confirmed = await confirmDelete('este TCC');
  if (!confirmed) return;

  try {
    await tccService.delete(idNum);
    success('TCC excluído com sucesso!');
    carregarTccs();
  } catch (error) {
    showError('Erro ao excluir TCC.');
    console.error(error);
  }
};

onMounted(() => {
  carregarTccs();
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Listar TCCs"
        :breadcrumbs="breadcrumbs"
        button-label="Novo TCC"
        :button-to="paths.tcc.new"
      />

      <UiParentCard>
        <v-data-table
          :headers="headers"
          :items="tccs"
          :loading="loading"
          class="elevation-1"
          item-value="id"
        >
          <template #item.tituloProvisorio="{ item }">
            <div class="text-truncate" style="max-width: 250px;">
              {{ item.tituloProvisorio }}
            </div>
          </template>

          <template #item.aluno="{ item }">
            <div>
              {{ item.aluno?.nome || `Aluno ID: ${item.alunoId}` }}
            </div>
          </template>

          <template #item.orientador="{ item }">
            <div>
              {{ item.orientador?.nome || `Servidor ID: ${item.orientadorId}` }}
            </div>
          </template>

          <template #item.status="{ item }">
            <v-chip
              :color="getStatusColor(item.status)"
              size="small"
              variant="tonal"
            >
              {{ getStatusText(item.status) }}
            </v-chip>
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
              <v-icon size="48" class="mb-2">mdi-file-document-outline</v-icon>
              <div>Nenhum TCC encontrado</div>
            </div>
          </template>
        </v-data-table>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
