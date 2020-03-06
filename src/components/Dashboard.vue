<template>
    <div>
        <v-container fluid v-if="isUserLoggedIn">
          <IdeaForm v-if="isNewIdea" />
          <ListIdeas />
        </v-container>
        <v-container fluid v-if="!isUserLoggedIn">
          <v-card
                class="mx-auto"
                width="500px"
                elevation="0"
            >
                <v-card-text class="text-center" style="height: 300px;">
                    <h2 style="    line-height: 300px;}">Please signin to use ideaboard</h2>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>

import IdeaForm from './IdeaForm';
import ListIdeas from './ListIdeas';
import { mapState } from 'vuex'
export default {
    name: 'Dashboard',
    components: {
        IdeaForm,
        ListIdeas
    },
    data() {
        return {
        }
    },
    created () {
        this.$store.dispatch('CHECK_IS_LOGGEDIN');
    },
    computed: {
        ...mapState([
            'isUserLoggedIn',
            'isNewIdea',
            'ideaList'
        ]),
    },
    methods: {
        removeNewIdea() {
            this.isNewIdea = false
        },
    },
}
</script>

<style lang="scss" scoped>

</style>