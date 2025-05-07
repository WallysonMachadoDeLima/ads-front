<script setup lang="ts">
import { RouterLink } from 'vue-router';
import logolight from '/images/logos/logo-ifro.png';

</script>
<template>
    <div class="logo">
        <NuxtLink to="/">
            <img class="logo-img" width="150" :src="logolight" alt="home" />
        </NuxtLink>
    </div>
</template>

<style scoped>
.logo-img {
    margin-left: 15%; /* Ajuste o valor conforme necessário */
}
</style>