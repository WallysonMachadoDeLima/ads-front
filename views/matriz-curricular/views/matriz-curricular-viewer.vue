<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ref, onMounted } from 'vue';
import { matrizCurricularService } from '@/services';
import { paths } from '@/routes/paths';
import type { IMatrizCurricularDto } from '@/interfaces';

// Props
const props = defineProps<{
  id: string | number;
}>();

// Reactive state
const loading = ref(false);
const error = ref<string | null>(null);
const matrizCurricular = ref<IMatrizCurricularDto | null>(null);

const breadcrumbs = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Matrizes Curriculares', disabled: false, href: paths.matrizCurricular.list },
  { title: 'Visualizar', disabled: true },
];

// Methods
const handleEdit = () => {
  navigateTo(paths.matrizCurricular.edit(props.id));
};

const handleBack = () => {
  navigateTo(paths.matrizCurricular.list);
};

const loadMatrizCurricular = async () => {
  try {
    loading.value = true;
    error.value = null;
    matrizCurricular.value = await matrizCurricularService.findOneById(Number(props.id));
  } catch (err: any) {
    error.value = err.message || 'Erro ao carregar matriz curricular';
    console.error('Erro ao carregar matriz curricular:', err);
  } finally {
    loading.value = false;
  }
};

// Load data on mount
onMounted(() => {
  loadMatrizCurricular();
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Visualizar Matriz Curricular"
        :breadcrumbs="breadcrumbs"
      />

      <UiParentCard>
        <template #action>
          <div class="d-flex gap-2">
            <v-btn
              color="secondary"
              variant="outlined"
              @click="handleBack"
            >
              <v-icon start>mdi-arrow-left</v-icon>
              Voltar
            </v-btn>
            <v-btn
              color="primary"
              @click="handleEdit"
            >
              <v-icon start>mdi-pencil</v-icon>
              Editar
            </v-btn>
          </div>
        </template>

        <v-alert
          v-if="error"
          type="error"
          class="mb-4"
          :text="error"
        />

    <div v-if="loading" class="text-center py-8">
      <v-progress-circular indeterminate color="primary" />
      <div class="mt-2">Carregando matriz curricular...</div>
    </div>

    <div v-else-if="matrizCurricular" class="matriz-curricular-details">
      <v-row>
        <v-col cols="12" >
          <v-card class="mb-4" variant="outlined">
            <v-card-title class="bg-primary text-white">
              Informações Gerais
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <div class="mb-3">
                    <strong>Nome:</strong> {{ matrizCurricular.nome }}
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="mb-3">
                    <strong>Ano:</strong> {{ matrizCurricular.ano }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="mb-3">
                    <strong>Observação:</strong> 
                    <div class="mt-1" style="white-space: pre-line;">
                      {{ matrizCurricular.observacao || 'Nenhuma observação informada' }}
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card variant="outlined">
            <v-card-title class="bg-primary text-white">
              Disciplinas da Matriz Curricular
            </v-card-title>
            <v-card-text>
              <div v-if="matrizCurricular.disciplinas?.length" class="disciplinas-grid">
                <v-row>
                  <v-col
                    v-for="disciplina in matrizCurricular.disciplinas"
                    :key="disciplina.id"
                    cols="12"
                    md="6"
                    lg="4"
                  >
                    <v-card class="disciplina-card" variant="outlined">
                      <v-card-text>
                        <div class="disciplina-info">
                          <h4 class="text-primary mb-2">{{ disciplina.nome }}</h4>
                          <div class="text-caption mb-2">
                            <strong>Código:</strong> {{ disciplina.codigo || 'N/A' }}
                          </div>
                          <div class="text-body-2" style="white-space: pre-line;">
                            {{ disciplina.descricao?.substring(0, 100) || 'Sem descrição' }}
                            <span v-if="disciplina.descricao && disciplina.descricao.length > 100">...</span>
                          </div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
              <div v-else class="text-center py-8">
                <v-icon size="48" class="mb-2">mdi-book-outline</v-icon>
                <div>Nenhuma disciplina vinculada a esta matriz curricular</div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-else class="text-center py-8">
      <v-icon size="48" class="mb-2">mdi-grid-large</v-icon>
      <div>Matriz curricular não encontrada</div>
    </div>
  </UiParentCard>
    </v-col>
  </v-row>
</template>

<style scoped>
.matriz-curricular-details .v-card-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.matriz-curricular-details strong {
  color: rgb(var(--v-theme-primary));
}

.disciplina-card {
  height: 100%;
}

.disciplina-info {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.disciplinas-grid .v-col {
  display: flex;
}
</style>
