<script setup lang="ts">
import { CircleXIcon, MailIcon } from 'vue-tabler-icons';
import { profileDD } from '@/_mockApis/headerData';
import { Icon } from '@iconify/vue';
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="true" class="profile_popup">
        <template v-slot:activator="{ props }">
            <div class=" text-left px-0 cursor-pointer" variant="text" v-bind="props">
                <div class="d-flex align-center">
                    <v-avatar size="50">
                        <img src="/images/profile/user6.jpg" width="50" alt="Rafael  Felipe" />
                    </v-avatar>
                    <div class="ml-md-4 d-md-block d-none">
                        <h6 class="text-h6 d-flex align-center text-black font-weight-semibold">Rafael  Felipe</h6>
                        <span class="text-subtitle-2 font-weight-medium text-grey100">Admin</span>
                    </div>
                </div>
            </div>
        </template>
        <v-sheet rounded="lg" width="385" elevation="10" class="mt-5">
            <div class="px-8 pt-6">
                <div class="d-flex align-center justify-space-between">
                    <h6 class="text-h5 font-weight-semibold">User Profile</h6>
                    <CircleXIcon size="22" class="text-grey100 cursor-pointer opacity-50" />
                </div>

                <div class="d-flex align-center mt-5 pb-6">
                    <v-avatar size="90">
                        <img src="/images/profile/user6.jpg" width="90" />
                    </v-avatar>
                    <div class="ml-5">
                        <h6 class="text-h5 mb-n1">Rafael  Felipe</h6>
                        <span class="text-subtitle-1 font-weight-regular text-grey100 font-weight-medium">Admin</span>
                        <div class="d-flex align-center mt-1">
                            <MailIcon size="18" stroke-width="1.5" class="text-grey100" />
                            <span class="text-subtitle-1 text-grey100 font-weight-medium ml-2">info@spikeadmin.com</span>
                        </div>
                    </div>
                </div>
                <v-divider></v-divider>
            </div>
            <perfect-scrollbar style="height: calc(100vh - 240px); max-height: 240px">
                <v-list class="py-0 theme-list" lines="two">
                    <v-list-item v-for="item in profileDD" :key="item.title" class="py-4 px-8 custom-text-primary"
                        to="">
                        <template v-slot:prepend>
                            <v-avatar size="40" class="rounded-lg" :class="'bg-light' + item.bgcolor">
                                <!-- <component :is="item.avatar" stroke-width="2" size="25" :class="'text-' + item.bgcolor" /> -->
                                <Icon :icon="'solar:' + item.avatar" width="25" height="25"   :class="'text-' + item.bgcolor"/>
                            </v-avatar>
                        </template>
                        <div>
                            <h6 class="text-h6 font-weight-medium mb-1 custom-title">{{ item.title }}</h6>
                        </div>
                        <p class="text-subtitle-1 font-weight-regular text-grey100">{{ item.subtitle }}</p>
                    </v-list-item>
                </v-list>
            </perfect-scrollbar>
            <div class=" pb-6 px-8 text-center">
                <v-btn color="primary" size="large" rounded="pill" block >Logout</v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>
