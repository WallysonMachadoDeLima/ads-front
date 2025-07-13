<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { paths } from '@/routes/paths';
import { DISCIPLINA_BREADCRUMBS_NEW_EDIT } from './enums/disciplina-enums';
import { useDisciplinaForm } from './resolvers/disciplina-resolver';
import { disciplinaService } from '@/services';
import { useNotification } from '~/composables/useNotification';

//------------------------------------------------------------------------------

const props = defineProps<{
  currentData?: {
    nome: string;
    codigo: string;
    descricao: string;
    objetivos: string;
    conteudo: string;
  };
  isEdit?: boolean;
  currentId?: string | number;
}>();

const router = useRouter();
const { success, error: showError } = useNotification();
const id = Number(props.currentId) || 0;
const isEdit = props.isEdit || !!id;

const { 
  handleSubmit, 
  setValues, 
  resetForm,
  nome, nomeErro,
  codigo, codigoErro,
  descricao, descricaoErro,
  objetivos, objetivosErro,
  conteudo, conteudoErro
} = useDisciplinaForm(isEdit);

// Loading state
const loading = ref(false);
const error = ref<string | null>(null);

onMounted(async () => {
  if (isEdit && id) {
    try {
      loading.value = true;
      const disciplina = await disciplinaService.getById(id);
      if (disciplina) {
        setValues({
          nome: disciplina.nome,
          codigo: disciplina.codigo,
          descricao: disciplina.descricao,
          objetivos: disciplina.objetivos,
          conteudo: disciplina.conteudo,
        });
      }
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar dados da disciplina';
      console.error('Erro ao carregar dados da disciplina:', err);
    } finally {
      loading.value = false;
    }
  }
});

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    error.value = null;

    if (isEdit) {
      await disciplinaService.update(id, values);
      success('Disciplina atualizada com sucesso!');
    } else {
      await disciplinaService.create(values);
      success('Disciplina cadastrada com sucesso!');
    }

    router.push(paths.disciplina.list);
  } catch (err: any) {
    error.value = err.message || 'Erro ao salvar disciplina';
    showError('Erro ao salvar disciplina.');
    console.error('Erro ao salvar disciplina:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <PageHeader 
      :title="isEdit ? 'Editar Disciplina' : 'Nova Disciplina'" 
      :breadcrumbs="DISCIPLINA_BREADCRUMBS_NEW_EDIT"
      :actionButton="{
        title: isEdit ? 'Atualizar' : 'Salvar',
        action: onSubmit
      }"
    />
    
    <v-row>
      <v-col cols="12">
        <UiParentCard>
          <form @submit.prevent="onSubmit">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="nome"
                  label="Nome da Disciplina"
                  :error-messages="nomeErro"
                  variant="outlined"
                  required
                />
              </v-col>
              
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="codigo"
                  label="Código"
                  :error-messages="codigoErro"
                  variant="outlined"
                  required
                />
              </v-col>
              
              <v-col cols="12">
                <v-textarea
                  v-model="descricao"
                  label="Descrição"
                  :error-messages="descricaoErro"
                  variant="outlined"
                  rows="3"
                  required
                />
              </v-col>
              
              <v-col cols="12">
                <v-textarea
                  v-model="objetivos"
                  label="Objetivos"
                  :error-messages="objetivosErro"
                  variant="outlined"
                  rows="3"
                  required
                />
              </v-col>
              
              <v-col cols="12">
                <v-textarea
                  v-model="conteudo"
                  label="Conteúdo Programático"
                  :error-messages="conteudoErro"
                  variant="outlined"
                  rows="4"
                  required
                />
              </v-col>
            </v-row>

            <v-row class="mt-4">
              <v-col cols="12" class="d-flex justify-end">
                <v-btn
                  color="secondary"
                  variant="outlined"
                  class="mr-2"
                  @click="router.push(paths.disciplina.list)"
                >
                  Cancelar
                </v-btn>
                
                <v-btn
                  color="primary"
                  type="submit"
                  :loading="loading"
                >
                  {{ isEdit ? 'Atualizar' : 'Salvar' }}
                </v-btn>
              </v-col>
            </v-row>
          </form>

          <v-alert
            v-if="error"
            type="error"
            class="mt-4"
            :text="error"
          />
        </UiParentCard>
      </v-col>
    </v-row>
  </div>
</template>
