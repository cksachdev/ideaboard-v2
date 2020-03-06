<template>
    <div>
        <v-container fluid v-if="isUserLoggedIn">
          <IdeaForm v-if="isNewIdea" />
          <ListIdeas />
        </v-container>
        <v-container fluid v-if="!isUserLoggedIn">
          <v-card
                class="mx-auto"
                color="white"
                width="200px"
            >
                <v-card-text>
                Centered
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