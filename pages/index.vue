<script setup lang="ts">
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { ref, onMounted, computed } from 'vue';
import { tccService } from '@/services';
import { paths } from '@/routes/paths';
import type { ITccDto } from '@/interfaces';

// Estados reativos
const loading = ref(false);
const error = ref<string | null>(null);
const tccs = ref<ITccDto[]>([]);

// TCCs ordenados pela data prevista de defesa (mais próxima primeiro)
const tccsOrdenados = computed(() => {
  return [...tccs.value].sort((a, b) => {
    const dataA = new Date(a.dataPrevistaDefesa);
    const dataB = new Date(b.dataPrevistaDefesa);
    return dataA.getTime() - dataB.getTime();
  });
});

// Função para carregar TCCs
const carregarTccs = async () => {
  try {
    loading.value = true;
    error.value = null;
    tccs.value = await tccService.findAll();
  } catch (err: any) {
    error.value = err.message || 'Erro ao carregar TCCs';
    console.error('Erro ao carregar TCCs:', err);
  } finally {
    loading.value = false;
  }
};

// Função para formatar data
const formatarData = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('pt-BR');
  } catch {
    return 'Data inválida';
  }
};

// Função para obter cor do status
const getStatusColor = (status: number): string => {
  const statusColors: Record<number, string> = {
    0: 'orange',  // Em andamento
    1: 'blue',    // Aguardando revisão
    2: 'green',   // Aprovado
    3: 'red',     // Rejeitado
    4: 'purple',  // Defendido
  };
  return statusColors[status] || 'grey';
};

// Função para obter texto do status
const getStatusText = (status: number): string => {
  const statusTexts: Record<number, string> = {
    0: 'Em Andamento',
    1: 'Aguardando Revisão',
    2: 'Aprovado',
    3: 'Rejeitado',
    4: 'Defendido',
  };
  return statusTexts[status] || 'Desconhecido';
};

// Função para verificar se a data está próxima (próximos 30 dias)
const isDataProxima = (dateString: string): boolean => {
  try {
    const dataDefesa = new Date(dateString);
    const hoje = new Date();
    const diffTime = dataDefesa.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays >= 0;
  } catch {
    return false;
  }
};

const getStatusShadow = (status: number): string => {
  const shadows: Record<number, string> = {
    0: 'shadow-rascunho',   // Rascunho
    1: 'shadow-submetido',  // Submetido
    2: 'shadow-aprovado',   // Aprovado
    3: 'shadow-reprovado',  // Reprovado
  };
  return shadows[status] || 'shadow-default';
};

// Navegação
const irParaDetalhes = (id: number) => {
  navigateTo(paths.tcc.view(id));
};

const irParaEdicao = (id: number) => {
  navigateTo(paths.tcc.edit(id));
};

const irParaCriacao = () => {
  navigateTo(paths.tcc.new);
};

// Carregar dados ao montar
onMounted(() => {
  carregarTccs();
});
</script>

