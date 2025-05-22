<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { ServidorService } from '@/services/servidores';

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

const novoServidor = () => {
  router.push('/servidor/new-edit-servidor');
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-item class="py-2 px-4">
          <BaseBreadcrumb :title="'Servidores'" :breadcrumbs="breadcrumbs" />
        </v-card-item>
      </v-card>

      <UiParentCard title="listagem" class="mt-4">
        <div class="d-flex justify-end mb-4">
          <v-btn color="primary" @click="novoServidor">+ Novo Servidor</v-btn>
        </div>

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
