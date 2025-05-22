<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { ServidorService } from '~/services/servidores';

const router = useRouter();

const nome = ref('');
const cpf = ref('');
const email = ref('');
const senha = ref('');
const tipo = ref('');

const tipos = ['Administrador', 'Técnico', 'Professor'];

const breadcrumbs = [
  { title: 'Dashboard', disabled: false, href: '/' },
  { title: 'Servidores', disabled: false, href: '/servidor' },
  { title: 'Cadastro', disabled: true },
];

const handleSubmit = async () => {
  const payload = {
    idServidor: 0,
    nome: nome.value,
    cpf: cpf.value,
    email: email.value,
    senha: senha.value,
    tipo: tipo.value,
  };

 try {
    await ServidorService.creat(payload);
    alert('Servidor cadastrado com sucesso!');
    router.push('/servidor');
  } catch (error) {
    alert('Erro ao cadastrar servidor. Verifique os dados.');
    console.error(error);
  }
};

</script>

<template>
  <v-row>
    <v-col cols="12">
      <UiParentCard title="Cadastro de Servidor">
        <template #action>
          <BaseBreadcrumb :breadcrumbs="breadcrumbs" />
        </template>

        <v-form @submit.prevent="handleSubmit">
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field v-model="nome" label="Nome" outlined required />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="cpf" label="CPF" outlined required />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="email" label="Email" type="email" outlined required />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="senha" label="Senha" type="password" outlined required />
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="tipo" :items="tipos" label="Tipo" outlined required />
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
