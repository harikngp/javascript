<template>
    <v-simple-table>
        <thead>
            <tr>
            <th>
                Id
            </th>
            <th>Name</th>
            <th>Team Id</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in info" :key="i">
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
                <td>{{item.team_id}}</td>
            </tr>
        </tbody>
    </v-simple-table>
</template>
<script>
    import  Vue from "vue"
    import axios from "axios"
    import VueAxios from "vue-axios"
    Vue.use(VueAxios,axios)
    export default{
        name:"getEmp",
        data(){
            return {info:undefined}
        },
        mounted(){
            Vue.axios.get('http://127.0.0.1:3333/readEmp').then((resp)=>this.info=resp.data)
        }
    }
</script>