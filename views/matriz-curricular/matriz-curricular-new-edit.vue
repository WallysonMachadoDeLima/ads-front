<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { paths } from '@/routes/paths';
import { MATRIZ_CURRICULAR_BREADCRUMBS_NEW_EDIT } from './enums/matriz-curricular-enums';
import { useMatrizCurricularForm } from './resolvers/matriz-curricular-resolver';
import { matrizCurricularService, disciplinaService } from '@/services';
import { useNotification } from '~/composables/useNotification';
import type { IDisciplinaDto } from '@/interfaces';

//------------------------------------------------------------------------------

const props = defineProps<{
  currentData?: {
    nome: string;
    ano: number;
    disciplinaIds: string[];
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
  ano, anoErro,
  disciplinaIds, disciplinaIdsErro,
  observacao, observacaoErro
} = useMatrizCurricularForm(isEdit);

// Loading state
const loading = ref(false);
const error = ref<string | null>(null);
const disciplinasDisponiveis = ref<IDisciplinaDto[]>([]);

// Carregar disciplinas disponíveis
const carregarDisciplinas = async () => {
  try {
    const disciplinas = await disciplinaService.findAll();
    disciplinasDisponiveis.value = disciplinas;
  } catch (err) {
    console.error('Erro ao carregar disciplinas:', err);
    showError('Erro ao carregar disciplinas disponíveis.');
  }
};

onMounted(async () => {
  // Carregar disciplinas primeiro
  await carregarDisciplinas();

  if (isEdit && id) {
    try {
      loading.value = true;
      const matrizCurricular = await matrizCurricularService.findOneById(id);
      if (matrizCurricular) {
        setValues({
          nome: matrizCurricular.nome,
          ano: matrizCurricular.ano,
          disciplinaIds: matrizCurricular.disciplinas?.map(d => d.id) || [],
          observacao: matrizCurricular.observacao || '', // usar observacao diretamente
        });
      }
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar dados da matriz curricular';
      console.error('Erro ao carregar dados da matriz curricular:', err);
    } finally {
      loading.value = false;
    }
  }
});

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    error.value = null;

    // Os dados já estão no formato correto
    const payload = values;

    if (isEdit) {
      await matrizCurricularService.update(id, payload);
      success('Matriz curricular atualizada com sucesso!');
    } else {
      await matrizCurricularService.create(payload);
      success('Matriz curricular cadastrada com sucesso!');
    }

    router.push(paths.matrizCurricular.list);
  } catch (err: any) {
    error.value = err.message || 'Erro ao salvar matriz curricular';
    showError('Erro ao salvar matriz curricular.');
    console.error('Erro ao salvar matriz curricular:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <PageHeader 
      :title="isEdit ? 'Editar Matriz Curricular' : 'Nova Matriz Curricular'" 
      :breadcrumbs="MATRIZ_CURRICULAR_BREADCRUMBS_NEW_EDIT"
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
                  label="Nome da Matriz Curricular"
                  :error-messages="nomeErro"
                  variant="outlined"
                  required
                />
              </v-col>
              
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="ano"
                  label="Ano"
                  :error-messages="anoErro"
                  variant="outlined"
                  type="number"
                  required
                />
              </v-col>
              
              <v-col cols="12">
                <v-select
                  v-model="disciplinaIds"
                  :items="disciplinasDisponiveis"
                  item-title="nome"
                  item-value="id"
                  label="Disciplinas"
                  :error-messages="disciplinaIdsErro"
                  variant="outlined"
                  multiple
                  chips
                  closable-chips
                  required
                >
                  <template #selection="{ item, index }">
                    <v-chip
                      v-if="index < 3"
                      color="primary"
                      variant="outlined"
                      size="small"
                      closable
                      @click:close="disciplinaIds = disciplinaIds.filter((id: number) => id !== item.raw.id)"
                    >
                      {{ item.title }}
                    </v-chip>
                    <span
                      v-else-if="index === 3"
                      class="text-grey text-caption align-self-center ml-2"
                    >
                      (+{{ disciplinaIds.length - 3 }} outras)
                    </span>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="observacao"
                  label="Observação"
                  :error-messages="observacaoErro"
                  variant="outlined"
                  rows="3"
                  required
                  placeholder="Descreva informações importantes sobre esta matriz curricular..."
                />
              </v-col>
            </v-row>

            <v-row class="mt-4">
              <v-col cols="12" class="d-flex justify-end">
                <v-btn
                  color="secondary"
                  variant="outlined"
                  class="mr-2"
                  @click="router.push(paths.matrizCurricular.list)"
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
