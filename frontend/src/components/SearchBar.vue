<template>
    <div>
        <v-text-field v-model="search" :rules="v=>v.length>0 || 'required'" label="Search" @keyup="searchBar">
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
            searchBar(){
                this.$emit('search',{search:this.search})
            }
        },
    }

</script>