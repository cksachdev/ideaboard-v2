<template>
    <div>
        <v-container fluid v-if="isUserLoggedIn">
          <ListIdeas />
          <IdeaForm v-if="isNewIdea" />
        </v-container>
        <v-container fluid v-if="!isUserLoggedIn">
          <Login />
        </v-container>
    </div>
</template>

<script>

import IdeaForm from './IdeaForm';
import ListIdeas from './ListIdeas';
import Login from './Login';
import { mapState } from 'vuex'
export default {
    name: 'Dashboard',
    components: {
        IdeaForm,
        ListIdeas,
        Login
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