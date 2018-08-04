import 'babel-polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify/es5/components/Vuetify'
import VApp from 'vuetify/es5/components/VApp'
import VBtn from 'vuetify/es5/components/VBtn'
import VCard from 'vuetify/es5/components/VCard'
import VDataTable from 'vuetify/es5/components/VDataTable'
import VDialog from 'vuetify/es5/components/VDialog'
import VDivider from 'vuetify/es5/components/VDivider'
import VFooter from 'vuetify/es5/components/VFooter'
import VForm from 'vuetify/es5/components/VForm'
import VGrid from 'vuetify/es5/components/VGrid'
import VProgressLinear from 'vuetify/es5/components/VProgressLinear'
import VSnackbar from 'vuetify/es5/components/VSnackbar'
import VTextField from 'vuetify/es5/components/VTextField'
import VToolbar from 'vuetify/es5/components/VToolbar'

import { Ripple } from 'vuetify/es5/directives'

import VueClipboard from 'vue-clipboard2'

require('vuetify/src/stylus/app.styl')

Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VCard,
    VDataTable,
    VDialog,
    VDivider,
    VFooter,
    VForm,
    VGrid,
    VProgressLinear,
    VSnackbar,
    VTextField,
    VToolbar
  },
  directives: {
    Ripple
  }
})
Vue.use(VueClipboard)

/* eslint-disable no-new */
new Vue({
  el:         '#app',
  components: {App},
  template:   '<App/>'
})
