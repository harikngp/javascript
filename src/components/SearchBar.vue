<template>
    <div>
        <v-text-field v-model="search" label="Search" @keypress="searchbar">
            Search
        </v-text-field>
        <!-- <v-btn @click="searchbar">Search</v-btn> -->
    </div>
</template>
<script>
   import api from './service/api'
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
                api.post(this.link,{search:this.search})
                .then((resp)=>{this.$emit('search',resp)})
            }
        },
    }

</script>