<script setup lang="ts">
import TableActions from '@/components/shared/TableActions.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { paths } from '@/routes/paths';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PageHeader from '~/components/shared/PageHeader.vue';
import { ServidorService } from '~/services/servidor-service';
import { EnumsService } from '~/services/enums-service';
import { useNotification } from '~/composables/useNotification';
import { useConfirmation } from '~/composables/useConfirmation';
import type { IServidorDto } from '~/interfaces';
import type { IEnumItem } from '~/services/enums-service';
import { SERVIDOR_BREADCRUMBS_LIST, SERVIDOR_TABLE_HEADERS } from '../enums/servidor-enums';

const router = useRouter();
const { success, error: showError } = useNotification();
const { confirmDelete } = useConfirmation();
const servidores = ref<IServidorDto[]>([]);
const loading = ref(true);
const tipos = ref<IEnumItem[]>([]);

const breadcrumbs = SERVIDOR_BREADCRUMBS_LIST;
const headers = SERVIDOR_TABLE_HEADERS;

const getTipoNome = (tipoValue: number): string => {
  const tipo = tipos.value.find(t => t.value === tipoValue);
  return tipo ? tipo.name : 'Desconhecido';
};

const carregarServidores = async () => {
  try {
    loading.value = true;
    // Carregar servidores e tipos em paralelo
    const [servidoresData, tiposData] = await Promise.all([
      ServidorService.findAll(),
      EnumsService.getServidorTipos()
    ]);
    
    console.log('Dados dos servidores carregados:', servidoresData);
    
    // Garantir que os dados tenham a propriedade idServidor
    servidores.value = servidoresData.map((servidor: any) => ({
      ...servidor,
      idServidor: servidor.idServidor || servidor.id
    }));
    
    tipos.value = tiposData;
  } catch (error) {
    console.error('Erro ao carregar servidores:', error);
  } finally {
    loading.value = false;
  }
};

const handleView = (id: number | string) => {
  if (!id) {
    console.error('ID não fornecido para visualização');
    return;
  }
  router.push(paths.servidor.view(id.toString()));
};

const handleEdit = (id: number | string) => {
  if (!id) {
    console.error('ID não fornecido para edição');
    return;
  }
  router.push(paths.servidor.edit(id.toString()));
};

const handleDelete = async (id: string | number) => {
  const idNum = Number(id);
  
  const confirmed = await confirmDelete('este servidor');
  if (!confirmed) return;

  try {
    await ServidorService.delete(idNum);
    success('Servidor excluído com sucesso!');
    carregarServidores();
  } catch (error) {
    showError('Erro ao excluir servidor.');
    console.error(error);
  }
};


onMounted(() => {
  carregarServidores();
});


</script>

<template>
  <v-row>
    <v-col cols="12">
      <PageHeader
        title="Listar Servidores"
        :breadcrumbs="breadcrumbs"
        button-label="Novo Servidor"
        :button-to="paths.servidor.new"
      />

      <UiParentCard>
        <v-data-table
          :headers="headers"
          :items="servidores"
          :loading="loading"
          class="elevation-1"
          item-value="idServidor"
        >
          <template #item.tipo="{ item }">
            {{ getTipoNome(item.tipo) }}
          </template>
          
          <template #item.actions="{ item }">
            <TableActions
              :id="item.idServidor"
              :onView="handleView"
              :onEdit="handleEdit"
              :onDelete="handleDelete"
            />
          </template>
        </v-data-table>

      </UiParentCard>
    </v-col>
  </v-row>
</template>
