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

              <v-card-actions>
                <v-btn text color="primary" :disabled="!formValid" @click="saveData">Save</v-btn>
                <v-btn text color="red" @click="removeNewIdea()">Delete</v-btn>
              </v-card-actions>
          </v-form>
        </v-card>
        
      </v-col>
    </v-row>
</template>

<script>
  import VJsonschemaForm from '@koumoul/vuetify-jsonschema-form/lib/index.vue'
  import FormSchema from '../FormSchema'
  import { mapState } from 'vuex'
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
    computed: {
      ...mapState([
        'userEmail',
      ])
    },
    methods: {
      showError(err) {
        window.alert(err)
      },
      saveData() {
        let ideaData = this._.cloneDeep(this.dataObject);
        ideaData.email = this.userEmail
        ideaData.tags = this._.join(ideaData.tags, ', ')
        this.$store.dispatch('CREATE_IDEA', ideaData);
      },
      removeNewIdea(){
        this.$store.commit('REMOVE_NEW_IDEA')
      }
    }
  }
</script>
