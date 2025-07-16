<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ref, onMounted } from 'vue';
import { tccService } from '@/services';
import { paths } from '@/routes/paths';
import type { ITccDto } from '@/interfaces';
import { getStatusText, getStatusColor } from '../enums/tcc-enums';

// Props
const props = defineProps<{
  id: string | number;
}>();

// Reactive state
const loading = ref(false);
const error = ref<string | null>(null);
const tcc = ref<ITccDto | null>(null);

const breadcrumbs = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'TCCs', disabled: false, href: paths.tcc.list },
  { title: 'Visualizar', disabled: true },
];

// Methods
const handleEdit = () => {
  navigateTo(paths.tcc.edit(props.id));
};

const handleBack = () => {
  navigateTo(paths.tcc.list);
};

const loadTcc = async () => {
  try {
    loading.value = true;
    error.value = null;
    tcc.value = await tccService.findOneById(Number(props.id));
  } catch (err: any) {
    error.value = err.message || 'Erro ao carregar TCC';
    console.error('Erro ao carregar TCC:', err);
  } finally {
    loading.value = false;
  }
};

// Load data on mount
onMounted(() => {
  loadTcc();
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Visualizar TCC"
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
      <div class="mt-2">Carregando TCC...</div>
    </div>

    <div v-else-if="tcc" class="tcc-details">
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4" variant="outlined">
            <v-card-title class="bg-primary text-white d-flex align-center justify-space-between">
              <span>Informações Gerais</span>
              <v-chip
                :color="getStatusColor(tcc.status)"
                size="small"
                variant="tonal"
                class="text-white"
              >
                {{ getStatusText(tcc.status) }}
              </v-chip>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4">
                  <div class="mb-3">
                    <strong>Período:</strong> {{ tcc.periodo }}
                  </div>
                </v-col>
                <v-col cols="12" md="4">
                  <div class="mb-3">
                    <strong>Título Provisório:</strong> {{ tcc.tituloProvisorio }}
                  </div>
                </v-col>
                <v-col cols="12"  md="4">
                  <div class="mb-3">
                    <strong>Área Temática:</strong> {{ tcc.areaTematica }}
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4" variant="outlined">
            <v-card-title class="bg-primary text-white">
              Participantes
            </v-card-title>
            <v-card-text>
              <div class="mb-3">
                <strong>Aluno:</strong> {{ tcc.aluno?.nome || `ID: ${tcc.alunoId}` }}
              </div>
              <div class="mb-3">
                <strong>Orientador:</strong> {{ tcc.orientador?.nome || `Servidor ID: ${tcc.orientadorId}` }}
              </div>
              <div v-if="tcc.coorientadorId" class="mb-3">
                <strong>Coorientador:</strong> {{ tcc.coorientador?.nome || `Servidor ID: ${tcc.coorientadorId}` }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mb-4" variant="outlined">
            <v-card-title class="bg-primary text-white">
              Datas Importantes
            </v-card-title>
            <v-card-text>
              <div class="mb-3">
                <strong>Data de Submissão:</strong> {{ new Date(tcc.dataSubmissao).toLocaleDateString('pt-BR') }}
              </div>
              <div class="mb-3">
                <strong>Data Prevista para Defesa:</strong> {{ new Date(tcc.dataPrevistaDefesa).toLocaleDateString('pt-BR') }}
              </div>
              <div v-if="tcc.dataAprovacao" class="mb-3">
                <strong>Data de Aprovação:</strong> {{ new Date(tcc.dataAprovacao).toLocaleDateString('pt-BR') }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="mb-4" variant="outlined">
            <v-card-title class="bg-primary text-white">
              Resumo
            </v-card-title>
            <v-card-text>
              <p class="text-body-1" style="white-space: pre-line;">{{ tcc.resumo }}</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" v-if="tcc.arquivoProposta">
          <v-card class="mb-4" variant="outlined">
            <v-card-title class="bg-primary text-white">
              Arquivo da Proposta
            </v-card-title>
            <v-card-text>
              <v-btn
                :href="tcc.arquivoProposta"
                target="_blank"
                color="primary"
                variant="outlined"
                prepend-icon="mdi-file-document-outline"
              >
                Visualizar Proposta
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" v-if="tcc.observacoes">
          <v-card variant="outlined">
            <v-card-title class="bg-primary text-white">
              Observações
            </v-card-title>
            <v-card-text>
              <p class="text-body-1" style="white-space: pre-line;">{{ tcc.observacoes }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-else class="text-center py-8">
      <v-icon size="48" class="mb-2">mdi-file-document-alert-outline</v-icon>
      <div>TCC não encontrado</div>
    </div>
  </UiParentCard>
    </v-col>
  </v-row>
</template>

<style scoped>
.tcc-details .v-card-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.tcc-details strong {
  color: rgb(var(--v-theme-primary));
}
</style>
