<template>
    <v-container>
        <!-- Table Header Section (Content) -->
        <v-card class="mt-4" elevation="0">
            <v-card-title class="d-flex justify-space-between align-center">
                <span class="text-h5">Sales Report</span>
                <v-btn color="primary" @click="router.push({ name: 'UploadPage' })">
                    Upload Sales
                </v-btn>
            </v-card-title>

            <v-card-text>
                <!-- Data Table -->
                <v-data-table :headers="headers" :items="items">
                    <!-- Table Rows and Actions -->
                    <template v-slot:item.price="{ item }">
                        <span class="text-right">{{ parseFloat(item.price).toFixed(2) }}</span>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
// Table headers
const headers = ref([
    { title: 'ID', key: 'id' },
    { title: 'Code', key: 'code' },
    { title: 'Name', key: 'name' },
    { title: 'Price', key: 'price' },
    { title: 'Stock', key: 'stock' },
    { title: 'Actions', key: 'actions', sortable: false }
]);

const items = ref([

]);

</script>