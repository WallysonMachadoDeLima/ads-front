<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ServidorService } from '~/services/servidor-service';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import PageHeader from '@/components/shared/PageHeader.vue';
import { paths } from '@/routes/paths';

const route = useRoute();
const id = Number(route.params.id);

const servidor = ref<any | null>(null);
const loading = ref(true);

const breadcrumbs = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Corpo Docente', disabled: false, href: paths.corpoDocente.list },
  { title: 'Visualizar', disabled: true },
];

onMounted(async () => {
  try {
    loading.value = true;
    servidor.value = await ServidorService.show(id);
  } catch (error) {
    console.error('Erro ao carregar corpo docente:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Visualização do Corpo Docente"
        :breadcrumbs="breadcrumbs"
        button-label="Voltar"
        :button-to="paths.corpoDocente.list"
      />

      <UiParentCard title="Detalhes do Corpo Docente">
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
