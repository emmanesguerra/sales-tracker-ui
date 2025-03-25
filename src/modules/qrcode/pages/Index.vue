<template>
    <v-container>
        <v-row>
            <v-col :cols="12" :md="6">
                <v-card class="mt-4" elevation="0">
                    <v-card-title>QR Selection Form</v-card-title>
                    <v-card-text>
                        <v-form>
                            <!-- Radio Buttons -->
                            <v-radio-group v-model="selectAll">
                                <v-radio label="Select All" :value="true"></v-radio>
                                <v-radio label="Custom Selection" :value="false"></v-radio>
                            </v-radio-group>

                            <!-- Multi-Select Dropdown -->
                            <v-autocomplete 
                                v-model="form.selectedItems" 
                                label="Select Items" 
                                :items="allItems" 
                                item-title="name" 
                                item-value="id" 
                                multiple 
                                chips 
                                clearable
                                :disabled="selectAll"
                            ></v-autocomplete>

                            <v-row>
                                <v-col :cols="12">
                                    <v-btn class="mt-4" color="primary" @click="submitForm">
                                        Submit
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia'; // Add this import
import { useItemStore } from '@/modules/item-management/store/itemStore';
import { qrCodeService } from '@/modules/qrcode/services/qrCodeService'; // Import the service

const itemStore = useItemStore();
const { items } = storeToRefs(itemStore);
const selectAll = ref(false);
const form = ref({
    selectedItems: [] as number[],
});

// Convert items from store to an array of objects with { id, name }
const allItems = computed(() => items.value.map(item => ({ id: item.id, name: item.name })));

// Fetch items on component mount if needed
onMounted(async () => {
    if (items.value.length === 0) {
        await itemStore.fetchItems();
    }
});

// Watch selectAll to update selectedItems
watch(selectAll, (newValue) => {
    form.value.selectedItems = newValue ? allItems.value.map(item => item.id) : [];
});

// Handle form submission and file download
const submitForm = async () => {
    try {
        const fileBlob = await qrCodeService.submitForm(form.value.selectedItems);
        
        // Create a URL for the file and trigger the download
        const fileURL = window.URL.createObjectURL(fileBlob);
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = 'generated-file.csv'; // Customize the filename
        a.click();
    } catch (error) {
        console.error('Error during form submission or file download:', error);
    }
};
</script>
