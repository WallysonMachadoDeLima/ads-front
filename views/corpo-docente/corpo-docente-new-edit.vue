<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import UiParentCard from '@/components/shared/UiParentCard.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
import { paths } from '@/routes/paths'
import { CorpoDocenteService, ServidorService, disciplinaService, EnumsService } from '~/services'
import { useNotification } from '~/composables/useNotification'
import { CORPO_DOCENTE_BREADCRUMBS_NEW_EDIT } from './enums/corpo-docente-enums'
import { useCorpoDocenteForm } from './resolvers/corpo-docente-resolver'
import type { IEnumItem } from '~/services/enums-service'

// Props
const props = defineProps<{
  isEdit?: boolean;
  currentId?: string | number;
}>();

// router e breadcrumbs
const router = useRouter()
const { success, error: showError } = useNotification()
const breadcrumbs = CORPO_DOCENTE_BREADCRUMBS_NEW_EDIT
const id = Number(props.currentId) || 0;
const isEdit = props.isEdit || !!id;

// form
const {
  handleSubmit,
  setValues,
  servidorId,
  servidorIdErro,
  disciplina,
  disciplinaErro,
  turno,
  turnoErro,
  cargaHorariaSemanal,
  cargaHorariaErro,
  tipoContrato,
  tipoContratoErro,
  observacoes,
  observacoesErro,
  situacao,
  situacaoErro,
  values,
} = useCorpoDocenteForm()

// tipo correto para o select
interface Servidor {
  id: number
  nome: string
}

interface Disciplina {
  id: number
  nome: string
  codigo: string
}

const servidores = ref<Servidor[]>([])
const disciplinas = ref<Disciplina[]>([])
const turnos = ref<IEnumItem[]>([])
const tiposContrato = ref<IEnumItem[]>([])
const situacoes = ref<IEnumItem[]>([])
const cargasHorarias = ref<string[]>(['20h', '40h', '30h', '10h', '60h'])

async function fetchServidores() {
  try {
    const response = await ServidorService.findAll()
    // Mapear para o formato esperado
    servidores.value = response.map(servidor => ({
      id: (servidor as any).id || servidor.idServidor, // usar id do backend ou idServidor da interface
      nome: servidor.nome
    }))
  } catch (error) {
    console.error('Erro ao buscar servidores:', error)
  }
}

async function fetchDisciplinas() {
  try {
    const response = await disciplinaService.findAll()
    disciplinas.value = response
  } catch (error) {
    console.error('Erro ao buscar disciplinas:', error)
  }
}

onMounted(async () => {
  await fetchServidores();
  await fetchDisciplinas();
  
  // Carregar enums da API
  try {
    tiposContrato.value = await EnumsService.getTipoContrato();
  } catch (error) {
    console.error('Erro ao carregar tipos de contrato:', error);
    tiposContrato.value = [
      { value: 0, name: 'Efetivo', description: 'Efetivo' },
      { value: 1, name: 'Temporário', description: 'Temporário' },
      { value: 2, name: 'Estagiário', description: 'Estagiário' },
      { value: 3, name: 'Voluntário', description: 'Voluntário' },
    ];
  }

  // Turnos e situações sempre valores padrão
  turnos.value = [
    { value: 1, name: 'Matutino', description: 'Matutino' },
    { value: 2, name: 'Vespertino', description: 'Vespertino' },
    { value: 3, name: 'Noturno', description: 'Noturno' },
    { value: 4, name: 'Integral', description: 'Integral' },
  ];

  situacoes.value = [
    { value: 1, name: 'Ativo', description: 'Ativo' },
    { value: 2, name: 'Inativo', description: 'Inativo' },
    { value: 3, name: 'Suspenso', description: 'Suspenso' },
  ];
  
  // Se for edição, carregar dados
  if (isEdit && id) {
    try {
      const corpoDocente = await CorpoDocenteService.findOneById(id);
      
      // Mapear strings de volta para números para o formulário
      const turnoReverseMap: { [key: string]: number } = {
        'Matutino': 1,
        'Vespertino': 2,
        'Noturno': 3,
        'Integral': 4
      };

      const situacaoReverseMap: { [key: string]: number } = {
        'Ativo': 1,
        'Inativo': 2,
        'Suspenso': 3
      };

      setValues({
        servidorId: corpoDocente.servidor.id,
        disciplina: corpoDocente.disciplina.id,
        turno: turnoReverseMap[corpoDocente.turno] || 1,
        cargaHorariaSemanal: corpoDocente.cargaHorariaSemanal || '',
        tipoContrato: corpoDocente.tipoContrato || 0,
        observacoes: corpoDocente.observacoes || '',
        situacao: situacaoReverseMap[corpoDocente.situacao] || 1,
      });
      
      console.log('Valores carregados para edição:');
      console.log('Servidor ID:', corpoDocente.servidor.id, 'Nome:', corpoDocente.servidor.nome);
      console.log('Disciplina ID:', corpoDocente.disciplina.id, 'Nome:', corpoDocente.disciplina.nome);
    } catch (error) {
      console.error('Erro ao carregar dados do corpo docente:', error);
      showError('Erro ao carregar dados do corpo docente.');
    }
  }
});

