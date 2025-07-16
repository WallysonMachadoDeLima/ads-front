<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import type { IDocumentoDto } from '@/interfaces';
import { documentoService } from '~/services';

// Recebe o ID como prop
const props = defineProps<{
  id: string | number;
}>();

// Reactive state
const loading = ref(false);
const error = ref<string | null>(null);
const documento = ref<IDocumentoDto | null>(null);

const breadcrumbs = [
  { title: 'Dashboard', disabled: false, href: paths.dashboard },
  { title: 'Documentos', disabled: false, href: paths.documento.list },
  { title: 'Visualizar', disabled: true },
];

// Methods
const handleEdit = () => {
  navigateTo(paths.documento.edit(props.id));
};

const handleBack = () => {
  navigateTo(paths.documento.list);
};

const openDocument = () => {
  if (documento.value?.url) {
    window.open(documento.value.url, '_blank');
  }
};

const loadDocumento = async () => {
  try {
    loading.value = true;
    error.value = null;
    const documentoData = await documentoService.findOneById(Number(props.id));
    documento.value = documentoData;
  } catch (err: any) {
    error.value = err.message || 'Erro ao carregar documento';
    console.error('Erro ao carregar documento:', err);
  } finally {
    loading.value = false;
  }
};

// Load data on mount
onMounted(() => {
  loadDocumento();
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Visualizar Documento"
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
          <div class="mt-2">Carregando documento...</div>
        </div>

        <div v-else-if="documento" class="documento-details">
          <v-row>
            <v-col cols="12" md="6">
              <v-card class="mb-4" variant="outlined">
                <v-card-title class="bg-primary text-white">
                  Informações Gerais
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <div class="mb-3">
                        <strong>Nome:</strong> {{ documento.nome }}
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="mb-3">
                        <strong>Descrição:</strong> {{ documento.descricao }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-card class="mb-4" variant="outlined">
                <v-card-title class="bg-primary text-white">
                  Acesso ao Documento
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <div class="mb-3">
                        <strong>URL:</strong> 
                        <div class="mt-1">
                          <small class="text-caption">{{ documento.url }}</small>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <v-btn
                        color="primary"
                        variant="elevated"
                        prepend-icon="mdi-open-in-new"
                        block
                        @click="openDocument"
                      >
                        Abrir Documento
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <div v-else class="text-center py-8">
          <v-icon size="48" class="mb-2">mdi-file-document-alert</v-icon>
          <div>Documento não encontrado</div>
        </div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>

<style scoped>
.documento-details .v-card-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.documento-details strong {
  color: rgb(var(--v-theme-primary));
}
</style>
