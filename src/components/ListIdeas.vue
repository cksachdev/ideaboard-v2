<template>
    <v-row class="text-center" dense>
      <v-col cols="12">
        <v-expansion-panels v-if="GET_IDEA_LIST.length > 0" :accordion="true">
          <v-expansion-panel v-for="(item, index) in GET_IDEA_LIST" :key="item.id">
            <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-form v-model="formValid">
                  <v-jsonschema-form 
                  v-if="schema" 
                  :schema="schema" 
                  :model="GET_IDEA_LIST[index]"
                  :options="options" 
                  @error="showError" />
                </v-form>
                <v-card-actions right>
                  <v-btn color="primary" :disabled="!formValid" @click="saveData(item.id, index)">Save</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="red" icon @click="removeIdea(item.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card-actions>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
</template>

<script>
  import VJsonschemaForm from '@koumoul/vuetify-jsonschema-form/lib/index.vue'
  import FormSchema from '../FormSchema'
import { mapState, mapGetters } from 'vuex'
  export default {
    name: 'ListIdeas',
    components: {
      VJsonschemaForm
    },
    data: () => ({
      schema: FormSchema,
      formValid: false,
      options: {
        debug: true,
        disableAll: false,
        autoFoldObjects: false
      }
    }),
    computed: {
      ...mapState([
        'userEmail'
      ]),
      ...mapGetters([
        'GET_IDEA_LIST'
      ])
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
      saveData(ideaId, modelIndex) {
        let ideaData = this._.cloneDeep(this.GET_IDEA_LIST[modelIndex]);
        ideaData.email = this.userEmail
        ideaData.tags = this._.join(ideaData.tags, ', ')

        this.removeIdea(ideaId, false)
        this.$store.dispatch('CREATE_IDEA', ideaData);
      },
      removeIdea(ideaId, showAlert=true) {
        if(ideaId) {
          this.$store.dispatch('REMOVE_IDEA', {'ideaid': ideaId, 'showAlert': showAlert});
        }
      }
    }
  }
</script>
