<template>
    <div>
        <v-text-field v-model="search" label="Search" @keyup="searchbar">
            Search
        </v-text-field>
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