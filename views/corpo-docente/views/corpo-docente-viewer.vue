<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import type { ICorpoDocenteFindOneByIdDto } from '~/interfaces';
import { CorpoDocenteService } from '~/services';

// Recebe o ID como prop
const props = defineProps<{
  id: string | number;
}>();

// Reactive state
const loading = ref(false);
const error = ref<string | null>(null);
const corpoDocente = ref<ICorpoDocenteFindOneByIdDto>( {} as ICorpoDocenteFindOneByIdDto);

const breadcrumbs = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Corpo Docente', disabled: false, href: paths.corpoDocente.list },
  { title: 'Visualizar', disabled: true },
];

// Methods
const handleEdit = () => {
  navigateTo(paths.corpoDocente.edit(props.id));
};

const handleBack = () => {
  navigateTo(paths.corpoDocente.list);
};

const formatTipoContrato = (tipoContrato: number): string => {
  switch (tipoContrato) {
    case 0: return 'Efetivo';
    case 1: return 'Temporário';
    case 2: return 'Estagiário';
    case 3: return 'Voluntário';
    default: return 'Não informado';
  }
};

const loadCorpoDocente = async () => {
  try {
    loading.value = true;
    error.value = null;
    corpoDocente.value = await CorpoDocenteService.findOneById(Number(props.id));
  } catch (err: any) {
    error.value = err.message || 'Erro ao carregar corpo docente';
    console.error('Erro ao carregar corpo docente:', err);
  } finally {
    loading.value = false;
  }
};

// Load data on mount
onMounted(() => {
  loadCorpoDocente();
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Visualizar Corpo Docente"
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
          <div class="mt-2">Carregando corpo docente...</div>
        </div>

        <div v-else-if="corpoDocente && corpoDocente.servidor" class="corpo-docente-details">
          <v-row>
            <v-col cols="12" md="6">
              <v-card class="mb-4" variant="outlined">
                <v-card-title class="bg-primary text-white">
                  Informações do Servidor
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <div class="mb-3">
                        <strong>Nome:</strong> {{ corpoDocente.servidor.nome }}
                      </div>
                    </v-col>
                    <v-col cols="6">
                      <div class="mb-3">
                        <strong>CPF:</strong> {{ corpoDocente.servidor.cpf }}
                      </div>
                    </v-col>
                    <v-col cols="6">
                      <div class="mb-3">
                        <strong>Tipo:</strong> {{ corpoDocente.servidor.tipo === 1 ? 'Administrador' : 'Professor' }}
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="mb-3">
                        <strong>Email:</strong> {{ corpoDocente.servidor.email }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-card class="mb-4" variant="outlined">
                <v-card-title class="bg-primary text-white">
                  Informações da Disciplina
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <div class="mb-3">
                        <strong>Nome:</strong> {{ corpoDocente.disciplina.nome }}
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="mb-3">
                        <strong>Código:</strong> {{ corpoDocente.disciplina.codigo }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-card class="mb-4" variant="outlined">
                <v-card-title class="bg-primary text-white">
                  Informações Acadêmicas
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="6">
                      <div class="mb-3">
                        <strong>Turno:</strong> {{ corpoDocente.turno || 'Não informado' }}
                      </div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="mb-3">
                        <strong>Carga Horária Semanal:</strong> {{ corpoDocente.cargaHorariaSemanal || 'Não informado' }}
                      </div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="mb-3">
                        <strong>Tipo de Contrato:</strong> {{ formatTipoContrato(corpoDocente.tipoContrato) }}
                      </div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="mb-3">
                        <strong>Situação:</strong> 
                        <v-chip 
                          :color="corpoDocente.situacao === 'Ativo' ? 'success' : corpoDocente.situacao === 'Inativo' ? 'warning' : 'error'"
                          size="small"
                        >
                          {{ corpoDocente.situacao || 'Não informado' }}
                        </v-chip>
                      </div>
                    </v-col>
                    <v-col cols="12" v-if="corpoDocente.observacoes">
                      <div class="mb-3">
                        <strong>Observações:</strong>
                        <p class="text-body-2 mt-2" style="white-space: pre-line;">{{ corpoDocente.observacoes }}</p>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-card class="mb-4" variant="outlined">
                <v-card-title class="bg-primary text-white">
                  Descrição da Disciplina
                </v-card-title>
                <v-card-text>
                  <p class="text-body-1">{{ corpoDocente.disciplina.descricao }}</p>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-card class="mb-4" variant="outlined">
                <v-card-title class="bg-primary text-white">
                  Objetivos
                </v-card-title>
                <v-card-text>
                  <p class="text-body-1" style="white-space: pre-line;">{{ corpoDocente.disciplina.objetivos }}</p>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12">
              <v-card variant="outlined">
                <v-card-title class="bg-primary text-white">
                  Conteúdo Programático
                </v-card-title>
                <v-card-text>
                  <p class="text-body-1" style="white-space: pre-line;">{{ corpoDocente.disciplina.conteudo }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <div v-else class="text-center py-8">
          <v-icon size="48" class="mb-2">mdi-account-school-outline</v-icon>
          <div>Membro do corpo docente não encontrado</div>
        </div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>

<style scoped>
.corpo-docente-details .v-card-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.corpo-docente-details strong {
  color: rgb(var(--v-theme-primary));
}
</style>