<template>
  <div>
    <!-- Estatísticas Rápidas -->
    <v-row class="mb-4">
      <v-col cols="12" md="3">
        <v-card color="primary" dark>
          <v-card-text>
            <div class="d-flex justify-space-between">
              <div>
                <p class="text-caption mb-1">Total de TCCs</p>
                <p class="text-h4 font-weight-bold">{{ tccs.length }}</p>
              </div>
              <v-icon size="40">mdi-book-outline</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="3">
        <v-card color="orange" dark>
          <v-card-text>
            <div class="d-flex justify-space-between">
              <div>
                <p class="text-caption mb-1">Em Andamento</p>
                <p class="text-h4 font-weight-bold">{{ tccs.filter(t => t.status === 0).length }}</p>
              </div>
              <v-icon size="40">mdi-progress-clock</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="3">
        <v-card color="green" dark>
          <v-card-text>
            <div class="d-flex justify-space-between">
              <div>
                <p class="text-caption mb-1">Aprovados</p>
                <p class="text-h4 font-weight-bold">{{ tccs.filter(t => t.status === 2).length }}</p>
              </div>
              <v-icon size="40">mdi-check-circle</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="3">
        <v-card color="red" dark>
          <v-card-text>
            <div class="d-flex justify-space-between">
              <div>
                <p class="text-caption mb-1">Defesas Próximas</p>
                <p class="text-h4 font-weight-bold">{{ tccs.filter(t => isDataProxima(t.dataPrevistaDefesa)).length }}</p>
              </div>
              <v-icon size="40">mdi-calendar-alert</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Lista de TCCs -->
    <v-row>
      <v-col cols="12">
        <UiParentCard>
          <template #title>
            <div class="d-flex justify-space-between align-center">
              <span>TCCs por Data de Defesa</span>
              <v-btn
                variant="text"
                icon="mdi-refresh"
                @click="carregarTccs"
                :loading="loading"
              />
            </div>
          </template>

          <!-- Loading -->
          <div v-if="loading" class="text-center py-8">
            <v-progress-circular indeterminate color="primary" size="50" />
            <p class="mt-3">Carregando TCCs...</p>
          </div>

          <!-- Error -->
          <v-alert
            v-else-if="error"
            type="error"
            class="mb-4"
            :text="error"
          />

          <!-- TCCs Grid -->
          <div v-else-if="tccsOrdenados.length > 0">
            <v-row>
              <v-col
                v-for="tcc in tccsOrdenados"
                :key="tcc.id"
                cols="12"
                md="6"
                lg="4"
              >
                <v-card
                  class="tcc-card"
                    :class="[
                        getStatusShadow(tcc.status),
                        { 'defesa-proxima': isDataProxima(tcc.dataPrevistaDefesa) }
                    ]"
                  elevation="2"
                  hover
                  @click="irParaDetalhes(tcc.id)"
                >
                  <!-- Header do Card -->
                  <v-card-title class="pb-2">
                    <div class="d-flex justify-space-between align-start">
                      <span class="text-truncate">{{ tcc.tituloProvisorio }}</span>
                      <v-chip
                        :color="getStatusColor(tcc.status)"
                        size="small"
                        variant="flat"
                        class="ml-2"
                      >
                        {{ getStatusText(tcc.status) }}
                      </v-chip>
                    </div>
                  </v-card-title>

                  <!-- Conteúdo do Card -->
                  <v-card-text>
                    <div class="mb-3">
                      <div class="d-flex align-center mb-2">
                        <v-icon size="16" class="mr-2">mdi-account</v-icon>
                        <span class="text-body-2">{{ tcc.aluno?.nome || 'Aluno não informado' }}</span>
                      </div>
                      
                      <div class="d-flex align-center mb-2">
                        <v-icon size="16" class="mr-2">mdi-account-tie</v-icon>
                        <span class="text-body-2">{{ tcc.orientador?.nome || 'Orientador não informado' }}</span>
                      </div>
                      
                      <div class="d-flex align-center mb-2">
                        <v-icon size="16" class="mr-2">mdi-calendar</v-icon>
                        <span class="text-body-2 font-weight-medium">{{ formatarData(tcc.dataPrevistaDefesa) }}</span>
                        <v-icon
                          v-if="isDataProxima(tcc.dataPrevistaDefesa)"
                          size="16"
                          color="orange"
                          class="ml-2"
                        >
                          mdi-alert
                        </v-icon>
                      </div>
                      
                      <div class="d-flex align-center">
                        <v-icon size="16" class="mr-2">mdi-school</v-icon>
                        <span class="text-body-2">{{ tcc.periodo }}</span>
                      </div>
                    </div>

                    <!-- Área Temática -->
                    <v-chip
                      color="primary"
                      variant="outlined"
                      size="small"
                      class="mb-3"
                    >
                      {{ tcc.areaTematica }}
                    </v-chip>

                    <!-- Resumo -->
                    <p class="text-body-2 text-grey-darken-1">
                      {{ tcc.resumo?.substring(0, 100) || 'Sem resumo' }}
                      <span v-if="tcc.resumo && tcc.resumo.length > 100">...</span>
                    </p>
                  </v-card-text>

                  <!-- Actions -->
                  <v-card-actions>
                    <v-btn
                      variant="text"
                      color="primary"
                      @click.stop="irParaDetalhes(tcc.id)"
                    >
                      Ver Detalhes
                    </v-btn>
                    <v-btn
                      variant="text"
                      color="secondary"
                      @click.stop="irParaEdicao(tcc.id)"
                    >
                      Editar
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      icon="mdi-dots-vertical"
                      variant="text"
                      size="small"
                    />
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-8">
            <v-icon size="64" color="grey">mdi-book-outline</v-icon>
            <h3 class="text-h6 mt-3 mb-2">Nenhum TCC encontrado</h3>
            <p class="text-body-2 text-grey mb-4">Comece criando seu primeiro TCC</p>
            <v-btn
              color="primary"
              @click="irParaCriacao"
            >
              Criar Primeiro TCC
            </v-btn>
          </div>
        </UiParentCard>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>

.tcc-card {
  border: 2px solid transparent;
  border-radius: 16px;
  background-clip: padding-box;
  position: relative;
  transition: border-image 0.4s ease, transform 0.3s ease;
}

.tcc-card:hover {
  transform: translateY(-4px);
  filter: brightness(1.02);
}

.defesa-proxima {
  border-left: 4px solid #ff9800;
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
}


.shadow-rascunho {
  border-image: linear-gradient(to right, rgba(255,152,0,0.9), rgba(255,193,7,0)) 1;
}

.shadow-submetido {
  border-image: linear-gradient(to right, rgba(33,150,243,0.9), rgba(0,188,212,0)) 1;
}

.shadow-aprovado {
  border-image: linear-gradient(to right, rgba(76,175,80,0.9), rgba(139,195,74,0)) 1;
}

.shadow-reprovado {
  border-image: linear-gradient(to right, rgba(244,67,54,0.9), rgba(233,30,99,0)) 1;
}

.shadow-default {
  border-image: linear-gradient(to right, rgba(158,158,158,0.9), rgba(97,97,97,0)) 1;
}
</style>
