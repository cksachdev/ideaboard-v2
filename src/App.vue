<template>
  <v-app> 
    <div style="width:500px" class="appDrawer" :class="{ show: isDrawerShow }">
      <v-content class="fixWidth">
        <div style="height: 100%;">
        <v-card
          class="mx-auto"
          max-width="500"
          elevation="0"
        >
          <v-toolbar color="indigo" dark>
            <v-btn :disabled="isNewIdea" icon @click="addNewIdea()" v-if="isUserLoggedIn">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-toolbar-title class="pl-0">Ideaboard</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="logout()" v-if="isUserLoggedIn">
              LOGOUT
            </v-btn>
            <v-btn @click="initAuth()" v-if="!isUserLoggedIn">
              Signin
            </v-btn>
          </v-toolbar>
          <v-alert
            dense
            text
            type="success"
            class="toasterCls"
            v-if="toasterMsg !== ''"
          >
            {{ toasterMsg }}
          </v-alert>

          <router-view></router-view>        
        </v-card>
        </div>
        <v-overlay v-if="isLoading" class="vLoader" :opacity="0.30" color="rgb(204, 204, 204)">
          <v-row class="fill-height" align-content="center" justify="center" >
            <v-progress-circular
                  :size="70"
                  :width="7"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
          </v-row>
        </v-overlay>
      </v-content>
      <v-btn color="success" class="btnIdeaBrd" @mouseenter="showDrawer">ideaboard</v-btn>
    </div>
    <div @mouseenter="hideDrawer" style="height:100%"></div>
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
        'isNewIdea',
        'isLoading',
        'toasterMsg',
        'isDrawerShow'
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
            this.$store.dispatch('CHECK_IS_LOGGEDIN')
            this.$store.dispatch('SAVE_USER_DETAILS')
            // localStorage.setItem('ideaBoardUser', JSON.stringify(userDetails));
        })
        .catch(error  => {
        //on fail do something
            console.log(error);
        })
    },
    showDrawer() {
      this.$store.commit('SET_DRAWER_ACTIVE')
    },
    hideDrawer() {
      this.$store.commit('SET_DRAWER_INACTIVE')
    }
  },
  watch: {
    toasterMsg(newValue) {
      const that = this
      if(newValue !== '') { 
        setTimeout(() => {
          that.$store.commit('RESET_TOASTER')
        }, 5000);
      }
    }
  },
};
</script>

<style>
.fixWidth {
  width: 450px !important;
  height: 100%;
}
.fixWidth .v-content__wrap {
  overflow-y: scroll;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.vLoader {
    width: 450px;
    left: 0px !important;
    top: 0px !important;
}
.btnIdeaBrd {
    position: absolute !important;
    right: -25px;
    top: 50%;
    transform: rotate(-90deg);
}
.appDrawer {
    height: 100%;
    position: fixed;
    left: -450px;
    transition: all 1000ms;
    cursor: pointer;
}
.appDrawer.show {
    left: 0px;
    transition: all 1000ms;
}
.appDrawer.show .btnIdeaBrd {
  display: none;
}
</style>
