<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { paths } from '@/routes/paths';
import { DOCUMENTO_BREADCRUMBS_NEW_EDIT } from './enums/documento-enums';
import { useDocumentoForm } from './resolvers/documento-resolver';
import { documentoService } from '@/services';
import { useNotification } from '~/composables/useNotification';

//------------------------------------------------------------------------------

const props = defineProps<{
  currentData?: {
    nome: string;
    descricao: string;
    url: string;
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
  descricao, descricaoErro,
  url, urlErro
} = useDocumentoForm(isEdit);

// Loading state
const loading = ref(false);
const error = ref<string | null>(null);

onMounted(async () => {
  if (isEdit && id) {
    try {
      loading.value = true;
      const documento = await documentoService.findOneById(id);
      if (documento) {
        setValues({
          nome: documento.nome,
          descricao: documento.descricao,
          url: documento.url,
        });
      }
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar dados do documento';
      console.error('Erro ao carregar dados do documento:', err);
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
      await documentoService.update(id, values);
      success('Documento atualizado com sucesso!');
    } else {
      await documentoService.create(values);
      success('Documento cadastrado com sucesso!');
    }

    router.push(paths.documento.list);
  } catch (err: any) {
    error.value = err.message || 'Erro ao salvar documento';
    showError('Erro ao salvar documento.');
    console.error('Erro ao salvar documento:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <PageHeader 
      :title="isEdit ? 'Editar Documento' : 'Novo Documento'" 
      :breadcrumbs="DOCUMENTO_BREADCRUMBS_NEW_EDIT"
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
              <v-col cols="12">
                <v-text-field
                  v-model="nome"
                  label="Nome do Documento"
                  :error-messages="nomeErro"
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
                  rows="4"
                  required
                />
              </v-col>
              
              <v-col cols="12">
                <v-text-field
                  v-model="url"
                  label="URL do Documento"
                  :error-messages="urlErro"
                  variant="outlined"
                  placeholder="https://exemplo.com/documento.pdf"
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
                  @click="router.push(paths.documento.list)"
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
