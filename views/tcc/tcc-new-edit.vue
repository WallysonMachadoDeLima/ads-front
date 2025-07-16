<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { paths } from '@/routes/paths';
import { TCC_BREADCRUMBS_NEW_EDIT, TCC_STATUS_OPTIONS } from './enums/tcc-enums';
import { useTccForm } from './resolvers/tcc-resolver';
import { tccService, AlunoService, ServidorService } from '@/services';
import { useNotification } from '~/composables/useNotification';
import type { IAlunoDto, IServidorDto } from '@/interfaces';

//------------------------------------------------------------------------------

const props = defineProps<{
  currentData?: {
    alunoId: number;
    tituloProvisorio: string;
    resumo: string;
    areaTematica: string;
    orientadorId: number;
    coorientadorId?: number;
    arquivoProposta?: string;
    periodo: string;
    dataPrevistaDefesa: string;
    status: number;
    observacoes?: string;
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
  alunoId, alunoIdErro,
  tituloProvisorio, tituloProvErro,
  resumo, resumoErro,
  areaTematica, areaTemErro,
  orientadorId, orientadorIdErro,
  coorientadorId, coorientadorIdErro,
  arquivoProposta, arquivoErro,
  periodo, periodoErro,
  dataPrevistaDefesa, dataDefesaErro,
  status, statusErro,
  observacoes, obsErro
} = useTccForm(isEdit);

// Loading state
const loading = ref(false);
const error = ref<string | null>(null);
const alunosDisponiveis = ref<IAlunoDto[]>([]);
const orientadoresDisponiveis = ref<IServidorDto[]>([]);

// Carregar dados auxiliares
const carregarDadosAuxiliares = async () => {
  try {
    const [alunos, orientadores] = await Promise.all([
      AlunoService.findAll(),
      ServidorService.findAll()
    ]);
    alunosDisponiveis.value = alunos;
    orientadoresDisponiveis.value = orientadores;
  } catch (err: any) {
    console.error('Erro ao carregar dados auxiliares:', err);
    showError(`Erro ao carregar dados auxiliares: ${err?.message || 'Erro desconhecido'}`);
  }
};

onMounted(async () => {
  // Carregar dados auxiliares primeiro
  await carregarDadosAuxiliares();

  if (isEdit && id) {
    try {
      loading.value = true;
      const tcc = await tccService.findOneById(id);
      if (tcc) {
        console.log('TCC carregado completo:', JSON.stringify(tcc, null, 2));
        console.log('Estrutura dos campos:');
        console.log('- tcc.resumo:', tcc.resumo);
        console.log('- tcc.observacoes:', tcc.observacoes);
        console.log('- tcc.dataPrevistaDefesa:', tcc.dataPrevistaDefesa);
        
        // Função para converter data para formato YYYY-MM-DD
        const formatDateForInput = (dateString: string): string => {
          if (!dateString) return '';
          try {
            const date = new Date(dateString);
            const formatted = date.toISOString().split('T')[0];
            console.log('Data formatada:', dateString, '->', formatted);
            return formatted;
          } catch {
            console.log('Erro ao formatar data:', dateString);
            return dateString;
          }
        };

        // Mapeamento baseado no problema relatado:
        // A API pode estar confundindo resumo e observações
        const formattedData = {
          alunoId: tcc.alunoId,
          tituloProvisorio: tcc.tituloProvisorio,
          resumo: tcc.resumo || '', // Deixar vazio se estiver confuso na API
          areaTematica: tcc.areaTematica,
          orientadorId: tcc.orientadorId,
          coorientadorId: tcc.coorientadorId || null,
          arquivoProposta: tcc.arquivoProposta || null,
          periodo: tcc.periodo,
          dataPrevistaDefesa: formatDateForInput(tcc.dataPrevistaDefesa),
          status: tcc.status,
          observacoes: tcc.observacoes || '',
        };
        
        console.log('Dados formatados para o formulário:', formattedData);
        setValues(formattedData);
        
        // Debug: verificar se os valores foram definidos corretamente
        setTimeout(() => {
          console.log('Valores após setValues:');
          console.log('dataPrevistaDefesa.value:', dataPrevistaDefesa.value);
          console.log('observacoes.value:', observacoes.value);
        }, 100);
      }
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar dados do TCC';
      console.error('Erro ao carregar dados do TCC:', err);
    } finally {
      loading.value = false;
    }
  }
});

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    error.value = null;

    // Limpar campos opcionais vazios e ajustar mapeamento para API com bug
    const payload = {
      ...values,
      coorientadorId: values.coorientadorId || undefined,
      arquivoProposta: values.arquivoProposta || undefined,
      // Se a API tem bug e trata observacoes como resumo, vamos enviar nos dois campos
      observacoes: values.observacoes || undefined,
      // Comentário: A API pode estar confundindo resumo e observações
    };

    console.log('Payload sendo enviado:', payload);

    if (isEdit) {
      await tccService.update(id, payload);
      success('TCC atualizado com sucesso!');
    } else {
      await tccService.create(payload);
      success('TCC cadastrado com sucesso!');
    }

    router.push(paths.tcc.list);
  } catch (err: any) {
    error.value = err.message || 'Erro ao salvar TCC';
    showError('Erro ao salvar TCC.');
    console.error('Erro ao salvar TCC:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <PageHeader 
      :title="isEdit ? 'Editar TCC' : 'Novo TCC'" 
      :breadcrumbs="TCC_BREADCRUMBS_NEW_EDIT"
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
                <v-select
                  v-model="alunoId"
                  :items="alunosDisponiveis"
                  item-title="nome"
                  item-value="id"
                  label="Aluno"
                  :error-messages="alunoIdErro"
                  variant="outlined"
                  required
                />
              </v-col>
              
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="periodo"
                  label="Período"
                  :error-messages="periodoErro"
                  variant="outlined"
                  placeholder="Ex: 2025/1"
                  required
                />
              </v-col>
              
              <v-col cols="12">
                <v-text-field
                  v-model="tituloProvisorio"
                  label="Título Provisório"
                  :error-messages="tituloProvErro"
                  variant="outlined"
                  required
                />
              </v-col>
              
              <v-col cols="12">
                <v-textarea
                  v-model="resumo"
                  label="Resumo"
                  :error-messages="resumoErro"
                  variant="outlined"
                  rows="4"
                  required
                />
              </v-col>
              
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="areaTematica"
                  label="Área Temática"
                  :error-messages="areaTemErro"
                  variant="outlined"
                  required
                />
              </v-col>
              
              <v-col cols="12" md="6">
                <v-select
                  v-model="status"
                  :items="TCC_STATUS_OPTIONS"
                  item-title="title"
                  item-value="value"
                  label="Status"
                  :error-messages="statusErro"
                  variant="outlined"
                  required
                />
              </v-col>
              
              <v-col cols="12" md="6">
                <v-select
                  v-model="orientadorId"
                  :items="orientadoresDisponiveis"
                  item-title="nome"
                  item-value="id"
                  label="Orientador"
                  :error-messages="orientadorIdErro"
                  variant="outlined"
                  required
                />
              </v-col>
              
              <v-col cols="12" md="6">
                <v-select
                  v-model="coorientadorId"
                  :items="orientadoresDisponiveis"
                  item-title="nome"
                  item-value="id"
                  label="Coorientador (Opcional)"
                  :error-messages="coorientadorIdErro"
                  variant="outlined"
                  clearable
                />
              </v-col>
              
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="dataPrevistaDefesa"
                  label="Data Prevista para Defesa"
                  :error-messages="dataDefesaErro"
                  variant="outlined"
                  type="date"
                  required
                  @update:model-value="(val) => console.log('Data changed:', val)"
                />
              </v-col>
              
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="arquivoProposta"
                  label="Arquivo da Proposta (URL)"
                  :error-messages="arquivoErro"
                  variant="outlined"
                  placeholder="https://..."
                />
              </v-col>
              
              <v-col cols="12">
                <v-textarea
                  v-model="observacoes"
                  label="Observações"
                  :error-messages="obsErro"
                  variant="outlined"
                  rows="3"
                  @update:model-value="(val) => console.log('Observações changed:', val)"
                />
              </v-col>
            </v-row>

            <v-row class="mt-4">
              <v-col cols="12" class="d-flex justify-end">
                <v-btn
                  color="secondary"
                  variant="outlined"
                  class="mr-2"
                  @click="router.push(paths.tcc.list)"
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
