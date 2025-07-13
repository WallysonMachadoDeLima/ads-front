<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ref, onMounted } from 'vue';
import { disciplinaService } from '@/services';
import { paths } from '@/routes/paths';
import type { IDisciplinaDto } from '@/interfaces';

// Props
const props = defineProps<{
  id: string | number;
}>();

// Reactive state
const loading = ref(false);
const error = ref<string | null>(null);
const disciplina = ref<IDisciplinaDto | null>(null);

const breadcrumbs = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Disciplinas', disabled: false, href: paths.disciplina.list },
  { title: 'Visualizar', disabled: true },
];

// Methods
const handleEdit = () => {
  navigateTo(paths.disciplina.edit(props.id));
};

const handleBack = () => {
  navigateTo(paths.disciplina.list);
};

const loadDisciplina = async () => {
  try {
    loading.value = true;
    error.value = null;
    disciplina.value = await disciplinaService.getById(Number(props.id));
  } catch (err: any) {
    error.value = err.message || 'Erro ao carregar disciplina';
    console.error('Erro ao carregar disciplina:', err);
  } finally {
    loading.value = false;
  }
};

// Load data on mount
onMounted(() => {
  loadDisciplina();
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Visualizar Disciplina"
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
      <div class="mt-2">Carregando disciplina...</div>
    </div>

    <div v-else-if="disciplina" class="disciplina-details">
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4" variant="outlined">
            <v-card-title class="bg-primary text-white">
              Informações Básicas
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <div class="mb-3">
                    <strong>ID:</strong> {{ disciplina.id }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="mb-3">
                    <strong>Nome:</strong> {{ disciplina.nome }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="mb-3">
                    <strong>Código:</strong> {{ disciplina.codigo }}
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="6">
          <v-card class="mb-4" variant="outlined">
            <v-card-title class="bg-primary text-white">
              Descrição
            </v-card-title>
            <v-card-text>
              <p class="text-body-1">{{ disciplina.descricao }}</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="mb-4" variant="outlined">
            <v-card-title class="bg-primary text-white">
              Objetivos
            </v-card-title>
            <v-card-text>
              <p class="text-body-1" style="white-space: pre-line;">{{ disciplina.objetivos }}</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card variant="outlined">
            <v-card-title class="bg-primary text-white">
              Conteúdo Programático
            </v-card-title>
            <v-card-text>
              <p class="text-body-1" style="white-space: pre-line;">{{ disciplina.conteudo }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-else class="text-center py-8">
      <v-icon size="48" class="mb-2">mdi-book-alert-outline</v-icon>
      <div>Disciplina não encontrada</div>
    </div>
  </UiParentCard>
    </v-col>
  </v-row>
</template>

<style scoped>
.disciplina-details .v-card-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.disciplina-details strong {
  color: rgb(var(--v-theme-primary));
}
</style>