const onSubmit = handleSubmit(async (values) => {
  try {
    // Mapear valores para strings conforme API
    const turnoMap: { [key: number]: string } = {
      1: 'Matutino',
      2: 'Vespertino',
      3: 'Noturno',
      4: 'Integral'
    };

    const situacaoMap: { [key: number]: string } = {
      1: 'Ativo',
      2: 'Inativo',
      3: 'Suspenso'
    };

    const payload = {
      servidorId: Number(values.servidorId), 
      disciplinaId: Number(values.disciplina),
      turno: turnoMap[Number(values.turno)] || 'Matutino',
      cargaHorariaSemanal: values.cargaHorariaSemanal,
      tipoContrato: Number(values.tipoContrato),
      observacoes: values.observacoes,
      situacao: situacaoMap[Number(values.situacao)] || 'Ativo',
    };
    
    if (isEdit) {
      await CorpoDocenteService.update(id, payload);
      success('Corpo docente atualizado com sucesso!');
    } else {
      await CorpoDocenteService.create(payload);
      success('Corpo docente cadastrado com sucesso!');
    }
    router.push(paths.corpoDocente.list);
  } catch (error) {
    showError('Erro ao cadastrar corpo docente.');
    console.error('Erro detalhado:', error)
  }
})

</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        :title="isEdit ? 'Editar Corpo Docente' : 'Cadastrar Corpo Docente'"
        :breadcrumbs="breadcrumbs"
        button-label="Listar Corpo Docente"
        :button-to="paths.corpoDocente.list"
      />

      <UiParentCard>
        <v-form @submit.prevent="onSubmit">
          <v-row dense>
            <v-col cols="12" md="6">
              <v-select
                v-model="servidorId"
                :items="servidores"
                item-title="nome"        
                item-value="id"
                :error-messages="servidorIdErro"
                label="Servidor"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="disciplina"
                :items="disciplinas"
                item-title="nome"        
                item-value="id"
                :error-messages="disciplinaErro"
                label="Disciplina"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="turno"
                :items="turnos"
                item-title="name"        
                item-value="value"
                :error-messages="turnoErro"
                label="Turno"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="cargaHorariaSemanal"
                :items="cargasHorarias"
                :error-messages="cargaHorariaErro"
                label="Carga Horária Semanal"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="tipoContrato"
                :items="tiposContrato"
                item-title="name"        
                item-value="value"
                :error-messages="tipoContratoErro"
                label="Tipo de Contrato"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="situacao"
                :items="situacoes"
                item-title="name"        
                item-value="value"
                :error-messages="situacaoErro"
                label="Situação"
                variant="outlined"
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="observacoes"
                :error-messages="observacoesErro"
                label="Observações"
                variant="outlined"
                rows="3"
              />
            </v-col>

            <v-col cols="12" class="text-right">
              <v-btn type="submit" color="primary" class="mt-4">
                {{ isEdit ? 'Atualizar' : 'Cadastrar' }} Integrante
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
