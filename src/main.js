// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import VueClipboard from 'vue-clipboard2'

Vue.use(Vuetify)
Vue.use(VueClipboard)

/* eslint-disable no-new */
new Vue({
  el:         '#app',
  components: {App},
  template:   '<App/>'
})
