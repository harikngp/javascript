<template>
    <div>
        <v-text-field v-model="search">
            Search
        </v-text-field>
        <v-btn @click="searchbar">Search</v-btn>
    </div>
</template>
<script>
    import Vue from "vue"
    import axios from"axios"
    import VueAxios from "vue-axios"
    Vue.use(VueAxios,axios)
  
    export default{

        name:"SearchBar",

        data(){
            return{
                search:''
            }
        },
        
        props:{
            link:String
        },

        methods:{
            searchbar(){
                Vue.axios.post(this.link,{search:this.search})
                .then((resp)=>{this.$emit('search',resp)})
            }
        },
    }

</script>