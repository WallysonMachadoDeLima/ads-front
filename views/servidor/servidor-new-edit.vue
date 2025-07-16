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
const sexos = ref<IEnumItem[]>([]);
const situacoes = ref<IEnumItem[]>([]);

const {
  handleSubmit,
  setValues,
  nome, nomeErro,
  cpf, cpfErro,
  email, emailErro,
  senha, senhaErro,
  tipo, tipoErro,
  dataNascimento, dataNascimentoErro,
  sexo, sexoErro,
  situacao, situacaoErro,
} = useServidorForm(isEdit);

onMounted(async () => {
  // Carregar tipos de servidor da API
  try {
    tipos.value = await EnumsService.getServidorTipos();
  } catch (error) {
    console.error('Erro ao carregar dados auxiliares:', error);
  }

  // Sexo e Situação sempre valores padrão
  sexos.value = [
    { value: 0, name: 'Masculino', description: 'Masculino' },
    { value: 1, name: 'Feminino', description: 'Feminino' },
    { value: 2, name: 'Outros', description: 'Outros' }
  ];
  
  situacoes.value = [
    { value: 1, name: 'Ativo', description: 'Servidor ativo' },
    { value: 2, name: 'Inativo', description: 'Servidor inativo' },
    { value: 3, name: 'Suspenso', description: 'Servidor suspenso' },
  ];

  // Se for edição, carregar dados do servidor
  if (isEdit && id) {
    try {
      const servidor: IServidorDto = await ServidorService.findOneById(id);
      
      console.log('Dados do servidor para edição:', servidor);
      console.log('Data de nascimento original:', servidor.dataNascimento);
      
      // Mapear strings de volta para números para o formulário
      const sexoReverseMap: { [key: string]: number } = {
        'Masculino': 0,
        'Feminino': 1,
        'Outro': 2
      };

      const situacaoReverseMap: { [key: string]: number } = {
        'Ativo': 1,
        'Inativo': 2,
        'Suspenso': 3
      };

      // Converter data ISO para formato YYYY-MM-DD
      const formatarDataParaInput = (dataISO: string): string => {
        if (!dataISO) return '';
        try {
          // Extrair apenas a parte da data (YYYY-MM-DD) do ISO string
          if (dataISO.includes('T')) {
            return dataISO.split('T')[0];
          }
          
          // Se já estiver no formato YYYY-MM-DD, retornar como está
          if (dataISO.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return dataISO;
          }
          
          // Fallback: tentar converter
          const data = new Date(dataISO);
          if (isNaN(data.getTime())) return '';
          
          const year = data.getFullYear();
          const month = String(data.getMonth() + 1).padStart(2, '0');
          const day = String(data.getDate()).padStart(2, '0');
          
          return `${year}-${month}-${day}`;
        } catch {
          return '';
        }
      };

      setValues({
        nome: servidor.nome,
        cpf: servidor.cpf,
        email: servidor.email,
        senha: '', // Não carregar senha por segurança
        tipo: servidor.tipo,
        dataNascimento: formatarDataParaInput(servidor.dataNascimento),
        sexo: sexoReverseMap[servidor.sexo] || 0,
        situacao: situacaoReverseMap[servidor.situacao] || 1,
      });
      
      console.log('Valores definidos no formulário:');
      console.log('Data de nascimento original:', servidor.dataNascimento);
      console.log('Data de nascimento formatada:', formatarDataParaInput(servidor.dataNascimento));
      console.log('Sexo mapeado:', sexoReverseMap[servidor.sexo] || 0);
    } catch (error) {
      console.error('Erro ao carregar dados do servidor:', error);
      showError('Erro ao carregar dados do servidor.');
    }
  }
});

const onSubmit = handleSubmit(async (formData: ICreateUpdateServidorDto) => {
  try {
    // Mapear valores para strings conforme API
    const sexoMap: { [key: number]: string } = {
      0: 'Masculino',
      1: 'Feminino', 
      2: 'Outro'
    };

    const situacaoMap: { [key: number]: string } = {
      1: 'Ativo',
      2: 'Inativo',
      3: 'Suspenso'
    };

    // Preparar dados para envio com types corretos para API
    const payload: any = {
      nome: formData.nome,
      cpf: formData.cpf,
      email: formData.email,
      tipo: formData.tipo,
      dataNascimento: formData.dataNascimento,
      sexo: sexoMap[formData.sexo] || 'Outro',
      situacao: situacaoMap[formData.situacao] || 'Ativo',
    };

    // Adicionar senha apenas se fornecida
    if (formData.senha && formData.senha.trim() !== '') {
      payload.senha = formData.senha;
    }

    if (isEdit) {
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
              <v-text-field 
                v-model="dataNascimento" 
                :error-messages="dataNascimentoErro" 
                label="Data de Nascimento" 
                outlined 
                type="date" 
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select 
                v-model="sexo" 
                :items="sexos" 
                :error-messages="sexoErro" 
                label="Sexo" 
                outlined 
                item-title="name"
                item-value="value"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field 
                v-model="senha" 
                :error-messages="senhaErro" 
                :label="isEdit ? 'Nova Senha (opcional)' : 'Senha'" 
                :placeholder="isEdit ? 'Deixe em branco para manter a senha atual' : ''"
                outlined 
                type="password" 
              />
            </v-col>
            <v-col cols="12" md="3">
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
            <v-col cols="12" md="3">
              <v-select 
                v-model="situacao" 
                :items="situacoes" 
                :error-messages="situacaoErro" 
                label="Situação" 
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
