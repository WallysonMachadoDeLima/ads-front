<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { IAlunoFindOneByIdDto } from '~/interfaces';
import { AlunoService } from '~/services';

const route = useRoute();
const id = Number(route.params.id);

const aluno = ref<IAlunoFindOneByIdDto>( {} as IAlunoFindOneByIdDto);
const loading = ref(true);

const breadcrumbs = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Aluno', disabled: false, href: paths.aluno.list },
  { title: 'Visualizar', disabled: true },
];

onMounted(async () => {
  try {
    loading.value = true;
    aluno.value = await AlunoService.findOneById(id);
  } catch (error) {
    console.error('Erro ao carregar aluno:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Visualizar Aluno"
        :breadcrumbs="breadcrumbs"
        button-label="Listar Aluno"
        :button-to="paths.aluno.list"
      />

      <UiParentCard title="Detalhes do Aluno">
        <v-skeleton-loader v-if="loading" type="paragraph, table" />

        <v-row v-else dense>
          <v-col cols="12" md="6">
            <strong>Nome do Aluno:</strong> {{ aluno.aluno.nome }}
          </v-col>
          <v-col cols="12" md="6">
            <strong>CPF do Aluno:</strong> {{ aluno.aluno.cpf }}
          </v-col>
          <v-col cols="12" md="6">
            <strong>Email do Aluno:</strong> {{ aluno.aluno.email }}
          </v-col>
          <v-col cols="12" md="6">
            <strong>Disciplina:</strong> {{ aluno.disciplina }}
          </v-col>
        </v-row>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
