<template>
    <div>
        <v-btn class="g-signin-button" @click="initAuth()">Signin with Google</v-btn>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            isSignIn: false
        }
    },
    methods: {
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
    }
}
</script>

<style lang="css">
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7 !important;
  color: #fff !important;
  box-shadow: 0 3px 0 #0f69ff !important;
}
</style>