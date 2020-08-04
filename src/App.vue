<template>
  <v-app>
    <v-app-bar
      app
      class="teal darken-4"
      dark
    >
      <div class="d-flex align-center">
        <v-toolbar-title class="display-1">Pac<span class="font-weight-black">Food
          </span>
          </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
});
</script>
