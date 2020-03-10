<template>
    <v-row class="text-center" dense>
      <v-col cols="12">
        <v-expansion-panels v-if="GET_IDEA_LIST.length > 0" :accordion="true">
          <draggable draggable=".item" 
                    v-model='myList'
                    v-bind="dragOptions" 
                    @start="drag = true" 
                    @end="drag = false"
                    :move="handleDrop"
                    >
            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
              
              <v-expansion-panel v-for="(item, index) in GET_IDEA_LIST" :key="item.id" class="item">
                
                <v-expansion-panel-header disable-icon-rotate>
                  <v-icon class="dragIcon">mdi-drag</v-icon>
                  {{ item.title }}
                  <template v-slot:actions>
                    <v-btn icon @click="openConfirmationBox(item.id)"><v-icon color="red">mdi-delete</v-icon></v-btn>
                    <v-icon color="primary">$expand</v-icon>
                  </template>
                  
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-form v-model="formValid">
                      <v-jsonschema-form 
                      v-if="schema" 
                      :schema="schema" 
                      :model="GET_IDEA_LIST[index]"
                      :options="options" 
                      @error="showError" />
                    </v-form>
                    <v-card-actions class="pa-0">
                      <v-btn text color="success" class="mx-auto" :disabled="!formValid" @click="saveData(item.id, index)">Save</v-btn>
                    </v-card-actions>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </transition-group>
          </draggable>
        </v-expansion-panels>
        <div v-else>
          <v-card
                class="mx-auto"
                width="500px"
                elevation="0"
            >
                <v-card-text class="text-center" style="height: 300px;">
                    <h2>Click on + button to add idea</h2>
                </v-card-text>
            </v-card>
        </div>

        <v-dialog v-model="dialog" max-width="290" >
          <v-card>
            <v-card-title class="headline">
              Do you want to delete idea?
            </v-card-title>
            
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">Disagree </v-btn>
              <v-btn color="green darken-1" text @click="removeIdea(ideaTobeDelete)" >Agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-col>
    </v-row>
</template>

<script>
  import VJsonschemaForm from '@koumoul/vuetify-jsonschema-form/lib/index.vue'
  import FormSchema from '../FormSchema'
import { mapState, mapGetters } from 'vuex' 
import draggable from 'vuedraggable'
  export default {
    name: 'ListIdeas',
    components: {
      VJsonschemaForm,
      draggable
    },
    data: () => ({
      schema: FormSchema,
      formValid: false,
      options: {
        debug: true,
        disableAll: false,
        autoFoldObjects: false
      },
      ideaTobeDelete: '',
      drag: false,
      dialog: false
    }),
    computed: {
      ...mapState([
        'userEmail'
      ]),
      ...mapGetters([
        'GET_IDEA_LIST'
      ]),
      dragOptions() {
        return {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        };
      },
      myList: {
          get() {
              return this.GET_IDEA_LIST
          },
          set(value) {
              this.$store.commit('SET_IDEA_TO_LIST', value)
          }
      }
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
          this.dialog = false
        }
      },
      handleDrop(evt) {
        this.drag = false;
      },
      openConfirmationBox(ideaid) {
        this.ideaTobeDelete = ideaid
        this.dialog = true;
      }
    }
  }
</script>

<style lang="css">
.v-expansion-panel-header {
  padding-left: 30px !important;
}
.dragIcon {
  position: absolute !important;
  left: 0;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
