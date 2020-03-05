import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
 
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(VueLodash, { name: '' , lodash: lodash })

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '829452502872-9ebh144gp6jjg1tv8q1b9dicpkdr4lc1.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
