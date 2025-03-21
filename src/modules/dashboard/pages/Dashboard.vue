<template>
    <v-container>
        <!-- App bar -->
        <v-app-bar color="primary" elevation="2">
            <v-app-bar-title>Dashboard</v-app-bar-title>
        </v-app-bar>

        <!-- Navigation Drawer -->
        <v-navigation-drawer elevation="1" expand-on-hover permanent rail>
            <v-list class="large-font" nav>
                <v-list-item prepend-icon="mdi-tshirt-crew" title="Item Management" value="items"></v-list-item>
                <v-list-item prepend-icon="mdi-chart-box" title="Sales Report" value="sales"></v-list-item>
                <v-list-item prepend-icon="mdi-qrcode" title="QR Generator" value="qrcode"></v-list-item>
            </v-list>

            <template v-slot:append>
                <v-list class="large-font" nav>
                    <v-divider></v-divider>
                    <v-list-item prepend-icon="mdi-cog" title="Settings" value="settings"></v-list-item>
                    <v-list-item prepend-icon="mdi-logout" title="Logout" @click="logout"></v-list-item>
                </v-list>
            </template>
        </v-navigation-drawer>

        <!-- Main content -->
        <v-main>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title>Welcome, User!</v-card-title>
                            <v-card-text>This is your dashboard.</v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/store/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
    authStore.clearToken();
    router.push({ name: 'Login' });
};
</script>

<style scoped>
.large-font :deep(.v-list-item-title) {
  font-size: 1rem  !important;
}
</style>