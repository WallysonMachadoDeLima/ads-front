<script setup lang="ts">
import { ChevronRightIcon } from 'vue-tabler-icons';
const props = defineProps({
    title: String,
    breadcrumbs: Array as any,
    icon: String
});
</script>

<template>
    <div class="mt-3 mb-6">
        <div class="d-flex justify-space-between">
            <div class="d-flex py-0 align-center">
                <div>
                    <h3 class="text-h3 mb-2">{{ title }}</h3>
                    <v-breadcrumbs :items="breadcrumbs" class="text-h6 font-weight-regular pa-0 ml-n1">
                        <template v-slot:divider v-if="breadcrumbs">
                            <v-icon size="4" class="ml-1 mr-1">mdi-circle</v-icon>
                        </template>
                        <template v-slot:title="{ item }">
                            <h6 class="text-medium-emphasis text-subtitle-1">{{ item.title }}</h6>
                        </template>
                    </v-breadcrumbs>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.page-breadcrumb {
    .v-toolbar {
        background: transparent;
    }
}
</style>
