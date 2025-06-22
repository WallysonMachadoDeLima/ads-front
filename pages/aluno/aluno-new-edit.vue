<script setup lang="ts">
import { ref, onMounted } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { useRouter } from 'vue-router';
import PageHeader from '~/components/shared/PageHeader.vue';
//import { AlunoService } from '~/services/';
import { ALUNO_BREADCRUMBS_LIST } from './enums/aluno-enums';
import { useAlunoForm } from './resolvers/aluno-resolver';

const router = useRouter();
const breadcrumbs = ALUNO_BREADCRUMBS_LIST;

const { 
  handleSubmit, 
  idAluno, idAlunoErro,
  nome, nomeErro,
  cpf, cpfErro,
  email, emailErro,
  telefone, telefoneErro,
  matricula, matriculaErro
} = useAlunoForm();

const onSubmit = handleSubmit(async (values) => {
  try {
    //await AlunoService.create(values);
    alert('Aluno cadastrado com sucesso!');
    router.push(paths.aluno.list);
  } catch (error) {
    alert('Erro ao cadastrar aluno.');
    console.error(error);
  }
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Cadastrar Aluno"
        :breadcrumbs="breadcrumbs"
        button-label="Listar Aluno"
        :button-to="paths.aluno.list"
      />

      <UiParentCard title="">
        <v-form @submit.prevent="onSubmit">
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="nome"
                :error-messages="nomeErro"
                label="Nome"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="cpf"
                :error-messages="cpfErro"
                label="CPF"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="email"
                :error-messages="emailErro"
                label="E-mail"
                type="email"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="telefone"
                :error-messages="telefoneErro"
                label="Telefone"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="matricula"
                :error-messages="matriculaErro"
                label="Matrícula"
                outlined
                dense
              />
            </v-col>
            <v-col cols="12" class="text-right">
              <v-btn type="submit" color="primary" class="mt-4">Cadastrar Aluno</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
