<template>
    <v-container>
        <!-- Table Header Section (Content) -->
        <v-card class="mt-4" elevation="0">
            <v-card-title class="d-flex justify-space-between align-center">
                <span class="text-h5">Item List</span>
                <v-btn color="primary" @click="router.push({ name: 'CreateItemPage' })">
                    Add Item
                </v-btn>
            </v-card-title>

            <v-card-text>
                <!-- Data Table -->
                <v-data-table :headers="headers" :items="itemStore.items">
                    <!-- Table Rows and Actions -->
                    <template v-slot:item.actions="{ item }">
                        <v-row>
                            <v-col cols="auto">
                                <v-btn density="comfortable" color="primary"
                                    @click="router.push({ name: 'EditItemPage', params: { id: item.id } })">
                                    <v-icon icon="mdi-pencil"></v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="auto">
                                <v-btn density="comfortable" color="danger" @click="deleteItem(item.id)">
                                    <v-icon icon="mdi-delete"></v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useItemStore } from '../store/itemStore';
import { useRouter } from 'vue-router';

const itemStore = useItemStore();
const router = useRouter();

// Table headers
const headers = ref([
    { title: 'ID', key: 'id' },
    { title: 'Code', key: 'code' },
    { title: 'Name', key: 'name' },
    { title: 'Description', key: 'description' },
    { title: 'Price', key: 'price' },
    { title: 'Stock', key: 'stock' },
    { title: 'Created At', key: 'created_at' },
    { title: 'Updated At', key: 'updated_at' },
    { title: 'Actions', key: 'actions', sortable: false }
]);

// Fetch items when page is mounted
onMounted(() => {
    itemStore.fetchItems();
});

// Function to delete an item
const deleteItem = async (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
        await itemStore.deleteItem(id);
    }
};
</script>