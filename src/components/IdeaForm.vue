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

              
              
              <v-card-actions right>
                <v-btn color="primary" :disabled="!formValid" @click="saveData">Save</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="red" icon @click="removeNewIdea()">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
          </v-form>
        </v-card>
        
      </v-col>
    </v-row>
</template>

<script>
  import VJsonschemaForm from '@koumoul/vuetify-jsonschema-form/lib/index.vue'
  import FormSchema from '../FormSchema'
  export default {
    name: 'IdeaForm',
    components: {VJsonschemaForm},
    data: () => ({
      schema: FormSchema,
      dataObject: {},
      formValid: false,
      options: {
        debug: false,
        disableAll: false,
        autoFoldObjects: true
      }
    }),
    methods: {
      showError(err) {
        window.alert(err)
      },
      saveData() {
        let host = "https://script.google.com/macros/s/AKfycbwHJXdd3uHsbnKtd_1MTYALHmWVF0aSOZ64xqB1sZDCrlLIdfw/exec";
        let keys = this._.keys(this.schema.properties);
        let urlParams = "";
        for (let key of keys) {
            urlParams += `&${key}=${this.dataObject[key]}`;
        }
        this.axios.get(`${host}?action=insert${urlParams}`).then((response) => {
          console.log(response.data)
        })
      },
      removeNewIdea(){
        this.$emit('removeNewIdea');
      }
    }
  }
</script>
