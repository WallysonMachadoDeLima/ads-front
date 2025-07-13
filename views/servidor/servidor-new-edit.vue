<script setup lang="ts">
import PageHeader from '@/components/shared/PageHeader.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { paths } from '@/routes/paths';
import { SERVIDOR_BREADCRUMBS_NEW_EDIT } from './enums/servidor-enums';
import { useServidorForm } from './resolvers/servidor-resolver';
import { ServidorService } from '~/services/servidor-service';
import { EnumsService } from '~/services/enums-service';
import { useNotification } from '~/composables/useNotification';
import type { ICreateUpdateServidorDto, IServidorDto } from '~/interfaces';
import type { IEnumItem } from '~/services/enums-service';

//------------------------------------------------------------------------------

const props = defineProps<{
  currentData?: {
    nome: string;
    cpf: string;
    email: string;
    senha?: string;
    tipo: string;
  };
  isEdit?: boolean;
  currentId?: string | number;
}>();

const router = useRouter();
const { success, error: showError } = useNotification();
const id = Number(props.currentId) || 0;
const isEdit = props.isEdit || !!id;

const tipos = ref<IEnumItem[]>([]);

const {
  handleSubmit,
  setValues,
  nome, nomeErro,
  cpf, cpfErro,
  email, emailErro,
  senha, senhaErro,
  tipo, tipoErro,
} = useServidorForm(isEdit);

onMounted(async () => {
  // Carregar tipos de servidor da API
  try {
    tipos.value = await EnumsService.getServidorTipos();
  } catch (error) {
    console.error('Erro ao carregar tipos de servidor:', error);
  }

  // Se for edição, carregar dados do servidor
  if (isEdit && id) {
    try {
      const servidor: IServidorDto = await ServidorService.findOneById(id);
      setValues({
        nome: servidor.nome,
        cpf: servidor.cpf,
        email: servidor.email,
        senha: '', // Não carregar senha por segurança
        tipo: servidor.tipo,
      });
    } catch (error) {
      console.error('Erro ao carregar dados do servidor:', error);
      showError('Erro ao carregar dados do servidor.');
    }
  }
});

const onSubmit = handleSubmit(async (formData: ICreateUpdateServidorDto) => {
  try {
    // Preparar dados para envio
    const payload: ICreateUpdateServidorDto = {
      nome: formData.nome,
      cpf: formData.cpf,
      email: formData.email,
      tipo: formData.tipo,
    };

    // Adicionar senha apenas se fornecida
    if (formData.senha && formData.senha.trim() !== '') {
      payload.senha = formData.senha;
    }

    if (isEdit) {
      payload.idServidor = id;
      await ServidorService.update(id, payload);
      success('Servidor atualizado com sucesso!');
    } else {
      await ServidorService.create(payload);
      success('Servidor cadastrado com sucesso!');
    }

    router.push(paths.servidor.list);
  } catch (error) {
    console.error('Erro ao salvar servidor:', error);
    showError('Erro ao salvar servidor.');
  }
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        :title="isEdit ? 'Editar Servidor' : 'Cadastrar Servidor'"
        :breadcrumbs="SERVIDOR_BREADCRUMBS_NEW_EDIT"
        button-label="Listar Servidores"
        :button-to="paths.servidor.list"
      />

      <UiParentCard>
        <v-form @submit.prevent="onSubmit">
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="nome" :error-messages="nomeErro" label="Nome" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="cpf" :error-messages="cpfErro" label="CPF" outlined />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="email" :error-messages="emailErro" label="Email" outlined type="email" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="senha" :error-messages="senhaErro" label="Senha" outlined type="password" />
            </v-col>
            <v-col cols="12" md="6">
              <v-select 
                v-model="tipo" 
                :items="tipos" 
                :error-messages="tipoErro" 
                label="Tipo" 
                outlined 
                item-title="name"
                item-value="value"
              />
            </v-col>
            <v-col cols="12" class="text-right">
              <v-btn type="submit" color="primary" class="mt-4">
                {{ isEdit ? 'Salvar Alterações' : 'Cadastrar Servidor' }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
