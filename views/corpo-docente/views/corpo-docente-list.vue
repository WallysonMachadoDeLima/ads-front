<script setup lang="ts">
import TableActions from '@/components/shared/TableActions.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PageHeader from '~/components/shared/PageHeader.vue';
import { CorpoDocenteService } from '~/services';
import { useNotification } from '~/composables/useNotification';
import { useConfirmation } from '~/composables/useConfirmation';
import { CORPO_DOCENTE_BREADCRUMBS_LIST, CORPO_DOCENTE_TABLE_HEADERS } from '../enums/corpo-docente-enums';

const router = useRouter();
const { success, error: showError } = useNotification();
const { confirmDelete } = useConfirmation();
const corpoDocente = ref<any[]>([]);
const loading = ref(true);

const breadcrumbs = CORPO_DOCENTE_BREADCRUMBS_LIST;
const headers = CORPO_DOCENTE_TABLE_HEADERS;

const carregarCorpodocente = async () => {
  try {
    loading.value = true;
    corpoDocente.value = await CorpoDocenteService.findAll();
  } catch (error) {
    console.error('Erro ao carregar corpo docente:', error);
    showError('Erro ao carregar lista do corpo docente.');
  } finally {
    loading.value = false;
  }
};

const handleView = (id: number | string) => {
  router.push(paths.corpoDocente.view(id.toString()));
};

const handleEdit = (id: number | string) => {
  router.push(paths.corpoDocente.edit(id.toString()));
};

const handleDelete = async (id: string | number) => {
  const idNum = Number(id);
  
  const confirmed = await confirmDelete('este membro do corpo docente');
  if (!confirmed) return;

  try {
    await CorpoDocenteService.delete(idNum);
    success('Membro do corpo docente excluído com sucesso!');
    carregarCorpodocente();
  } catch (error) {
    showError('Erro ao excluir membro do corpo docente.');
    console.error(error);
  }
};


onMounted(() => {
  carregarCorpodocente();
});


</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Listar de Corpo Docente"
        :breadcrumbs="breadcrumbs"
        button-label="Novo Integrante"
        :button-to="paths.corpoDocente.new"
      />

      <UiParentCard>
        <v-data-table
          :headers="headers"
          :items="corpoDocente"
          :loading="loading"
          class="elevation-1"
          item-value="id"
        >
          <template #item.actions="{ item }">
            <TableActions
              :id="item.id"
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
