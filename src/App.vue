<template>
  <v-app>

    <v-div>
   
      <postEmp/>
   
    </v-div>
  </v-app>
</template>

<script>

import postEmp from './components/postEmp.vue';
export default {
  name: 'App',
  components: {
    postEmp,
},

  data: () => ({
    //
  })
  ,
};
</script>
