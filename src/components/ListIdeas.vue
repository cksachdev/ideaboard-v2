<template>
    <v-row class="text-center" dense>
      <v-col cols="12">
        <v-card class="pa-5">
          <v-form v-model="formValid">
            <v-jsonschema-form 
              v-if="schema" 
              :schema="schema" 
              :model="dataObject" 
              :options="options" 
              @error="showError" />
              <v-btn color="primary" :disabled="!formValid" @click="saveData">Save</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
  import VJsonschemaForm from '@koumoul/vuetify-jsonschema-form/lib/index.vue'
  import FormSchema from '../FormSchema'
  export default {
    name: 'ListIdeas',
    components: {VJsonschemaForm},
    data: () => ({
      schema: FormSchema,
      dataObject: {},
      formValid: false,
      options: {
        debug: true,
        disableAll: false,
        autoFoldObjects: true
      }
    }),
    methods: {
      showError(err) {
        window.alert(err)
      },
      saveData() {
        console.log(this.dataObject)
      }
    }
  }
</script>
