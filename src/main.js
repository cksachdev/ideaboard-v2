import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import router from './router'
import store from './store'
 
Vue.use(VueLodash, { name: '' , lodash: lodash })

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '829452502872-9ebh144gp6jjg1tv8q1b9dicpkdr4lc1.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
