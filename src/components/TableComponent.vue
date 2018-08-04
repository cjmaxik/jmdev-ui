<template>
  <v-data-table :headers="headers" :items="entries" :loading="dataLoading" hide-actions class="elevation-1" disable-initial-sort>
    <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
    <template slot="items" slot-scope="props">
      <td>{{ props.item.url_id }}</td>
      <td class="td-break">
        <a :href="props.item.url_normal" target="_blank" rel="noreferrer nofollow noopener">{{ props.item.url_normal }}</a>
      </td>
      <td>
        <a :href="'https://jmdev.ca/url/?l=' + props.item.url_short" target="_blank" rel="noreferrer nofollow noopener">{{ props.item.url_short }}</a>
      </td>
      <td>{{ props.item.views }}</td>
    </template>

    <template slot="no-data">
      <div class="text-xs-center py-2">
        <h3 class="display-3">Loading stuff...</h3>
      </div>
    </template>
  </v-data-table>
</template>

<script>
  import axios from 'axios'
  import { EventBus } from '../event-bus'

  export default {
    name: 'GenerateTable',

    data: () => ({
      dataLoading: false,
      headers:     [
        {
          text:  'ID',
          value: 'url_id'
        },
        {
          text:     'Normal URL',
          value:    'url_normal',
          sortable: false,

        },
        {
          text:     'Short URL',
          value:    'url_short',
          sortable: false
        },
        {
          text:     'Views',
          value:    'views',
          sortable: false
        }
      ],
      entries:     []
    }),

    methods: {
      loadData: function () {
        this.dataLoading = true
        axios.get('https://cors.io/?https://www.jmdev.ca/url/algo.php?method=read&limit=50')
          .then(response => {
            this.entries = response.data.result
          })
          .finally(() => this.dataLoading = false)
      }
    },

    mounted () {
      this.loadData()
      setInterval(function () {
        this.loadData()
      }.bind(this), 60000)

      EventBus.$on('updateUrls', () => {
        this.loadData()
      })
    }
  }
</script>

<style scoped>
  .td-break {
    word-break: break-all;
  }
</style>
