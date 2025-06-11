<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ServidorService } from '~/services/servidor-service';
import PageHeader from '~/components/shared/PageHeader.vue';
import { paths } from '@/routes/paths';
import { SERVIDOR_BREADCRUMBS_LIST, SERVIDOR_TABLE_HEADERS } from './enums/corpo-doscente-enums';
import TableActions from '@/components/shared/TableActions.vue';

const router = useRouter();
const servidores = ref<any[]>([]);
const loading = ref(true);

const breadcrumbs = SERVIDOR_BREADCRUMBS_LIST;
const headers = SERVIDOR_TABLE_HEADERS;

const carregarServidores = async () => {
  try {
    loading.value = true;
    servidores.value = await ServidorService.index();
  } catch (error) {
    console.error('Erro ao carregar servidores:', error);
  } finally {
    loading.value = false;
  }
};

const handleView = (id: number | string) => {
  router.push(paths.servidor.view(id.toString()));
};

const handleEdit = (id: number | string) => {
  router.push(paths.servidor.edit(id.toString()));
};

const handleDelete = async (id: string | number) => {
  const idNum = Number(id);
  if (!confirm('Deseja realmente excluir este servidor?')) return;

  try {
    await ServidorService.delete(idNum);
    alert('Servidor excluído com sucesso!');
    carregarServidores();
  } catch (error) {
    alert('Erro ao excluir servidor.');
    console.error(error);
  }
};


onMounted(() => {
  carregarServidores();
});


</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Servidores"
        :breadcrumbs="breadcrumbs"
        button-label="Novo Servidor"
        :button-to="paths.servidor.new"
      />

      <UiParentCard title="Lista de servidores">
        <v-data-table
          :headers="headers"
          :items="servidores"
          :loading="loading"
          class="elevation-1"
          item-value="idServidor"
        >
          <template #item.actions="{ item }">
            <TableActions
              :id="item.idServidor"
              :onView="handleView"
              :onDelete="handleDelete"
            />
          </template>
        </v-data-table>

      </UiParentCard>
    </v-col>
  </v-row>
</template>
