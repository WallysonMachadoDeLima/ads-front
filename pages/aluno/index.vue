<script setup lang="ts">
import TableActions from '@/components/shared/TableActions.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PageHeader from '~/components/shared/PageHeader.vue';
import { AlunoService } from '~/services';
import { ALUNO_BREADCRUMBS_LIST, ALUNO_TABLE_HEADERS } from './enums/aluno-enums';

const router = useRouter();
const aluno = ref<any[]>([]);
const loading = ref(true);

const breadcrumbs = ALUNO_BREADCRUMBS_LIST;
const headers = ALUNO_TABLE_HEADERS;

const carregarCorpodocente = async () => {
  try {
    loading.value = true;
    aluno.value = await AlunoService.findAll();
  } catch (error) {
    console.error('Erro ao carregar aluno:', error);
  } finally {
    loading.value = false;
  }
};

const handleView = (id: number | string) => {
  router.push(paths.aluno.view(id.toString()));
};

const handleEdit = (id: number | string) => {
  router.push(paths.aluno.edit(id.toString()));
};

const handleDelete = async (id: string | number) => {
  const idNum = Number(id);
  if (!confirm('Deseja realmente excluir este aluno?')) return;

  try {
    await AlunoService.delete(idNum);
    alert('aluno excluído com sucesso!');
    carregarCorpodocente();
  } catch (error) {
    alert('Erro ao excluir aluno.');
    console.error(error);
  }
};


onMounted(() => {
  carregarCorpodocente();
});


</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Listar de Aluno"
        :breadcrumbs="breadcrumbs"
        button-label="Novo Integrante"
        :button-to="paths.aluno.new"
      />

      <UiParentCard>
        <v-data-table
          :headers="headers"
          :items="aluno"
          :loading="loading"
          class="elevation-1"
          item-value="idCorpodocente"
        >
          <template #item.actions="{ item }">
            <TableActions
              :id="item.idCorpodocente"
              :onView="handleView"
              :onDelete="handleDelete"
            />
          </template>
        </v-data-table>

      </UiParentCard>
    </v-col>
  </v-row>
</template>
