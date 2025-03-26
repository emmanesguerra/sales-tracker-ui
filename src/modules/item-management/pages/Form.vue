<template>
    <v-container>
        <v-row>
            <v-col :cols="12" :md="6">
                <v-card class="mt-4" elevation="0">
                    <v-card-title>
                        <span class="text-h5">{{ isEditMode ? 'Edit Item' : 'Create Item' }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <v-row>
                                <v-col :cols="12" :md="6">
                                    <v-text-field v-model="item.code" label="Item Code" :rules="[rules.required]" required @input="handleInput"></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col :cols="12">
                                    <v-text-field v-model="item.name" label="Item Name" :rules="[rules.required]" required></v-text-field>
                                </v-col>

                                <v-col :cols="12">
                                    <v-textarea v-model="item.description" label="Description"></v-textarea>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col :cols="12" :md="6">
                                    <v-text-field v-model="item.price" label="Price" type="number" :rules="[rules.required, rules.numeric]" required></v-text-field>
                                </v-col>

                                <v-col :cols="12" :md="6">
                                    <v-text-field v-model="item.stock" label="Stock" type="number" :rules="[rules.required, rules.integer]" required></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col :cols="12">
                                    <v-btn class="mt-4" color="primary" @click="saveItem">
                                        {{ isEditMode ? 'Update Item' : 'Save Item' }}
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

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useItemStore } from '../store/itemStore';
import { ItemModel } from '../models/ItemModel';

const router = useRouter();
const route = useRoute();
const itemStore = useItemStore();

const valid = ref(false);
const item = ref(new ItemModel());
const isEditMode = ref(false);

const rules = {
    required: value => !!value || 'This field is required.',
    numeric: value => !isNaN(value) || 'Must be a number.',
    integer: value => Number.isInteger(Number(value)) || 'Must be an integer.',
};

onMounted(async () => {
    if (route.params.id) {
        isEditMode.value = true;
        await loadItem(route.params.id);  // Load item for editing
    } else {
        isEditMode.value = false;
    }
});

const loadItem = async (id) => {
    try {
        const fetchedItem = await itemStore.getItemById(Number(id));  // Fetch item from store or API
        item.value = new ItemModel(fetchedItem.id, fetchedItem.code, fetchedItem.name, fetchedItem.description, fetchedItem.price, fetchedItem.stock);
    } catch (error) {
        console.error('Error loading item:', error);
    }
};

const saveItem = async () => {
    try {
        if (isEditMode.value) {
            // Update item
            await itemStore.updateItem(item.value);
        } else {
            // Create new item
            await itemStore.createItem(item.value);
        }

        // Redirect to the item list after saving
        router.push({ name: 'ItemPage' });
    } catch (error) {
        console.error('Error saving item:', error);
    }
};

const handleInput = (event) => {
  // Get the input value from the event and convert to uppercase
  const upperCaseValue = event.target.value.toUpperCase();

  // Set the value to the model
  item.value.code = upperCaseValue;
};
</script>
