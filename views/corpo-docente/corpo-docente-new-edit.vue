<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import UiParentCard from '@/components/shared/UiParentCard.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
import { paths } from '@/routes/paths'
import { CorpoDocenteService, ServidorService, disciplinaService } from '~/services'
import { useNotification } from '~/composables/useNotification'
import { CORPO_DOCENTE_BREADCRUMBS_NEW_EDIT } from './enums/corpo-docente-enums'
import { useCorpoDocenteForm } from './resolvers/corpo-docente-resolver'

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
  
  // Se for edição, carregar dados
  if (isEdit && id) {
    try {
      const corpoDocente = await CorpoDocenteService.findOneById(id);
      setValues({
        servidorId: corpoDocente.servidor.id.toString(),
        disciplina: corpoDocente.disciplina.id.toString(),
      });
    } catch (error) {
      console.error('Erro ao carregar dados do corpo docente:', error);
      showError('Erro ao carregar dados do corpo docente.');
    }
  }
});

const onSubmit = handleSubmit(async (values) => {
  try {
    const payload = {
      servidorId: Number(values.servidorId), 
      disciplinaId: Number(values.disciplina)
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

console.log(values)

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
