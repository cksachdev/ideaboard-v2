<template>
  <v-app>
    <v-content class="fixWidth">
      <v-card
        class="mx-auto"
        max-width="500"
        elevation="0"
      >
        <v-toolbar color="indigo" dark>
          <v-btn :disabled="isNewIdea" icon @click="addNewIdea()" v-if="isUserLoggedIn">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-toolbar-title>Ideaboard</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="logout()" v-if="isUserLoggedIn">
            LOGOUT
          </v-btn>
          <v-btn @click="initAuth()" v-if="!isUserLoggedIn">
            Signin
          </v-btn>
        </v-toolbar>

        <router-view></router-view>

      </v-card>
      
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data: () => ({
  }),
  computed: {
    ...mapState([
        'isUserLoggedIn',
        'isNewIdea'
    ]),
  },
  methods: {
    addNewIdea() {
      this.$store.commit('ADD_NEW_IDEA');
    },
    logout() {
      this.$store.dispatch('LOGOUT');
      this.$gAuth.signOut().then(() => {
          alert("Signout successfully");
      })
      .catch(error  => {
          console.log(error);
      })
    },
    initAuth() {
        this.$gAuth.signIn()
        .then(GoogleUser => {
            const userDetails = GoogleUser.getBasicProfile();
            this.$store.commit('SET_USER_DETAILS', userDetails)
            this.$store.commit('SET_USER_EMAIL', userDetails.zu)
            this.$store.commit('SET_USER_LOGGEDIN', this.$gAuth.isAuthorized)
            localStorage.setItem('ideaBoardUser', JSON.stringify(userDetails));
        })
        .catch(error  => {
        //on fail do something
            console.log(error);
        })
    }
  },
};
</script>

<style>
.fixWidth {
  width: 450px !important;
}
.fixWidth .v-content__wrap {
  max-height: 600px;
  overflow: auto;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  margin: 10px;
}
</style>
