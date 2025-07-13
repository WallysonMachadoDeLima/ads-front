<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import type { IAlunoDto } from '@/interfaces';
import { AlunoService } from '~/services';

// Recebe o ID como prop
const props = defineProps<{
  id: string | number;
}>();

// Reactive state
const loading = ref(false);
const error = ref<string | null>(null);
const aluno = ref<IAlunoDto | null>(null);

const breadcrumbs = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Alunos', disabled: false, href: paths.aluno.list },
  { title: 'Visualizar', disabled: true },
];

// Methods
const handleEdit = () => {
  navigateTo(paths.aluno.edit(props.id));
};

const handleBack = () => {
  navigateTo(paths.aluno.list);
};

const loadAluno = async () => {
  try {
    loading.value = true;
    error.value = null;
    aluno.value = await AlunoService.findOneById(Number(props.id));
  } catch (err: any) {
    error.value = err.message || 'Erro ao carregar aluno';
    console.error('Erro ao carregar aluno:', err);
  } finally {
    loading.value = false;
  }
};

// Load data on mount
onMounted(() => {
  loadAluno();
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Visualizar Aluno"
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
          <div class="mt-2">Carregando aluno...</div>
        </div>

        <div v-else-if="aluno" class="aluno-details">
          <v-row>
            <v-col cols="12" md="6">
              <v-card class="mb-4" variant="outlined">
                <v-card-title class="bg-primary text-white">
                  Informações Pessoais
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <div class="mb-3">
                        <strong>ID:</strong> {{ aluno.idAluno }}
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="mb-3">
                        <strong>Nome:</strong> {{ aluno.nome }}
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="mb-3">
                        <strong>CPF:</strong> {{ aluno.cpf }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-card class="mb-4" variant="outlined">
                <v-card-title class="bg-primary text-white">
                  Informações de Contato
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <div class="mb-3">
                        <strong>Email:</strong> {{ aluno.email }}
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="mb-3">
                        <strong>Telefone:</strong> {{ aluno.telefone }}
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="mb-3">
                        <strong>Matrícula:</strong> {{ aluno.matricula }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <div v-else class="text-center py-8">
          <v-icon size="48" class="mb-2">mdi-account-alert-outline</v-icon>
          <div>Aluno não encontrado</div>
        </div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>

<style scoped>
.aluno-details .v-card-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.aluno-details strong {
  color: rgb(var(--v-theme-primary));
}
</style>