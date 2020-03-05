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
                this.isSignIn = this.$gAuth.isAuthorized
                const userDetails = GoogleUser.getBasicProfile();
                const user = {
                    name: userDetails.Ad,
                    email: userDetails.zu
                }
                localStorage.setItem('ideaBoardUser', JSON.stringify(user));
                this.$emit('loggedInSuccess')
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
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>