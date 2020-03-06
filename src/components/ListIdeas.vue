<template>
    <v-row class="text-center" dense>
      <v-col cols="12">
        <v-card class="pa-5 mb-3" v-for="(idea, index) in ideaList" :key="idea.id">
          <v-form v-model="formValid">
            <v-jsonschema-form 
              v-if="schema" 
              :schema="schema" 
              :model="dataObjectModal[index]"
              :options="options" 
              @error="showError" />
              <v-card-actions right>
                <v-btn color="primary" :disabled="!formValid">Save</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="red" icon @click="removeIdea()">
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
import { mapState } from 'vuex'
  export default {
    name: 'ListIdeas',
    components: {VJsonschemaForm},
    data: () => ({
      schema: FormSchema,
      formValid: false,
      options: {
        debug: true,
        disableAll: false,
        autoFoldObjects: true
      }
    }),
    computed: {
      ...mapState([
        'ideaList',
        'dataObjectModal'
      ]),
    },
    mounted () {
      this.getIdeaLists();
    },
    methods: {
      showError(err) {
        window.alert(err)
      },
      async getIdeaLists() {
        await this.$store.dispatch('GET_IDEAS_LIST');
      }
    }
  }
</script>
