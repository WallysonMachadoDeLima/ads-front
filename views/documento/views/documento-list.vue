<script setup lang="ts">
import TableActions from '@/components/shared/TableActions.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PageHeader from '~/components/shared/PageHeader.vue';
import { documentoService } from '@/services';
import { useNotification } from '~/composables/useNotification';
import { useConfirmation } from '~/composables/useConfirmation';
import type { IDocumentoDto } from '@/interfaces';
import { DOCUMENTO_BREADCRUMBS_LIST, DOCUMENTO_TABLE_HEADERS } from '../enums/documento-enums';

const router = useRouter();
const { success, error: showError } = useNotification();
const { confirmDelete } = useConfirmation();
const documentos = ref<IDocumentoDto[]>([]);
const loading = ref(true);

const breadcrumbs = DOCUMENTO_BREADCRUMBS_LIST;
const headers = DOCUMENTO_TABLE_HEADERS;

const carregarDocumentos = async () => {
  try {
    loading.value = true;
    const documentosData = await documentoService.findAll();
    
    console.log('Dados dos documentos carregados:', documentosData);
    documentos.value = documentosData;
  } catch (error) {
    console.error('Erro ao carregar documentos:', error);
    showError('Erro ao carregar documentos.');
  } finally {
    loading.value = false;
  }
};

const handleView = (id: number | string) => {
  if (!id) {
    console.error('ID não fornecido para visualização');
    return;
  }
  router.push(paths.documento.view(id.toString()));
};

const handleEdit = (id: number | string) => {
  if (!id) {
    console.error('ID não fornecido para edição');
    return;
  }
  router.push(paths.documento.edit(id.toString()));
};

const handleDelete = async (id: string | number) => {
  const idNum = Number(id);
  
  const confirmed = await confirmDelete('este documento');
  if (!confirmed) return;

  try {
    await documentoService.delete(idNum);
    success('Documento excluído com sucesso!');
    carregarDocumentos();
  } catch (error) {
    showError('Erro ao excluir documento.');
    console.error(error);
  }
};

onMounted(() => {
  carregarDocumentos();
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Listar Documentos"
        :breadcrumbs="breadcrumbs"
        button-label="Novo Documento"
        :button-to="paths.documento.new"
      />

      <UiParentCard>
        <v-data-table
          :headers="headers"
          :items="documentos"
          :loading="loading"
          class="elevation-1"
          item-value="id"
        >
          <template #item.url="{ item }">
            <v-btn
              :href="item.url"
              target="_blank"
              color="primary"
              variant="text"
              size="small"
              prepend-icon="mdi-open-in-new"
            >
              Abrir
            </v-btn>
          </template>
          
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
