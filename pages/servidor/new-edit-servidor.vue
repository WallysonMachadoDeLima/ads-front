<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { ServidorService } from '~/services/servidores';
import PageHeader from '~/components/shared/PageHeader.vue';

const router = useRouter();
const tipos = ['Administrador', 'Técnico', 'Professor'];

const schema = yup.object({
  nome: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().length(11, 'CPF inválido').required('CPF é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: yup.string().min(6, 'Mínimo 6 caracteres').required('Senha é obrigatória'),
  tipo: yup.string().required('Tipo é obrigatório'),
});

const { handleSubmit } = useForm({ validationSchema: schema });

const { value: nome, errorMessage: nomeErro } = useField<string>('nome');
const { value: cpf, errorMessage: cpfErro } = useField<string>('cpf');
const { value: email, errorMessage: emailErro } = useField<string>('email');
const { value: senha, errorMessage: senhaErro } = useField<string>('senha');
const { value: tipo, errorMessage: tipoErro } = useField<string>('tipo');

const onSubmit = handleSubmit(async (values) => {
  const payload = { idServidor: 0, ...values };
  try {
    await ServidorService.creat(payload);
    alert('Servidor cadastrado com sucesso!');
    router.push('/servidor');
  } catch (error) {
    alert('Erro ao cadastrar servidor.');
    console.error(error);
  }
});

const breadcrumbs = [
  { title: 'Dashboard', disabled: false, href: '/' },
  { title: 'Servidores', disabled: false, href: '/servidor' },
  { title: 'Cadastrar', disabled: true },
];
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Servidores"
        :breadcrumbs="breadcrumbs"
        button-label="Lista de Servidor"
        button-to="/servidor"
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
