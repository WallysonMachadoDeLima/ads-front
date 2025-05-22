<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

const props = defineProps<{
  title: string;
  breadcrumbs: { title: string; disabled: boolean; href?: string }[];
  buttonLabel?: string;
  buttonTo?: string;
}>();

const router = useRouter();
</script>

<template>
  <v-card class="mb-4">
    <v-card-item class="py-2 px-4">
      <v-row dense>
        <v-col cols="12" md="6">
          <BaseBreadcrumb :title="title" :breadcrumbs="breadcrumbs" />
        </v-col>

        <v-col
          v-if="buttonLabel && buttonTo"
          cols="12"
          md="6"
          class="d-flex align-center justify-end"
        >
          <v-btn color="primary" @click="router.push(buttonTo)">
            {{ buttonLabel }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>
