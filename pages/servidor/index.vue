<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { ServidorService } from '@/services/servidores';
import PageHeader from '~/components/shared/PageHeader.vue';

const router = useRouter();
const servidores = ref<any[]>([]);
const loading = ref(true);

const breadcrumbs = [
  { title: 'Dashboard', disabled: false, href: '/' },
  { title: 'Servidores', disabled: true },
];


const headers = [
  { title: 'Nome', key: 'nome' },
  { title: 'CPF', key: 'cpf' },
  { title: 'Email', key: 'email' },
  { title: 'Tipo', key: 'tipo' },
];

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
        button-to="/servidor/new-edit-servidor"
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
