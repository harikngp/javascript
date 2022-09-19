<template>
    <div>
        <v-text-field v-model="search" label="Search" @keypress="searchbar">
            Search
        </v-text-field>
        <!-- <v-btn @click="searchbar">Search</v-btn> -->
    </div>
</template>
<script>
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
                this.$emit('search',{search:this.search})
            }
        },
    }

</script>