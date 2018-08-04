<template>
  <div class="form">
    <v-dialog v-model="urlSend" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-form v-model="valid" ref="form" @submit.prevent="submitUrl" class="pb-3">
      <v-text-field v-model="url" autofocus @blur="resetFrom" label="Type or paste your URL here and hit Enter!" :rules="urlRules" @click:append-outer="submitUrl" append-outer-icon="mdi-send"></v-text-field>
    </v-form>

    <v-dialog v-model="urlError" width="300">
      <v-card color="error" dark>
        <v-card-text class="text-xs-center">
          <strong>Whoops!</strong> {{ errorText }}<br>Click anywhere to close...
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" width="500">
      <v-card color="success" dark>
        <v-card-title class="headline" primary-title>
          URL has been successfully shortned!
        </v-card-title>

        <v-card-text class="text-xs-center">
          <p>Your url <i>(click to copy)</i></p>
          <code @click="copyUrl" class="display-1" v-ripple>{{ shortUrl }}</code>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="white" flat @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="urlCopied" bottom color="success" :timeout="3000">
      Copied!
    </v-snackbar>
  </div>
</template>

<script>
  import axios from 'axios'
  import { EventBus } from '../event-bus'

  const isValidUrl = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i

  export default {
    name: 'GenerateForm',

    data: () => ({
      valid:     true,
      url:       '',
      urlRules:  [
        v => !!v || 'Gimme more!',
        v => isValidUrl.test(v) || 'URL should be valid!',
      ],
      urlSend:   false,
      urlError:  false,
      errorText: 'Something went wrong!',
      dialog:    false,
      shortUrl:  '',
      urlCopied: false
    }),

    methods: {
      resetFrom: function () {
        if (!(this.url && this.url.length)) {
          this.$refs.form.reset()
        }
      },

      submitUrl: function () {
        if (this.valid) {
          this.urlSend = true
          axios.get('https://cors.io/?https://www.jmdev.ca/url/algo.php?method=insert&url=' + encodeURIComponent(this.url))
            .then(response => {
              if (response.data.error === 'false') {
                this.shortUrl = 'https://jmdev.ca/url/?l=' + response.data.result.url_short
                this.dialog = true
                this.$refs.form.reset()
                EventBus.$emit('updateUrls')
              } else {
                let errorText = response.data.result[0]
                if (errorText.lastIndexOf('URL Not Valid') !== -1) {
                  errorText = 'URL Not Valid.'
                }
                this.errorText = errorText
                this.urlError = true
              }
            })
            .finally(() => this.urlSend = false)
        }
      },
      copyUrl:   function () {
        this.$copyText(this.shortUrl).then(function (e) {
          this.urlCopied = true
        }.bind(this))
      }
    },

    mounted: function () {
      console.log(this)
    }
  }
</script>
