<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { useRouter } from 'vue-router';
import PageHeader from '~/components/shared/PageHeader.vue';
import { CorpoDocenteService } from '~/services/';
import { CORPO_DOCENTE_BREADCRUMBS_LIST } from './enums/corpo-docente-enums';
import { useCorpoDocenteForm } from './resolvers/corpo-docente-resolver';

const router = useRouter();

const breadcrumbs = CORPO_DOCENTE_BREADCRUMBS_LIST;

const {
  handleSubmit,
  servidorId, servidorIdErro,
  disciplina, disciplinaErro
} = useCorpoDocenteForm();

const onSubmit = handleSubmit(async (values) => {
  try {
    await CorpoDocenteService.create(values);
    alert('Corpo docente cadastrado com sucesso!');
    router.push(paths.corpoDocente.list);
  } catch (error) {
    alert('Erro ao cadastrar corpo docente.');
    console.error(error);
  }
});

</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Cadastrar  Corpo Docente"
        :breadcrumbs="breadcrumbs"
        button-label="Lista de Corpo Docente"
        :button-to="paths.corpoDocente.list"
      />

      <UiParentCard title="Cadastro de Corpo Docente">
        <v-form @submit.prevent="onSubmit">
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="servidorId" :error-messages="servidorIdErro" label="Servidor" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="disciplina" :error-messages="disciplinaErro" label="Disciplina" outlined />
            </v-col>
            <v-col cols="12" class="text-right">
              <v-btn type="submit" color="primary" class="mt-4">Cadastrar Servidor</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
