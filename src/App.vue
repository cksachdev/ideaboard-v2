<template>
  <v-app>
    <v-content class="fixWidth">
      <v-card
        class="mx-auto"
        max-width="500"
        elevation="0"
      >
        <v-toolbar
          color="indigo"
          dark
        >
          <v-btn icon @click="addNewIdea()" v-if="isUserLoggedIn">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-toolbar-title>Ideaboard</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="logout()" v-if="isUserLoggedIn">
            LOGOUT
          </v-btn>
        </v-toolbar>

        <v-container fluid v-if="isUserLoggedIn">
          <ListIdeas v-if="ideaList" />
          <IdeaForm v-if="isNewIdea" @removeNewIdea="removeNewIdea" />
        </v-container>
        <v-container fluid v-if="!isUserLoggedIn">
          <Login @loggedInSuccess="loggedInSuccess" />
        </v-container>
      </v-card>
      
    </v-content>
  </v-app>
</template>

<script>
import IdeaForm from './components/IdeaForm';
import ListIdeas from './components/ListIdeas';
import Login from './components/Login';

export default {
  name: 'App',

  components: {
    IdeaForm,
    ListIdeas,
    Login,
  },

  data: () => ({
    isUserLoggedIn: false,
    userDetails: {},
    isNewIdea: false,
    ideaList: false
  }),
  created () {
    this.getUserDetails();
  },
  methods: {
    getUserDetails() {
      if(localStorage.getItem('ideaBoardUser')) {
        this.userDetails = localStorage.getItem('ideaBoardUser');
        this.isUserLoggedIn = true;
      }
    },
    addNewIdea() {
      this.isNewIdea = true
    },
    removeNewIdea() {
      this.isNewIdea = false
    },
    loggedInSuccess() {
      this.isUserLoggedIn = true;
    },
    logout() {
      localStorage.removeItem('ideaBoardUser');
      this.isUserLoggedIn = false;
      this.$gAuth.signOut().then(() => {
          alert("Signout successfully");
      })
      .catch(error  => {
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
