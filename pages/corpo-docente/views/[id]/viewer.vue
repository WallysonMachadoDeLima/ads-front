<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { ICorpoDocenteFindOneByIdDto } from '~/interfaces';
import { CorpoDocenteService } from '~/services';

const route = useRoute();
const id = Number(route.params.id);

const corpoDocente = ref<ICorpoDocenteFindOneByIdDto>( {} as ICorpoDocenteFindOneByIdDto);
const loading = ref(true);

const breadcrumbs = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Corpo Docente', disabled: false, href: paths.corpoDocente.list },
  { title: 'Visualizar', disabled: true },
];

onMounted(async () => {
  try {
    loading.value = true;
    corpoDocente.value = await CorpoDocenteService.findOneById(id);
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
        title="Visualizar Corpo Docente"
        :breadcrumbs="breadcrumbs"
        button-label="Listar Corpo Docente"
        :button-to="paths.corpoDocente.list"
      />

      <UiParentCard title="Detalhes do Corpo Docente">
        <v-skeleton-loader v-if="loading" type="paragraph, table" />

        <v-row v-else dense>
          <v-col cols="12" md="6">
            <strong>Nome do Servidor:</strong> {{ corpoDocente.servidor.nome }}
          </v-col>
          <v-col cols="12" md="6">
            <strong>CPF do Servidor:</strong> {{ corpoDocente.servidor.cpf }}
          </v-col>
          <v-col cols="12" md="6">
            <strong>Email do Servidor:</strong> {{ corpoDocente.servidor.email }}
          </v-col>
          <v-col cols="12" md="6">
            <strong>Disciplina:</strong> {{ corpoDocente.disciplina }}
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
