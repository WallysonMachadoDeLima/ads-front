<script setup lang="ts">
import TableActions from '@/components/shared/TableActions.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PageHeader from '~/components/shared/PageHeader.vue';
import { ServidorService } from '~/services/servidor-service';
import { SERVIDOR_BREADCRUMBS_LIST, SERVIDOR_TABLE_HEADERS } from './enums/servidor-enums';

const router = useRouter();
const servidores = ref<any[]>([]);
const loading = ref(true);

const breadcrumbs = SERVIDOR_BREADCRUMBS_LIST;
const headers = SERVIDOR_TABLE_HEADERS;

const carregarServidores = async () => {
  try {
    loading.value = true;
    servidores.value = await ServidorService.findAll();
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
        title="Listar Servidores"
        :breadcrumbs="breadcrumbs"
        button-label="Novo Servidor"
        :button-to="paths.servidor.new"
      />

      <UiParentCard>
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
