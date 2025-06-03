<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ServidorService } from '~/services/servidor/servidor-service';
import PageHeader from '~/components/shared/PageHeader.vue';
import { PATHS } from '@/routes/paths';
import { SERVIDOR_BREADCRUMBS_LIST, SERVIDOR_TABLE_HEADERS } from './enums/servidor-enums';

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

const handleDelete = async (id: number) => {
  if (!confirm('Deseja realmente excluir este servidor?')) return;

  try {
    await ServidorService.delete(id);
    alert('Servidor excluído com sucesso!');
    carregarServidores(); // recarrega a tabela
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
        :button-to="PATHS.servidor.new"
      />

      <UiParentCard title="Lista de servidores">
        <v-data-table
          :headers="headers"
          :items="servidores"
          :loading="loading"
          class="elevation-1"
          item-value="idServidor"
        >
          <template #item="{ item }">
            <tr>
              <td>{{ item.nome }}</td>
              <td>{{ item.cpf }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.tipo }}</td>
            </tr>
          </template>
        </v-data-table>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
