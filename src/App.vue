<template>
  <v-app>
    <ToolbarComponent />

    <v-content class="content">
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <FormComponent />
          </v-flex>

          <v-flex xs12>
            <TableComponent />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <FooterComponent />
  </v-app>
</template>

<script>
  import FormComponent from '@/components/FormComponent'
  import TableComponent from '@/components/TableComponent'
  import FooterComponent from '@/components/FooterComponent'
  import ToolbarComponent from '@/components/ToolbarComponent'

  export default {
    name:       'App',
    components: {
      ToolbarComponent,
      FooterComponent,
      FormComponent,
      TableComponent
    }
  }
</script>

<style>
  .content {
    margin-top:    54px;
    margin-bottom: 34px;
  }

  .v-toolbar__title, .display-1 {
    font-family: 'Google Sans Display', 'Roboto', sans-serif !important;
  }

  .v-btn__content, .form, .v-footer {
    font-family: 'Google Sans', 'Roboto', sans-serif;
  }
</style>
