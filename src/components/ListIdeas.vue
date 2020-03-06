<template>
    <v-row class="text-center" dense>
      <v-col cols="12">
        <v-expansion-panels >
          <v-expansion-panel v-for="(idea, index) in ideaList" :key="idea.id">
            <v-expansion-panel-header>
              {{ idea.title }}
              <template v-slot:actions>
                <v-icon color="primary">$expand</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
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
                    <v-btn color="red" icon @click="removeIdea(idea.id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-card-actions>
              </v-form>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
      getIdeaLists() {
        this.$store.dispatch('GET_IDEAS_LIST');
      },
      removeIdea(ideaId) {
        this.$store.dispatch('REMOVE_IDEA', ideaId);
      }
    }
  }
</script>
