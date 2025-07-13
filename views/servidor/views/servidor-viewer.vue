<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { ServidorService } from '~/services/servidor-service';
import { EnumsService } from '~/services/enums-service';
import type { IServidorDto } from '~/interfaces';
import type { IEnumItem } from '~/services/enums-service';

// Recebe o ID como prop
const props = defineProps<{
  id: string | number;
}>();

// Reactive state
const loading = ref(false);
const error = ref<string | null>(null);
const servidor = ref<IServidorDto | null>(null);
const tipos = ref<IEnumItem[]>([]);

const breadcrumbs = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Servidores', disabled: false, href: paths.servidor.list },
  { title: 'Visualizar', disabled: true },
];

// Methods
const handleEdit = () => {
  navigateTo(paths.servidor.edit(props.id));
};

const handleBack = () => {
  navigateTo(paths.servidor.list);
};

const getTipoNome = (tipoValue: number): string => {
  const tipo = tipos.value.find(t => t.value === tipoValue);
  return tipo ? tipo.name : 'Desconhecido';
};

const loadServidor = async () => {
  try {
    loading.value = true;
    error.value = null;
    // Carregar tipos e dados do servidor em paralelo
    const [tiposData, servidorData] = await Promise.all([
      EnumsService.getServidorTipos(),
      ServidorService.findOneById(Number(props.id))
    ]);
    
    tipos.value = tiposData;
    servidor.value = servidorData;
  } catch (err: any) {
    error.value = err.message || 'Erro ao carregar servidor';
    console.error('Erro ao carregar servidor:', err);
  } finally {
    loading.value = false;
  }
};

// Load data on mount
onMounted(() => {
  loadServidor();
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Visualizar Servidor"
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
          <div class="mt-2">Carregando servidor...</div>
        </div>

        <div v-else-if="servidor" class="servidor-details">
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
                        <strong>ID:</strong> {{ servidor.idServidor }}
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="mb-3">
                        <strong>Nome:</strong> {{ servidor.nome }}
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="mb-3">
                        <strong>CPF:</strong> {{ servidor.cpf }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-card class="mb-4" variant="outlined">
                <v-card-title class="bg-primary text-white">
                  Informações Profissionais
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <div class="mb-3">
                        <strong>Email:</strong> {{ servidor.email }}
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="mb-3">
                        <strong>Tipo:</strong> {{ getTipoNome(servidor.tipo) }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <div v-else class="text-center py-8">
          <v-icon size="48" class="mb-2">mdi-account-tie-alert</v-icon>
          <div>Servidor não encontrado</div>
        </div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>

<style scoped>
.servidor-details .v-card-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.servidor-details strong {
  color: rgb(var(--v-theme-primary));
}
</style>