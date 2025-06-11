<script setup lang="ts">
import { useRouter } from 'vue-router';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useServidorForm } from './resolvers/corpo-docente-resolver';
import { ServidorService } from '~/services/servidor-service';
import PageHeader from '~/components/shared/PageHeader.vue';
import { paths } from '@/routes/paths';
import { SERVIDOR_BREADCRUMBS_NEW_EDIT } from './enums/corpo-doscente-enums';

const router = useRouter();
const tipos = ['Administrador', 'Técnico', 'Professor'];

const breadcrumbs = SERVIDOR_BREADCRUMBS_NEW_EDIT;

const {
  handleSubmit,
  nome, nomeErro,
  cpf, cpfErro,
  email, emailErro,
  senha, senhaErro,
  tipo, tipoErro,
} = useServidorForm();

const onSubmit = handleSubmit(async (values) => {
  const payload = { idServidor: 0, ...values };
  try {
    await ServidorService.create(payload);
    alert('Servidor cadastrado com sucesso!');
    router.push(paths.servidor.list);
  } catch (error) {
    alert('Erro ao cadastrar servidor.');
    console.error(error);
  }
});

</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Servidores"
        :breadcrumbs="breadcrumbs"
        button-label="Lista de Servidor"
        :button-to="paths.servidor.list"
      />

      <UiParentCard title="Cadastro de Servidor">
        <v-form @submit.prevent="onSubmit">
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="nome" :error-messages="nomeErro" label="Nome" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="cpf" :error-messages="cpfErro" label="CPF" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="email" :error-messages="emailErro" label="Email" outlined type="email" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="senha" :error-messages="senhaErro" label="Senha" outlined type="password" />
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="tipo" :items="tipos" :error-messages="tipoErro" label="Tipo" outlined />
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
