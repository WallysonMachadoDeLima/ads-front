<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import UiParentCard from '@/components/shared/UiParentCard.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
import { paths } from '@/routes/paths'
import { CorpoDocenteService, ServidorService } from '~/services'
import { CORPO_DOCENTE_BREADCRUMBS_LIST } from './enums/corpo-docente-enums'
import { useCorpoDocenteForm } from './resolvers/corpo-docente-resolver'

// router e breadcrumbs
const router = useRouter()
const breadcrumbs = CORPO_DOCENTE_BREADCRUMBS_LIST

// form
const {
  handleSubmit,
  servidorId,
  servidorIdErro,
  disciplina,
  disciplinaErro,
  values,
} = useCorpoDocenteForm()

// tipo correto para o select
interface Servidor {
  idServidor: number
  nome: string
}

const servidores = ref<Servidor[]>([])

async function fetchServidores() {
  try {
    const response = await ServidorService.findAll()
    console.log('Servidores:', response)
    servidores.value = response
  } catch (error) {
    console.error('Erro ao buscar servidores:', error)
  }
}

onMounted(fetchServidores)

const onSubmit = handleSubmit(async (values) => {
  try {
    await CorpoDocenteService.create({disciplina: values.disciplina, servidorId: values.servidor})
    alert('Corpo docente cadastrado com sucesso!')
    router.push(paths.corpoDocente.list)
  } catch (error) {
    alert('Erro ao cadastrar corpo docente.')
    console.error(error)
  }
})

console.log(values)

</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Cadastrar Corpo Docente"
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
                item-value="idServidor"
                :error-messages="servidorIdErro"
                label="Servidor"
                outlined
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="disciplina"
                :error-messages="disciplinaErro"
                label="Disciplina"
                outlined
                dense
              />
            </v-col>

            <v-col cols="12" class="text-right">
              <v-btn type="submit" color="primary" class="mt-4">
                Cadastrar Integrante
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
