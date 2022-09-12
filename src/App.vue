<template>
  <v-app>

    <v-div>
      <getEmp/>
      <postEmp/>
      <HelloWorld/>
    </v-div>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import postEmp from './components/postEmp.vue';
import getEmp from './components/getEmp.vue';
export default {
  name: 'App',
  components: {
    HelloWorld,
    postEmp,
    getEmp
},

  data: () => ({
    //
  })
  ,
};
</script>
