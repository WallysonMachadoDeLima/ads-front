<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ServidorService } from '~/services/servidor-service';

const route = useRoute();
const id = Number(route.params.id);

const servidor = ref<any | null>(null);
const loading = ref(true);

const breadcrumbs = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Servidores', disabled: false, href: paths.servidor.list },
  { title: 'Visualizar', disabled: true },
];

onMounted(async () => {
  try {
    loading.value = true;
    servidor.value = await ServidorService.findOneById(id);
  } catch (error) {
    console.error('Erro ao carregar servidor:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Visualização do Servidor"
        :breadcrumbs="breadcrumbs"
        button-label="Voltar"
        :button-to="paths.servidor.list"
      />

      <UiParentCard title="Detalhes do Servidor">
        <v-skeleton-loader v-if="loading" type="paragraph, table" />

        <v-row v-else dense>
          <v-col cols="12" md="6">
            <strong>Nome:</strong> {{ servidor.nome }}
          </v-col>
          <v-col cols="12" md="6">
            <strong>CPF:</strong> {{ servidor.cpf }}
          </v-col>
          <v-col cols="12" md="6">
            <strong>Email:</strong> {{ servidor.email }}
          </v-col>
          <v-col cols="12" md="6">
            <strong>Tipo:</strong> {{ servidor.tipo }}
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
